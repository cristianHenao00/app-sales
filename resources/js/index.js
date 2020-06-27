// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

import Helpers from './helpers.js'

document.addEventListener('DOMContentLoaded', event => {
    let promesa = Helpers.cargarPagina(
        '#index-header',
        './resources/views/menu.html'
    ).then(
        resultado => console.log(`Menú cargado correctamente. ${resultado}`),
        error => {
            console.log(`Houston, tenemos un problema: ${error}`)
            Helpers.alertar('#index-contenido', 'Problemas al intentar accder al menu principal');
        }
    );
    
});











