console.log("Grafico activo");
const ctx = document.getElementById('temps');

//Metodo chart generamos un nuevo grafico y pasamos dos parametros el primero: nuestro elemento
//El segundo: un objeto




const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'temperaturas.json', true);
xhttp.send();
var resultado=[];
var temp = [];
let hora = [];

xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        let datos = JSON.parse(this.responseText);
        //console.log(datos);
        for(let clave in datos){
            let arreglo = datos[clave];
            //console.log(arreglo);
            hora.push(arreglo.hora);
            temp.push(arreglo.temperatura);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: hora,
                datasets: [{
                    label: "Hola",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    backgroundColorHover: 'red',
                    data: temp,
                    borderWidth: 6,
                    borderJoinStyle: 'round',
                    fill: false,
                    tension: 0.3
                  }]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            tickColor: 'red'
                        },
                        border: {
                            color: 'red'
                        },
                        ticks: {
                            color: 'black',
                        },
                        title: {
                            color: 'blue',
                            display: true,
                            text: 'Intervalo de horas',
                            font: {
                                size: 14
                            }
                        }
                    },
                    y: {
                        grid: {
                            tickColor: 'red'
                        },
                        border: {
                            color: 'red'
                        },
                        ticks: {
                            color: 'black',
                        },
                        title: {
                            color: 'blue',
                            display: true,
                            text: 'Grados centigrados'
                        }
                    }
                },
                plugins: {
                    subtitle: {
                        display: true,
                        text: 'Temperaturas promedio del dia actual'
                    },
                    legend: {
                        position: 'right',
                        color: 'blue',
                        font: {
                            size: 22
                        },
                    },
                    title: {
                        display: true,
                        text: 'Temperaturas',
                        font: {
                            size: 22
                        },
                        color: 'black'
                    }
                }
            }
        });
    }
}


    

