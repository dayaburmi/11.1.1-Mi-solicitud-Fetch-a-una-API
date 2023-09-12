document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        const city = cityInput.value.trim(); // El .trim() elimina los espacios en blanco adicionales

        if (city === "") { //Ojo! que si le pongo un requiered al button submit no va a darle pelota a este control porque prioriza el control del html y salta el cartel del requiered del html en vez de este Alert
            alert("Por favor, ingrese un nombre de ciudad válido.");
            return;
        }

        const apiUrl = `https://wttr.in/${city}?format=j1`; //Voy a buscar en https://wttr.in/${city}?format=j1 porque segun la documentacion de esta API (en https://github.com/chubin/wttr.in) format=j1 hace que te presente los datos para la ciudad elegida en formato json, sino te muestra todo en texto el html de la API

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                // Procesa los datos recibidos
                var objetoClimaJS = JSON.parse(data); //convierto el objeto en formato json a objeto de js
                var humedadActual = objetoClimaJS.current_condition[0].humidity; //voy a buscar al objeto de js la propiedad que representa el valor de humedad actual
                var tempActual = objetoClimaJS.current_condition[0].temp_C; //voy a buscar al objeto de js la propiedad que representa el valor de temperatura actual
                
                showDatos(humedadActual, tempActual, city);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                weatherResult.textContent = "Error al obtener los datos del clima.";
            });
    });
});


function showDatos(humedadActual, tempActual, city){
    weatherResult.innerHTML = ''; //Vacio el contenedor para que al hacer nuevas solicitudes no se agregue una respuesta tras otra
    weatherResult.innerHTML += `
        <p>La humedad actual en ${city} es ${humedadActual}%</p>
        <p>La temperatura actual en ${city} es ${tempActual}°C</p>` //Con el metodo .innerHTML agrego al contenedor lo que pongo entre estas comillas feas (``)
}