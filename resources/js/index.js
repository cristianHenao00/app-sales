// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

import Helpers from './helpers.js'

document.addEventListener('DOMContentLoaded', event => {
    let promesa = Helpers.cargarPagina(
        '#index-header',
        './resources/views/menu.html'
    ).then(todoBienHacerAlgo, problemasReportarError);
    
});

let todoBienHacerAlgo = resultado => console.log(
    `Menú cargado correctamente. ${resultado}`
);

let problemasReportarError = error => {
    console.error(`Houston, tenemos un problema: ${error}`);
}








