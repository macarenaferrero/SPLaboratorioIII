
import { Anuncio_Ext } from "./anuncio.js";
import { agregarSpinner, eliminarSpinner, actualizarTabla, cargarFormulario } from "./script.js";

const URL = "http://localhost:3000/anuncios";
const $spinnerContainer = document.getElementById("spinner-container");

export const getAnunciosAxiosAsync = async () => {
    
    try {
        $spinnerContainer.appendChild(agregarSpinner());
        const {data} = await axios.get(URL);
        actualizarTabla(data);        
        console.log(data);
    } catch (err) {
        console.error(err);
    }
    finally{
        eliminarSpinner();
    }
};

export const traerListado = async (callback) => {
    
    try {
        const {data} = await axios.get(URL);
        actualizarTabla(data);        
        console.log(data);
        callback(data);
    } catch (err) {
        console.error(err);
    }
    finally{
    }
};


export const createAnuncioAxiosAsync = async (nuevoAnuncio) => {
  
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        data : JSON.stringify(nuevoAnuncio),
    };
    try {
        $spinnerContainer.appendChild(agregarSpinner());
        const {data} = await axios(URL, options);
        actualizarTabla(data);
    } catch (err) {
        console.error(err);
    }
    finally{
        eliminarSpinner();
    }
};


export const deleteAnuncioAxiosAsync = async (id) => {
    const options = {
        method:"DELETE",
    };
    try {
        $spinnerContainer.appendChild(agregarSpinner());
        const {data} = await axios.delete(URL + "/" + id);
        actualizarTabla(data);
    } catch (err) {
        console.error(err);
    }
    finally{
        eliminarSpinner();
    }
};

//Modificar persona Ajax
export const updateAnuncio = (anuncioAModificar)=>{

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert(xhr.responseText);
            }
            else {
                console.error(`Error ${xhr.status} : ${xhr.statusText}`);
            }
            eliminarSpinner();
        }
        else {
            eliminarSpinner();
        }
    });
    xhr.open("PUT", URL + "/" + anuncioAModificar.id);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(anuncioAModificar));
};

export const getAnuncioAjax = (id) => {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                cargarFormulario(data);
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
    xhr.open("GET", URL + "/" + id);
    xhr.send();
};
