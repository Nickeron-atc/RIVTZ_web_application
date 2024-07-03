import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
connection = None
try:
    # Подключение к существующей базе данных
    print("Вывести что-нибудь 1")
    connection = psycopg2.connect(user="postgres", 
                                  password="masterkey",
                                  host="192.168.207.134",
                                  port="5432",
                                  database="testdb")
    print("Вывести что-нибудь 2")
    connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    print("Вывести что-нибудь")
    # Курсор для выполнения операций с базой данных
    cursor = connection.cursor()
    sql_create_database = 'create database DBCOV 2'
    cursor.execute(sql_create_database)
except (Exception, Error) as error:
    print("Ошибка при работе с PostgreSQL ", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("Соединение с PostgreSQL закрыто")
        
