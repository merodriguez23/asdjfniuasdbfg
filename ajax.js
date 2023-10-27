//console.log("activo");

//

//tomamos nuestro boton ajax del html le damos un evento al clickearlo y ejecutamos una funcion
document.querySelector('#boton').addEventListener('click', traerDatos);

//esta funcion se ejecuta al clickear nuestro boton
function traerDatos() {
    //console.log('funcion activada');

    //Funcion XMLHttpRequest es una funcion de AJAX que permite hacer contacto con el servidor
    //Leer documentacion de w3school adjunta en el rar para ver mas a detalle esta liberia
    const xhttp = new XMLHttpRequest(); //creamos una nueva instancia de este objeto
    xhttp.open('GET', 'archivo.txt', true); //abrimmos el archivo txt
    xhttp.send(); //desde el servidor lo enviamos al cliente

    //Con esta funcion estara listo a que cambie el estado del envio
    xhttp.onreadystatechange = function () {
        //readyState y status son estados del servidor en caso de que el envio del paquete 
        //y el estado del servidor esten completos y correctos ejecutara la siguiente linea
        //ver esto en w3school adjunta
        if (this.readyState == 4 && this.status == 200) {
            //responseText toma el contenido del archivo enviado del servidor
            console.log(this.responseText);
        }
    }
}

document.querySelector("#boton-json").addEventListener('click', traerJugadores);

function traerJugadores() {
    console.log("Funcion Jugadores");

    const jhttp = new XMLHttpRequest();

    jhttp.open('GET', 'jugadores.json', true);
    jhttp.send();

    jhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            //console.log(this.responseText);
            //funcion JSON.parse en caso de que el contenido del archivo enviado sea un contenido JSON
            //nosotros usamos esta funcion para pasar de texto plano a parsearlo a contenido json un objeto 
            let datos = JSON.parse(this.responseText);

            //console.log(datos);
            //Vamos a colocar en nuestra tabla en index.html el contenido de nuestro json

            let resultado = document.querySelector(".datos");//tomamos el cuerpo de la tabla
            let resultado2 = document.querySelector(".caja");//tomamos la cabeza de la tabla

            //ejecutamos un bucle en el cual generamos una clave para itrar en la variable datos donde estan mis objetos JSON
            for (clave in datos) {
                //generamos un arreglo para almacenar mis claves
                var arreglo = [];
                //dentro generamos otro bucle para iterar en cada objeto
                //datos contiene cada objeto de manera individual
                //claves contiene el indice de cada objeto
                //item tomara cada clave del objeto que nostros iteremos
                for (item in datos[clave]) {
                    //asignamos a el arreglo el contador, y por cada vuelta ese item que contiene la clave se guardara en una posicion distinta
                    arreglo.push(item);//agregamos cada item al final del array por cada vuelta
                    //agregamos a nuestra cabeza de tabla
                    //y llamamos a nuestro arreglo en primera, segunda y tercera posicion
                    resultado2.innerHTML = ` 
                    <th>${arreglo[0]}</th>
                    <th>${arreglo[1]}</th>
                    <th>${arreglo[2]}</th>
                    `;
                }

            }


            //En el caso de nuestro cuerpo de tabla es mas simple, ya que solo necesitamos los valores de nuestras tablas
            //Generamos un bucle para iterar nuestro json
            resultado.innerHTML = '';
            for (let item of datos) {
                //al iterar abriremos cada json accediendo desde nuestro item y para tomar el valor basta con poner .nombredeclave despues del item
                //y para que sea mas amplio los resultados colocamos += para agregar los valores nuevos por cada vuelta de bucle
                resultado2.innerHTML += `  
                <td>${item.nombre}</td>
                <td>${item.edad}</td>
                <td>${item.pais}</td>
                `;
            }

        }
    }
}


document.getElementById('dolar').addEventListener('click', function () {
    obtenerDatos('dolar');
});
document.getElementById('uf').addEventListener('click', function () {
    obtenerDatos('uf');
});

function obtenerDatos(valor) {
    let url = `https://mindicador.cl/api/${valor}`;

    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            datos = JSON.parse(this.responseText);
            console.log(datos);

            let resultado = document.querySelector(".datos-dolar");//tomamos el cuerpo de la tabla
            let resultado2 = document.querySelector(".caja-dolar");//tomamos la cabeza de la tabla
            let i = 0;

            resultado.innerHTML = `<p>${datos.nombre}</p>`;
            for (let item of datos.serie) {
                i++;

                resultado.innerHTML += `
                    
                    <li>${item.fecha.substr(0, 10)} | ${item.valor}</li>
                `;
                if (i > 9) {
                    break;
                }
            }
        }
    }
}

document.getElementById('ditto').addEventListener('click', function () {
    obtenerPokemon();
});

function obtenerPokemon(valor) {
    let contador = 500;

    for(let i = 387; i < contador; i++){

        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        const api = new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();
    
        api.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                datos = JSON.parse(this.responseText);
                //console.log(datos);
    
                let resultado = document.querySelector(".datos-ditto");//tomamos el cuerpo de la tabla
                let resultado2 = document.querySelector(".poke-foto");//tomamos la cabeza de la tabla
    
                for(let item in datos.sprites){
                    //console.log(datos.sprites[item]);
                    if(item == 'front_default'){
                        resultado.innerHTML += `
                            <p>${datos.name}</p>
                            <p>${datos.id}</p>
                            <img id="poke-foto" class="img-fluid" src="${datos.sprites[item]}" alt="">
                        `;
                    }
                }
            }
        }
    }
}


