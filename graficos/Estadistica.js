function grafica_Asistencia_consulta() {

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/estadisticas'
    }).then(function (response) {
        const color = ['rgb(255, 99, 132, 0.5)'];
        a = 0
        while (a < response.data.length) {
            console.log(a)
            color.push('rgb(245, 79, 232, 0.5)')
            color.push('rgb(74, 135, 72, 0.5)')
            color.push('rgb(229, 89, 50, 0.5)')
            a = a + 3

        }
        console.log(color)


        const labels = [];
        const data = [];
        for (let i = 0; i < response.data.length; i++) {
            const uno = response.data[i].Nombre; // Nombre obtenido desde la API
            const dos = response.data[i].Asistencia; // Asistencia obtenida desde la API
            labels.push(uno);
            data.push(dos);
        }
        let b = 0

        for (let i = 0; i < response.data.length; i++) {

            if (b < response.data[i].Asistencia) {
                b = response.data[i].Asistencia;
            }


        }
        console.log("Asistencia mas alta es:", b)

        const NombreAsistenciaAlta = []
        for (let i = 0; i < response.data.length; i++) {

            if (b == response.data[i].Asistencia) {
                NombreAsistenciaAlta.push(" "+response.data[i].Nombre)
                if (i+1<response.data.length && b == response.data[i+1].Asistencia) {
                    
                }

            }



        }
        console.log("Asistencia mas alta es:", NombreAsistenciaAlta)
        document.getElementById('NombrePersona').innerText=NombreAsistenciaAlta
        document.getElementById('TotalAsistencia').innerText=b


        grafica_Asistencia_mostrar(labels, data, color);
    }).catch(err => console.log('Error: ', err));
}

function grafica_Asistencia_mostrar(labels, data, color) {
    Chart.defaults.global.legend.display = false;

    var grafica1 = document.getElementById("grafica1").getContext("2d");
    var myChart = new Chart(grafica1, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: 'Asistencia',
                data: data,
                backgroundColor: color.slice(0, data.length)

            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//---------------------------------------Generos--------------------------------------------------//
function estadisticas2() {


    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/estadisticas/genero'
    }).then(function (response) {
        const dataHombre = [];
        const dataMujer = [];//hay van los  valores del result, hombre mujer? si es Hombres 
        const cantHombre = response.data[0].Hombres; // Cantidad de hombre obtenido desde la API
        const cantMujer = response.data[1].Mujeres; // Cantidad de mujer obtenida desde la API
        //Operacion para sacar porcentaje:
        let cant = cantHombre + cantMujer
        console.log(cantHombre)
        console.log(cantMujer)
        let porcentajehombre = (100 / cant) * cantHombre
        let porcentajemujer = (100 / cant) * cantMujer
        console.log(porcentajemujer)

        porcentajehombre = Math.round(porcentajehombre);
        porcentajemujer = Math.round(porcentajemujer);


        dataHombre.push(porcentajehombre);

        dataMujer.push(porcentajemujer);//

        document.getElementById('porcHombre').innerText = porcentajehombre;
       document.getElementById('cantHombre').innerText = cantHombre;

        document.getElementById('porcMujer').innerText = porcentajemujer;
        document.getElementById('cantMujer').innerText = cantMujer;


        grafica_generos(dataHombre, dataMujer);
    }).catch(err => console.log('Error: ', err));
} console.log("si")



function grafica_generos(dataHombre, dataMujer) {
    var grafica3 = document.getElementById("grafica2").getContext("2d");
    var myChart = new Chart(grafica3, {
        type: "pie",
        data: {
            labels: ['Hombres', 'Mujeres'],
            datasets: [{
                label: 'Genero',
                data: [dataHombre, dataMujer], // Usar los datos obtenidos desde grafica()
                backgroundColor: [
                    'rgb(66, 134, 244,0.5)',
                    'rgb(74, 135, 72,0.5)',
                    'rgb(229, 89, 50,0.5)'
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },

                }]
            }

        }//sisa, la libreria es chart
    });
}

//----------------------------------------< Enviar Informe >----------------------------------------------------

function pdf() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    doc.text(10, 10, 'Hello world!');//las dimensiones de la hoja
    doc.save('hello-world.pdf');
}

//----------------------------------------< PDF Asistencia >----------------------------------------------------
function pdf_a() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getlista',

    }).then(function (response) {
      
        var pdf = new jsPDF();
        pdf.text(20,20,"Mostrando una Tabla con JsPDF y el Plugin AutoTable");
        
        var columns = ["Id", "Nombre", "Email", "Pais"];
        var data = [
        [1, "Hola", "hola@gmail.com", "Mexico"],
        [2, "Hello", "hello@gmail.com", "Estados Unidos"],
        [3, "Otro", "otro@gmail.com", "Otro"] ];
        
        pdf.autoTable(columns,data,
        { margin:{ top: 25 }}
        );
        
        pdf.save('mipdf.pdf'); `VAYA XD`


}).catch(err => console.log('Error: ', err))
}
//------------------------------------------< PDF Generp >--------------------------------------------------
function pdf_genero() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/estadisticas/genero'
    }).then(function (response) {
        const dataHombre = [];
        const dataMujer = [];//hay van los  valores del result, hombre mujer? si es Hombres 
        const cantHombre = response.data[0].Hombres; // Cantidad de hombre obtenido desde la API
        const cantMujer = response.data[1].Mujeres; 
        
        doc.text(10, 10, 'La cantidad de hombres en el gimnasio es '+cantHombre+' Y la cantidad de mujeres es '+cantMujer);//las dimensiones de la hoja
        doc.save('genero.pdf');
    }).catch(err => console.log('Error: ', err));
}//prende el 8001, listo


function cosas() {
    mostrar()
    estadisticas2()
    
}

function ocultar() {
    document.getElementById("no").style.display = "none";
}
function mostrar() {
    document.getElementById("si").style.display = "flex";
}

