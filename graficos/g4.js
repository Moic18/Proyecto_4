// Obtener una referencia al elemento canvas del DOM
const grafica4 = document.getElementById("grafica4").getContext("2d");
// Las etiquetas son las que van en el eje X. 
const etiquetas4 = ["Enero", "Febrero", "Marzo", "Abril"]
// Podemos tener varios conjuntos de datos
const datosVentas20204 = {
    label: "Ventas por mes - 2020",
    data: [5000, 1500, 8000, 5102], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const datosVentas20214 = {
    label: "Ventas por mes - 2021",
    data: [10000, 1700, 5000, 5989], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(255, 159, 64, 0.2)',// Color de fondo
    borderColor: 'rgba(255, 159, 64, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};

new Chart(grafica4, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: etiquetas4,
        datasets: [
            datosVentas20204,
            datosVentas20214,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});