export default class Helpers{
    static async cargarPagina(elemento, url) {
        let respuesta = await fetch(url);
        
        if (respuesta.ok) {
            const contenedor = document.querySelector(elemento);
            contenedor.innerHTML = await respuesta.text();
            return contenedor;
        }

        throw `error ${respuesta.status} - ${respuesta.statusText}`;
    }

    static alertar (elemento, mensaje, error = 'Error técnico sin reportar', atencion = '¡Santo cielo!'){
        document.querySelector(elemento).insertAdjacentHTML(`'afterbegin',
            <div id="alerta" class="bg-orange-100 border-l-4 border-orange-500
            tex-orange-700 p-4" role="alert"> 
                <p class="font-bold">${atencion}</p> 
                <p>${mensaje}</p> 
            </div>
        `);
        setTimeout(() => document.querySelector('#alerta').style.display = 'none', 3000);
        if(error){
            console.error(`Houston, tenemos un problema: ${error}`);
        }
    }
    
    static alertaCompra(elemento, variable, mensaje = '¡Compra Exitosa!'){
        document.querySelector(elemento).insertAdjacentHTML('beforebegin',
                        `<div id="alertaCompra" class="bg-orange-100 border-t border-b border-orange-500 text-orange-700 px-4 py-3" role="alert">
                            <p class="font-bold">${mensaje}</p>
                            <p class="text-sm">Se añadio ${variable} al carrito de compras</p>
                        </div>`);
        setTimeout(() => document.querySelector('#alertaCompra').style.display = 'none', 1000);
        
    }

    static leerJSON = async (url, opciones = {}) => {
        let respuesta = await fetch(url, opciones);
        if(respuesta.ok){
            return await respuesta.json();
        }
        throw new Error (`${respuesta.status}- ${respuesta.statusText}`);
    }
}