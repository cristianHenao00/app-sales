// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

document.addEventListener('DOMContentLoaded', event => {
    let html = '<p class="text-4xl">Encabezado</p>'; // OJO '|"
    document.querySelector('#index-header').innerHTML = html;
    document.querySelector('#index-contenido').innerHTML = getTabla();
    document.querySelector('#index-contenido').insertAdjacentHTML('beforebegin', '<h2 class="font-serif text-lg text-gray-800 text-center">EJERCICIO DE PRUEBA</h2>');
    document.querySelector('#index-contenido').insertAdjacentHTML('afterbegin', '<h3 class="font-serif text-lg text-gray-800" text-center>Tabla de Productos</h3>');
    document.querySelector('#index-contenido').insertAdjacentHTML('beforeend', '<h5 class="font-serif text-lg text-red-800">Info. de productos</h5>')
    document.querySelector('#index-contenido').insertAdjacentHTML('afterend', '<h2 class="font-serif text-lg text-gray-800 text-center">Formulario Prueba</h2>')
    document.querySelector('#grid-state').innerHTML = getFormulario();
});

function getTabla() {
    let filas = '';

    for (let i = 0; i < 10; i++) {
        filas += `
            <tr>
                <td class="border px-4 py-2">Producto ${i + 1}</td>
                <td class="border px-4 py-2">
                    Proveedor ${(i + 1) * 10}
                </td>
                <td class="border px-4 py-2">${(i + 1) * 1000}</td>
            </tr>
        `;
    }

    let tabla = `
        <table class="table-auto">
            <thead>
                <tr class="bg-green-400">
                    <th class="px-4 py-2 ">Producto</th>
                    <th class="px-4 py-2">ID Proveedor</th>
                    <th class="px-4 py-2">Precio</th>
                </tr>
            </thead>

            <tbody>
                ${filas}
            </tbody>
        </table>
    `;

    return tabla;
}

function getFormulario(){
    let formulario = `
        <option>Risaralda</option>
        <option>Caldas</option>
        <option>Cundinamarca</option>
        <option>Boyacá</option>
        <option>Santander</option>
        <option>Quindío</option>
    `
    return formulario
}





