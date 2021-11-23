
import { Anuncio_Ext } from "./anuncio.js";
import { crearTabla } from "./dinamicas.js";
import { traerListado, getAnunciosAxiosAsync, createAnuncioAxiosAsync, getAnuncioAjax, updateAnuncio, deleteAnuncioAxiosAsync } from "./controllers.js";
const $spinnerContainer = document.getElementById("spinner-container");
//checkbox con atributos
const checks = document.querySelectorAll('.cbox');
console.log(checks);
const $divTabla = document.getElementById("divTabla");
//form filtro
const formulario2 = document.forms[1];
let listaAnuncios = [];
let listaAnunciosCheck= [];

window.addEventListener("load", () => {
    traerListado((data) => {
        listaAnuncios = data;
        listaAnunciosCheck = data;
        console.log("nueva lista");
        console.log(listaAnuncios);
    });
    checks.forEach((element) => element.addEventListener("click", eventoClick));
})


//input promedio
const inputPromedio = document.getElementById('promedio');

//select alquiler/venta/todos
const $filtro = document.getElementById('filtro');

getAnunciosAxiosAsync();


window.addEventListener("click", (e) => {

    if (e.target.matches("td")) {
        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;
        const anuncio = getAnuncioAjax(id);

    }
    else if (e.target.matches("#btnDelete")) {
        deleteAnuncioAxiosAsync(parseFloat($formulario.txtId.value));
        $formulario.txtId.value = "";
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        $formulario.reset();
    } else if (e.target.matches("#btnCancelar")) {
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        const $btnCancelar = document.getElementById("btnCancelar").classList.add("oculto");
        $formulario.reset();
    }
});

const $formulario = document.forms[0];

export function cargarFormulario(anuncio) {
    const { titulo, precio, puertas, km, potencia, txtId, descripcion, transaccion } = $formulario;
    txtId.value = anuncio.id;
    titulo.value = anuncio.titulo;
    descripcion.value = anuncio.descripcion;
    precio.value = anuncio.precio;
    puertas.value = anuncio.puertas;
    km.value = anuncio.km;
    potencia.value = anuncio.potencia;
    transaccion.value = anuncio.transaccion;

    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Modificar";
    const $btnEliminar = document.getElementById("btnDelete").classList.remove("oculto");
    const $btnCancelar = document.getElementById("btnCancelar").classList.remove("oculto");
}

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Enviando");
    const { titulo, precio, puertas, km, potencia, txtId, descripcion, transaccion } = $formulario;
    const anuncioAuxiliar = new Anuncio_Ext(txtId.value, titulo.value, transaccion.value, descripcion.value, precio.value, puertas.value, potencia.value, km.value);

    if (anuncioAuxiliar.id === '') {
        anuncioAuxiliar.id = Date.now();
        createAnuncioAxiosAsync(anuncioAuxiliar);
    }
    else {
        updateAnuncio(anuncioAuxiliar);
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        const $btnCancelar = document.getElementById("btnCancelar").classList.add("oculto");
        $formulario.txtId.value = "";
    }


    $formulario.reset();
})


export function actualizarTabla(data) {
    while ($divTabla.hasChildNodes()) {
        $divTabla.removeChild($divTabla.firstChild)
    }
    if (data) {
        $divTabla.appendChild(crearTabla(data));
    }
};


export function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./images/spinners.gif");
    spinner.setAttribute("style", "width:200px");
    spinner.setAttribute("alt", "Imagen spinner");
    return spinner;
}


export function eliminarSpinner() {

    while ($spinnerContainer.hasChildNodes()) {
        $spinnerContainer.removeChild($spinnerContainer.firstElementChild);
    }
}



$filtro.addEventListener('change', async (e) => {
    e.preventDefault();

    console.log(formulario2.filtrar.value);

    let media = await promedio(formulario2.filtrar.value, listaAnuncios);
    console.log(media);
    inputPromedio.value = media;

    actualizarTabla(listaAnuncios);
});


const eventoClick = (e) => {
    console.log("llegue");
    const checkeado = {};
    checks.forEach((elemento) => {
        checkeado[elemento.name] = elemento.checked;
    });
    console.log("imprimimos checkeado");
        console.log(checkeado);
    const listaMapeada = listaAnunciosCheck.map((row) => {
        const fila = {};
        for (const key in row) {
            if (checkeado[key] || key == "id") {
                fila[key] = row[key];
            }
        }
        console.log("imprimimos fila");
        console.log(fila);

        return fila;
    });
    console.log("lista mapeada");

    console.log(listaMapeada);
    actualizarTabla(listaMapeada);
};

function promedio(filtro, lista) {

    let media;

    if (filtro != "Todos") {

        const listaFiltrada = lista.filter((anuncio) => anuncio.transaccion == filtro);

        console.log(listaFiltrada);

        const suma = listaFiltrada.reduce((previo, actual) => {
            return previo + parseInt(actual.precio);
        }, 0);

        media = suma / listaFiltrada.length;

        actualizarTabla(listaFiltrada);
    } else {

        media = "N/A"

        actualizarTabla(lista);
    }
    return media;
}


