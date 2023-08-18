function visitas_sitios() {
    console.log("si entra  ")
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/visitas_sitios'
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
                const uno = response.data[i].Nombre_sitioT; // Nombre obtenido desde la API
                const dos = response.data[i].cantidad_visitas; // Asistencia obtenida desde la API
                labels.push(uno);
                data.push(dos);
            }
            let b = 0
    
            for (let i = 0; i < response.data.length; i++) {
    
                if (b < response.data[i].Asistencia) {
                    b = response.data[i].Asistencia;
                }
    
    
            }
    
            const NombreAsistenciaAlta = []
            for (let i = 0; i < response.data.length; i++) {
    
                if (b == response.data[i].Asistencia) {
                    NombreAsistenciaAlta.push(" "+response.data[i].Nombre)
                    if (i+1<response.data.length && b == response.data[i+1].Asistencia) {
                        
                    }
    
                }
    
            }
          
                //Chart.defaults.global.legend.display = false;
            
                var grafica2 = document.getElementById("grafica2").getContext("2d");
                var myChart = new Chart(grafica2, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'visitas',
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
            
           
        }).catch(err => console.log('Error: ', err));
    }
    