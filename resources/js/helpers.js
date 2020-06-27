export default class Helpers{
    static async cargarPagina(elemento, url) {
        let respuesta = await fetch(url);
        
        if (respuesta.ok) {
            const contenedor = document.querySelector(elemento);
            contenedor.innerHTML = await respuesta.text();
            return contenedor;
        }

        throw `error ${respuesta.status} -
        ${respuesta.statusText}`;
    }

    static alertar (elemento, mensaje, atencion = '¡Santo cielo!'){
        document.querySelector(elemento).insertAdjacentHTML(`'afterbegin',
            <div id="alerta" class="bg-orange-100 border-l-4 border-orange-500
            tex-orange-700 p-4" role="alert"> 
                <p class="font-bold">${atencion}</p> 
                <p>${mensaje}</p> 
            </div>
        `);
        setTimeout(() => document.querySelector('#alerta').style.display = 'none', 3000);
    }
}