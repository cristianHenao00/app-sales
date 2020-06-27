// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

document.addEventListener('DOMContentLoaded', event => {
    new Prueba({ mensaje: 'Todos los elementos del DOM han sido cargados' })
});

console.log('Todo listo para trabajar');



