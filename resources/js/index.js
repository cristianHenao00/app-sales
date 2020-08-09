// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

import Helpers from './helpers.js';
import Modal from './modal.js';
import CarritoDeCompras from './carrito-compras.js';
import Productos from './productos.js';

document.addEventListener('DOMContentLoaded', async event => {
    let promesa = Helpers.cargarPagina(
        '#index-header',
        './resources/views/menu.html'
    ).then(
        gestionarOpciones,
                
    ).catch(error =>{
        Helpers.alertar('#index-contenido', 
            'Problemas al intentar accder al menu principal', error);
    }); 

    await Modal.crear();
    
    // Modal.desplegar({
    //    titulo:'Bienvenido',
    //    contenido: 'Ahora puede hacer sus compras aquí.'
    // });

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
    
    referencia.addEventListener('click', async (event) => {
        event.preventDefault();
        let producto = await Productos.crear();
        producto.gestionarTabla();
    });
};

let cargarCarrito = elemento => {
    let referencia = document.querySelector(
        `${elemento} a[id='menu-carrito-compra']`
    );
    
    referencia.addEventListener('click', async (event) => {
        event.preventDefault();
        let carrito = await CarritoDeCompras.crear();
        carrito.gestionarVentas();
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

