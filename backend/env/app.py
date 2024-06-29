import math
import os
import sys

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import hashlib
from PIL import Image
import webuiapi

sys.path.append('./')

# flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

#TODO database

#TEMP authorization token database
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

#TEMP employee authorization function
def db_get_person(username):
    if username == 'root':
        return {
            'username': 'root',
            'password': '123'
        }
    else:
        return None

# employee authorization
@app.route('/api/login', methods=['POST'])
def post_authorization():
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

# Receiving request
@app.route('/api/request', methods=['POST'])
def post_request():
    input_data = request.get_json()

    print('input_data: ')
    print(input_data)
    
    token = input_data.get('auth_token')
    if not Tokens.verify_token(token):
        return jsonify({
            'status': 'error',
            'message': 'Invalid auth token'
        })
    #TODO extract data
        
    return jsonify({
        'status': 'ok',
        'message': 'token verify success'
    })

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
