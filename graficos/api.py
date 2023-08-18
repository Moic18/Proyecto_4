############# importar librerias o recursos#####
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

# initializations
app = Flask(__name__)
CORS(app)

# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'turismo'
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"

@app.route('/visitas_hoteles')
def visitas_hoteles():
    cur = mysql.connection.cursor() #conectar con la base de datos ↓
    cur.execute("SELECT Nombre_hotel, COUNT(*) AS cantidad_visitas FROM hotel_turista GROUP BY Nombre_hotel ORDER BY cantidad_visitas DESC LIMIT 3") #ejecutar el scrip
    rv = cur.fetchall() #consultar todos los registros
    cur.close() # cierra la conexion que abrimos arriba        ↑
    payload = []    #lista o array, arreglo, como quieran decirle
    content = {}    #estructura de tipo objeto
    for result in rv:
            content = {'nombre_hotel': result[0],'cantidad_visitas':result[1]} # numero de valoracion
            payload.append(content)
            content = {}
    return jsonify(payload)

@app.route('/visitas_sitios')
def visitas_sitios():
    cur = mysql.connection.cursor() #conectar con la base de datos ↓
    cur.execute("SELECT Nombre_sitioT, COUNT(*) AS cantidad_visitas FROM visita_sitioturistico GROUP BY Nombre_sitioT ORDER BY cantidad_visitas DESC LIMIT 3") #ejecutar el scrip
    rv = cur.fetchall() #consultar todos los registros
    cur.close() # cierra la conexion que abrimos arriba        ↑
    payload = []    #lista o array, arreglo, como quieran decirle
    content = {}    #estructura de tipo objeto
    for result in rv:
            content = {'Nombre_sitioT': result[0],'cantidad_visitas':result[1]} # numero de valoracion
            payload.append(content)
            content = {}
    return jsonify(payload)

# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)