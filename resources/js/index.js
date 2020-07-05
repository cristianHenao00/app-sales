// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

import Helpers from './helpers.js'

document.addEventListener('DOMContentLoaded', event => {
    let promesa = Helpers.cargarPagina(
        '#index-header',
        './resources/views/menu.html'
    ).then(
        gestionarOpciones,
                
    ).catch(error =>{
        Helpers.alertar('#index-contenido', 
            'Problemas al intentar accder al menu principal', error);
    }); 

});

let gestionarOpciones = resultado => {
    let elemento = `#${resultado.id}`; // se asigna '#index-header'

    cargarProductos(elemento);
    cargarCarrito(elemento);
    cargarContactenos(elemento);
    cargarNosotros(elemento);
    cargarActualizarDatos(elemento);
    cargarCambiarContraseña(elemento);
};

let cargarProductos = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='menu-productos']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/productos.html')
            
            .catch(error => {
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a productos', error);
            })
        
    });
};

let cargarCarrito = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='menu-carrito-compra']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/carritoCompras.html')
        .then(() => {
            Helpers.leerJSON('./data/productos.json').then(respuesta =>{
                respuesta.forEach(elemento => {
                    let producto = `
                                <p>
                                    ${elemento.referencia} -
                                    $${elemento.precio}
                                    <br>
                                    ${elemento.resumen}
                                </p>
                                <br>`;
                    document.querySelector('#carrito-lista').insertAdjacentHTML('beforeend', producto);
                });
            }).catch(error =>{
                Helpers.alertar(
                    '#index-contenido',
                    'Problemas al acceder al listado de productos', error
                );
            });
        }).catch(error => {
            Helpers.alertar('#index-contenido', 
                            'Problemas al acceder a carrito de compra', error);
        });
    });
};

let cargarContactenos = elemento =>{
    let referencia = document.querySelector(
        `${elemento} a[id='menu-contactenos']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/contactenos.html')
            .catch(error => {
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a contáctenos'. error);
            })
    });
};

let cargarNosotros = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='menu-nosotros']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/nosotros.html')
            .catch(error => {
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros', error);
            })
    });
};

let cargarActualizarDatos = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='usuario-actualizar']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/actualizar.html')
            .catch(error => {
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros', error);
            })
    });
};


let cargarCambiarContraseña = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='usuario-contraseña']`
    );

    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                            './resources/views/contraseña.html')
            .catch(error => {
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros', error);
            })
    });
}

