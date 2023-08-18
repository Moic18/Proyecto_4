
// Obtener una referencia al elemento canvas del DOM
const grafica3 = document.getElementById("grafica3").getContext("2d");
// Las etiquetas son las que van en el eje X. 
const etiquetas3 = ["Enero", "Febrero", "Marzo", "Abril"]
// Podemos tener varios conjuntos de datos. Comencemos con uno
const datosVentas20203 = {
    label: "Ventas por mes",
    data: [5000, 1500, 8000, 5102], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
new Chart(grafica3, {
    type: 'bar',// Tipo de gráfica
    data: {
        labels: etiquetas3,
        datasets: [
            datosVentas20203,
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