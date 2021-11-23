import { crearPublicidad } from "./dinamicas.js";

const $divTabla = document.getElementById("divTabla");
const URL = "http://localhost:3000/anuncios";
const $spinnerContainer = document.getElementById("spinner-container");


const getAnunciosAjax = () => {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                crearPublicidad(data);
            }
            else {
                console.error(`Error ${xhr.status} : ${xhr.statusText}`);
            }
            eliminarSpinner();
        }
        else {
            $spinnerContainer.appendChild(agregarSpinner());
        }
    });
    xhr.open("GET", URL);
    xhr.send();
};
getAnunciosAjax();


function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./images/spinners.gif");
    spinner.setAttribute("style", "width:200px");
    spinner.setAttribute("alt", "Imagen spinner");
    return spinner;
}


function eliminarSpinner() {

    while ($spinnerContainer.hasChildNodes()) {
        $spinnerContainer.removeChild($spinnerContainer.firstElementChild);
    }
}
