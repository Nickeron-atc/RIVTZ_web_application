
import math
import os
import sys

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import hashlib
from PIL import Image
import webuiapi
#from werkzeug.security import generate_password_hash

sys.path.append('./')

from SQLiteDB import *
from stable_dif_api import *

from DBControlOfVersion import *

# flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# database
db = SQLiteDB("example.db")

# model
IMAGE_INDEX = 0
api = init_stable_diffusion()

#TEMP
class TokenDB:
    def __init__(self):
        self.token_db = list()
    
    def gen_auth_token(self):
        print(f'Tokens: get_auth_tokes()')
        self.print_tokens()
        token = hashlib.sha256(os.urandom(64)).hexdigest()
        self.token_db.append(token)
        return token
      
    def verify_token(self, token):
        print(f'Tokens: verify_token({token})')
        self.print_tokens()
        for _token in self.token_db:
            if _token == token:
                return True
        return False
    
    def print_tokens(self):
        print('tokens')
        for token in self.token_db:
            print(token)
    
Tokens = TokenDB()


@app.route('/api/test', methods=['GET'])
def get_test():
    return jsonify({'message': 'Hello from Flask!'})

#TEMP Авторизация сотрудника
def db_get_person(username):
    if username == 'root':
        return {
            'username': 'root',
            'password': '123'
        }
    elif username == 'user':
        return {
            'username': 'user',
            'password': '123'
        }
    else:
        return None

# Авторизация консультанта
@app.route('/api/login', methods=['POST'])
def post_authorization():
    # Получение JSON данных из тела запроса
    input_data = request.get_json()
    
    username = input_data.get('login')
    password = input_data.get('password')

    _response = db_get_person(username)

    if _response == None:
        return jsonify({
            'status': 'error',
            'message': 'Person not found',
            'auth_token': '0'
        })

    if _response.get('password') != password:
        return jsonify({
            'status': 'error',
            'message': 'Incorrect password',
            'auth_token': '0'
        })

    return jsonify({
        'status': 'ok',
        'message': 'Login success',
        'auth_token': f'{Tokens.gen_auth_token()}'

    })

# Создание изображения с изменённым размером. Возвращает путь к файлу
def changeImageSize(filename, new_size):
    img = Image.open('env/src'+filename)
    resized_img = img.resize(new_size)
    resized_img_filename = filename.split('/')
    resized_img_filename = resized_img_filename[len(resized_img_filename) - 1]
    temp_filename = '/images/' + f'resized__{resized_img_filename}__to__{new_size[0]}_{new_size[1]}.png'
    resized_img.save('env/src' + temp_filename)

    return temp_filename

#  Приём запроса
@app.route('/api/request', methods=['POST'])
def post_request():
    # Получение JSON данных из тела запроса
    input_data = request.get_json()

    print('input_data: ')
    print(input_data)
    
    token = input_data.get('auth_token')
    if not Tokens.verify_token(token):
        return jsonify({
            'status': 'error',
            'images': '',
            'message': 'Invalid auth token'
        })
    # extract user data
    name = input_data.get('name')
    _request = input_data.get('request')
    kredit_type = input_data.get('kredit_type')

    # check if user exists
    # if so do not add him, just do request
    if kredit_type == None:
        kredit_type = 'money'
    # send request to model
    global IMAGE_INDEX
    # image_filename = f'images/img{IMAGE_INDEX}.png'
    image_filename = f'images/image1.png'
    print('kredit_type' + kredit_type)
    print('store image in ' + image_filename)
    # request_image(api, kredit_type, image_filename)
    # image_filename = 'backend\src\images\image1.png'
    IMAGE_INDEX += 1

    image_filename = '/' + image_filename

    print('stored image in ' + image_filename)

    # return json answer (images)
    original_img = Image.open('env/src' + image_filename)
    width, height = original_img.size

    # resizing
    k = width / height
    resized_width1 = 800;
    resized_height1 = math.floor(800/k)
    resized_img = changeImageSize(image_filename, (resized_width1, resized_height1))

    resized_width2 = 400;
    resized_height2 = math.floor(400/k)
    resized_img2 = changeImageSize(image_filename, (resized_width2, resized_height2))

    return jsonify({
        'status': 'ok',
        'message': 'token verify success',
        'images': {
            'image1': {'image': image_filename,   'width': width,             'height': height}, 
            'image2': {'image': resized_img,      'width': resized_width1,    'height': resized_height1}, 
            'image3': {'image': resized_img2,     'width': resized_width2,    'height': resized_height2}
        }
    })


@app.route('/api/request/main_table/receive')
def test_module_table_request():
    return jsonify({
        'data': {
            { 'id': 1, 'moduleName': 'Module1', 'MinSupportedVersion': '1.0', 'ActualVersion': '1.5' },
            { 'id': 2, 'moduleName': 'Module2', 'MinSupportedVersion': '1.0', 'ActualVersion': '2.0' },
            { 'id': 3, 'moduleName': 'Module3', 'MinSupportedVersion': '1.0', 'ActualVersion': '1.1' }
        }
    })

@app.route('/test/common_blacklist_table_request')
def test_common_blacklist_table_request():
    return jsonify({
        'data': {
            { 'id': 1, 'moduleName': 'Module1', 'versions': {'1.5', '1.6'} },
            { 'id': 2, 'moduleName': 'Module2', 'versions': {'2.0'} },
            { 'id': 3, 'moduleName': 'Module3', 'versions': {'1.1'} }
        }
    })

@app.route('/test/module1_blacklist_table_request')
def test_Module1_blacklist_table_request():
    return jsonify({
        'data': {
            { 'id': 1, 'moduleName': 'Module1', 'versions': {'1.5', '1.6'} },
            { 'id': 2, 'moduleName': 'Module2', 'versions': {'2.0'} },
            { 'id': 3, 'moduleName': 'Module3', 'versions': {'1.1'} }
        }
    })

@app.route('/images/<path:filename>')
def serve_image(filename):
    # Сервировка изображения из статической папки
    return send_from_directory('./images', filename)

@app.route('/api/request/selected_blacklist/receive', methods=['POST'])
def selectedBlacklistReceive():
    input_data = request.get_json()
    return jsonify({
        'status': 'ok',
        'data': [
            { 'id': 1024, 'moduleName': 'HZ', 'versions': ['1.5', '1.6'] }
        ]
    })

@app.route('/api/request/main_table/edit_element', methods=['POST'])
def mainTableEditElement():
    input_data = request.get_json()
    return jsonify({
        'status': 'ok',
        'data': [
            {   'id': input_data['id'], 
                'moduleName': input_data['moduleName'], 
                'MinSupportedVersion': input_data['MinSupportedVersion'],
                'ActualVersion': input_data['ActualVersion'],
                'data': input_data }
        ]
    })

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
