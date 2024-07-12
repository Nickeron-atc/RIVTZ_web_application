# There will be DB work here
# password - masterkey
import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
class DBCOV:
	def __init__(self):
		self.connection = None
		self.cursor = None
	#Function to creat a DB if hasn't been created
	def ConnectDB(self): 											# готовая функция
		try:
			# Подключение к существующей базе данных
			self.connection = psycopg2.connect(user="postgres",
										  password="masterkey",
										  host="localhost",
										  port="5432",
										  database="DBCOV")
			self.connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
			# Курсор для выполнения операций с базой данных
			self.cursor = self.connection.cursor()
			# Распечатать сведения о PostgreSQL #свойства соедиения
			print("Информация о сервере PostgreSQL")
			print(self.connection.get_dsn_parameters(), "\n")
			# Выполнение SQL-запроса
			self.cursor.execute("SELECT version();")
			# результаты запроса получаем методами fetchone(), fetchmany(), fetchall()
			print("Вы подключены к - ", self.cursor.fetchone(), "\n")
		except (Exception, Error) as error:
			print("Ошибка при работе с PostgreSQL", error)

	#Closing connection with DB
	def CloseDB(self): 												# готовая функция
		if self.connection:
			self.connection.close()
			print("Соединение с PostgreSQL закрыто")
			return 0

	# Function to refresh Table Modules after updating
	def RefreshM(self):												# готовая функция
		self.cursor.execute("SELECT * FROM \"RIVC\".\"Modules\" ORDER BY \"Id\" ASC")

	# Function to refresh Table BlackList after updating
	def RefreshBL(self): 											# готовая функция
		self.cursor.execute("SELECT * FROM \"RIVC\".\"BlackList\" ORDER BY \"Id\" ASC")

	#Function to Add new record in Table Modules
	def InsertRecordM(self, modName, MinSuppVers, ActualVers):		# готовая функция
		sql_insert = f'''INSERT INTO \"RIVC\".\"Modules\" (\"moduleName\", \"MinSupportedVersion\", \"ActualVersion\") VALUES (
						\'{modName}\'::text, \'{MinSuppVers}\'::text, \'{ActualVers}\'::text) returning \"Id\";'''
		self.cursor.execute(sql_insert)
		#self.RefreshM()
		return 0
	# Function to Add new record in Table BlackList
	def InsertRecordBL(self, ID): 									# непроверенная функция (запрос неточный)
		sql_search = f"SELECT * FROM \"RIVC\".\"Modules\" WHERE \"Id\" = {ID}"

		modName = "\'\"RIVC\".\"Modules\".\"moduleName\"::text, \'"
		BlackVer = "\'\"RIVC\".\"Modules\".\"ActualVersion\"::text, \'" + "\'::text) returning \"Id\";"
		sql_insert = "INSERT INTO \"RIVC\".\"BlackList\" (\"moduleName\", \"BlackVersion\") VALUES (\'" + modName
		sql_insert = sql_insert + BlackVer
		#print(sql_insert)
		self.cursor.execute(sql_insert)
		# После того, как добавили данные из Modules в BlackList, удаляем данные из Modules
		self.DeleteRecordM(ID)
		#self.RefreshBL()
		return 0

	# Function to Edit selected record in Table Modules
	def UpdateRecordM(self, ID, modName, MinSuppVers, ActualVers):	# готовая функция
		sql_edit = f'''UPDATE "RIVC"."Modules" SET
					\"moduleName\" = \'{modName}\'::text,
					\"MinSupportedVersion\" = \'{MinSuppVers}\'::text,
					\"ActualVersion\" = \'{ActualVers}\'::text
					WHERE \"Id\" = {ID};'''
		self.cursor.execute(sql_edit)
		#self.RefreshM();
		return 0
	# deleting a record from a table Modules
		def DeleteRecordM(self, ID): 								# готовая функция
			sql_delete = "DELETE FROM \"RIVC\".\"Modules\" WHERE \"Id\" = 2;"
			self.cursor.execute(sql_delete)
			#self.RefrshM();
			return ID
	# deleting a record from a table Modules
	def SearchRecord(self, modName, MinSuppVers, ActualVers):		# неготовая
		sql_search = ""
		if modName != "":
			if MinSuppVers != "":
				if ActualVers != "":
					pass
				else:
					pass
			else:
				if ActualVers != "":
					pass
				else:
					pass
		else:
			if MinSuppVers != "":
				if ActualVers != "":
					pass
				else:
					pass
			else:
				if ActualVers != "":
					pass
				else: # При пустых значениях
					return # Ничего не делать