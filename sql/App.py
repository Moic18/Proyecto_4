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
app.config['MYSQL_DB'] = 'chat-box'
mysql = MySQL(app)


# Mysql Connection
#app.config['MYSQL_HOST'] = 'containers-us-west-71.railway.app'
#app.config['MYSQL_USER'] = 'root'
#app.config['MYSQL_PASSWORD'] = 'cq4k25MaLacqY1JqKJ6e'
#app.config['MYSQL_DB'] = 'railway'
#app.config['MYSQL_PORT'] = 5777
#mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"


#### ruta para crear un registro########
@cross_origin()
@app.route('/register', methods=['POST'])
def register():
    try:
        if request.method == 'POST':
            id = request.json['id']
            nombre = request.json['nombre']
            Apellido = request.json['Apellido']
            Cedula = request.json['Cedula']
            Telefono = request.json['Telefono']
            Direccion = request.json['Direccion']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO cliente (id, nombre, Apellido, Cedula, Telefono, Direccion) VALUES (%s,%s,%s,%s,%s,%s)",
                        (id, nombre, Apellido, Cedula, Telefono, Direccion))
            mysql.connection.commit()
            return jsonify({"informacion": "Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# ruta para consultar todos los registros
@cross_origin()
@app.route('/getAll', methods=['GET'])
def getAll():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM cliente')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'Id': result[1], 'Nombre': result[2], 'Apellido': result[3],
                       'Cedula': result[4], 'Telefono': result[5], 'Direccion': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

# ruta para consultar todos los registros


@cross_origin()
@app.route('/getcount', methods=['GET'])
def getcount():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) as total from cliente')
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# ruta para consultar por parametro
@cross_origin()
@app.route('/getAllById/<id>', methods=['GET'])
def getAllById(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM cliente WHERE id = %s', (id))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'Id': result[1], 'Nombre': result[2], 'Apellido': result[3],
                       'Cedula': result[4], 'Telefono': result[5], 'Direccion': result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


######### ruta para actualizar################
@cross_origin()
@app.route('/update/<id>', methods=['PUT'])
def update_contact(id):
    try:
        id = request.json['Id']
        Nombre = request.json['Nombre']
        Apellido = request.json['Apellido']
        Cedula = request.json['Cedula']
        Telefono = request.json['Telefono']
        Direccion = request.json['Direccion']
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE cliente
        SET Id = %s,
            Nombre = %s,
            Apellido = %s,
            Cedula = %s,
            Telefono = %s,
            Direccion = %s
        WHERE id = %s
        """, (id, Nombre, Apellido, Cedula, Telefono, Direccion))
        mysql.connection.commit()
        return jsonify({"informacion": "Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@cross_origin()
@app.route('/delete/<id>', methods=['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM contacts WHERE id = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion": "Registro eliminado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)
