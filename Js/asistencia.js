function acceso() {
    const correo = localStorage.getItem("usuario");
    const Id_solicitud = "0";
    console.log("acceso");
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/chat_regis',
        data: {
            correo_est: correo,
            Id_solicitud: Id_solicitud,
        },
    })
        .then(function (response) {
            console.log("si funciona");
        }).catch(err => console.log('Error: ', err));
}
