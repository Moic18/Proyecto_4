

function proceso1() {
    var g1= document.getElementById("g1").getContext("2d");
    var myChart= new Chart(g1,{
        type:"pie",
        data:{
            labels:['col1','col2','col3'],
            datasets:[{
                    label:'Num datos',
                    data:[10,9,15],
                    backgroundColor:[
                        'rgb(66, 134, 244,0.5)',
                        'rgb(74, 135, 72,0.5)',
                        'rgb(229, 89, 50,0.5)'
                    ]
            }]
        },
        options:{
            scales:{
                yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                }]
            }
        }
    });  
}

function proceso2() {
    var g2= document.getElementById("g1").getContext("2d");
    var myChart= new Chart(g2,{
        type:"pie",
        data:{
            labels:['col1','col2'],
            datasets:[{
                    label:'Num datos',
                    data:[10,9],
                    backgroundColor:[
                        'rgb(66, 134, 244,0.5)',
                        'rgb(74, 135, 72,0.5)'
                    ]
            }]
        },
        options:{
            scales:{
                yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                }]
            }
        }
    });  
}
