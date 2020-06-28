// mantenga siempre la consola del navegador activa
'use strict';

import { Prueba } from './prueba.js';

import Helpers from './helpers.js'

let carritoCompra = [];

document.addEventListener('DOMContentLoaded', event => {
    let promesa = Helpers.cargarPagina(
        '#index-header',
        './resources/views/menu.html'
    ).then(
        gestionarOpciones
        
    ).catch(error =>{
        console.log(`Houston, tenemos un problema: ${error}`)
            Helpers.alertar('#index-contenido', 
            'Problemas al intentar accder al menu principal');
    }); 

          
});

let gestionarOpciones = resultado => {
    let elemento = `#${resultado.id}`; // se asigna '#index-header'

    let referencia = document.querySelector(
        `${elemento} a[id='menu-contactenos']`
    );

    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/contactenos.html')
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a contáctenos');
            })
    });

    referencia = document.querySelector(
        `${elemento} a[id='menu-nosotros']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/nosotros.html')
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros');
            })
    });

    referencia = document.querySelector(
        `${elemento} a[id='menu-productos']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/productos.html')
            
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a productos');
            })
        setTimeout(function(){
            let botones = document.getElementsByClassName("boton-compra");
            
            for(let i = 0; i < botones.length; i++){
                botones[i].addEventListener("click", function(){
                    let id = this.id.split("-");
                    
                    let articulo = document.getElementById("articulo" + id[1]);
                    
                    let variableh1 = articulo.getElementsByTagName("h1");
                    let variablep = articulo.getElementsByTagName("p");
                    carritoCompra[id[1]] = [];
                    carritoCompra[id[1]] ["nombre"] = variableh1[0].innerHTML;
                    carritoCompra[id[1]] ["precio"] = variableh1[1].innerHTML;
                    carritoCompra[id[1]] ["descripcion"] = variablep[0].innerHTML;

                    Helpers.alertaCompra('#index-contenido', `${variableh1[0].innerHTML}`)
                    
                    
                });
                
            }
           
        }, 1000);
        

    });

         
    referencia = document.querySelector(
        `${elemento} a[id='menu-carrito-compra']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/carritoCompras.html')
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a carrito de compra');
            })
            setTimeout(function(){
                let fila = '';
                if(carritoCompra.length > 0){
                    for (let c in carritoCompra){
                        
                        fila += `<tr>
                                <td>1</td>
                                <td class="w-1/3 text-left py-3 px-4">${carritoCompra[c] ["nombre"]}</td>
                                <td class="w-1/3 text-left py-3 px-4">${carritoCompra[c]["descripcion"]}</td>
                                <td class="w-1/3 text-left py-3 px-4">${carritoCompra[c]["precio"]}</td>
                        </tr>`
                   }

                }
                document.getElementById("tabla-compra").innerHTML = fila;
               
            }, 1000);
    });
    
    referencia = document.querySelector(
        `${elemento} a[id='usuario-actualizar']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/actualizar.html')
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros');
            })
    });
    
    referencia = document.querySelector(
        `${elemento} a[id='usuario-contraseña']`
    );
    
    referencia.addEventListener('click', (event) => {
        event.preventDefault();
        Helpers.cargarPagina('#index-contenido',
                             './resources/views/contraseña.html')
            .catch(error => {
                console.error(`Houston, tenemos un problema: ${error}`)
                Helpers.alertar('#index-contenido', 
                                'Problemas al acceder a nosotros');
            })
    });
};






