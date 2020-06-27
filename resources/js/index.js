// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

document.addEventListener('DOMContentLoaded', event => {
    let promesa = cargarPagina('#index-header','./resources/views/menu.html');
    console.log(promesa);
});

async function cargarPagina(url) {
    //return await fetch(url);

    let respuesta = await fetch(url);

    if (respuesta.ok) {
        let contenido = await respuesta.text();
        console.error(contenido);
        return;
    }
    throw `error ${respuesta.status} -
                       ${respuesta.statusText}`;
}






