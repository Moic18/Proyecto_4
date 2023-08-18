############# importar librerias o recursos#####
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from datetime import date


# initializations
app = Flask(__name__)
CORS(app)


# Mysql Connection
app.config['MYSQL_HOST'] = 'containers-us-west-132.railway.app'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'CxGzpt3MxiHL0UDoGjkD'
app.config['MYSQL_DB'] = 'railway'
app.config['MYSQL_PORT'] = 7429
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"


#### ruta para crear un registro########
@cross_origin()
@app.route("/register", methods=["POST"])
def register():
    try:
        if request.method == "POST":
            Nombre = request.json["nombre"]
            Id = request.json["id"]
            Correo = request.json["correo"]
            Carrera = request.json["carrera"]
            Cuatrimestre = request.json["cuatrimestre"]
            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO estudiante (nombre, id, correo, carrera, cuatrimestre) VALUES (%s,%s,%s,%s,%s)",
                (Nombre, Id, Correo, Carrera, Cuatrimestre),
            )
            mysql.connection.commit()
            return jsonify({"informacion": "Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


#### ruta para crear un registro de actividad########
@app.route("/chat_regis", methods=["POST"])
@cross_origin()
def chat_regis():
    try:
        if request.method == "POST":
            correo_est = request.json["correo_est"]
            Id_solicitud = request.json["Id_solicitud"]
            fecha = date.today()
            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO solicitud (Id_solicitud, fecha, correo_est) VALUES (%s, %s, %s)",
                (Id_solicitud, fecha, correo_est,),
            )
            mysql.connection.commit()
            return jsonify({"informacion": "Registro exitoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


@cross_origin()
@app.route("/login", methods=["POST"])
def login():
    try:
        correo = request.json["correo"]
        id = request.json["id"]
        cur = mysql.connection.cursor()
        payload = []
        cur.execute(
            "SELECT correo, id from estudiante WHERE correo = %s AND id = %s",
            (correo, id),
        )
        estudiante = cur.fetchall()
        mysql.connection.commit()
        payload = []
        content = {}
        print(payload)
        for result in estudiante:
            content = {"Correo": result[0],
                       "id": result[1], "Modulo": "estudiante"}
            payload.append(content)
            content = {}
        if not payload:
            cur = mysql.connection.cursor()
            payload = []
            cur.execute(
                "SELECT correo_admin, Id_admin from administrador WHERE correo_admin = %s AND Id_admin = %s",
                (correo, id),
            )
            estudiante = cur.fetchall()
            mysql.connection.commit()
            payload = []
            content = {}
            for result in estudiante:
                content = {
                    "Correo_admin": result[0],
                    "Id_admin": result[1],
                    "Modulo": "administrador",
                }
                payload.append(content)
                content = {}
        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

# ruta para consultar todos los registros del administrador


@cross_origin()
@app.route("/getadmin", methods=["GET"])
def getadmin():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM administrador")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {
                "Id_admin": result[0],
                "nombre": result[1],
                "correo_admin": result[2],
                "cargo": result[3],
            }
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# ruta para consultar todos los registros
@cross_origin()
@app.route("/getAll", methods=["GET"])
def getAll():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM estudiante")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {
                "nombre": result[0],
                "id": result[1],
                "correo": result[2],
                "carrera": result[3],
                "cuatrimestre": result[4],
            }
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# ruta para consultar todos los registros
@cross_origin()
@app.route("/get_solicitud", methods=["GET"])
def get_solicitud():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM solicitud")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {
                "Id_solicitud": result[0],
                "fecha": result[1],
                "correo": result[2],
            }
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# grafica 2
@cross_origin()
@app.route("/grafica2", methods=["GET"])
def grafica2():
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT cuatrimestre, COUNT(cuatrimestre) AS total FROM estudiante GROUP BY cuatrimestre"
        )
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {"cuatrimestre": result[0], "total": result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# grafica 3
@cross_origin()
@app.route("/grafica3", methods=["GET"])
def grafica3():
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT cargo, COUNT(*) AS total FROM administrador GROUP BY cargo")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {"cargo": result[0], "total": result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

######### GRAFICA DE SOLICITUD GRAFICA$###############


@cross_origin()
@app.route("/grafica_solicitud", methods=["GET"])
def grafica_solicitud():
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT fecha, COUNT(*) AS total FROM solicitud GROUP BY fecha")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {"fecha": result[0], "total": result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# grafica 1
@cross_origin()
@app.route("/Contar_estudiantes", methods=["GET"])
def contar_estudiantes():
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT carrera, COUNT(carrera) AS Total_de_estudiantes FROM estudiante GROUP BY carrera"
        )
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {"carrera": result[0], "Total_de_estudiantes": result[1]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)
