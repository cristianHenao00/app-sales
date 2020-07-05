import Helpers from './helpers.js';

export default class CarritoDeCompras{
    #productos;

    constructor(){
        this.#productos = [];
        
    }

    static async crear(){
        const instancia = new CarritoDeCompras();
        
        await Helpers.cargarPagina(
            '#index-contenido',
            './resources/views/carritoCompras.html'
        ).catch(error =>{
            Helpers.alertar('#index-contenido',
            'Problemas al acceder al carrito de compras', error)
        });
        console.log('Cargada la página del carrito');

        instancia.#productos = await Helpers.leerJSON('./data/productos.json').catch(error =>{
            Helpers.alertar('#index-contenido',
            'Problemas al cargar los productos', error)
        });
        console.log('Cargados los productos', instancia.#productos);

        return instancia;
    }

    gestionarVentas(){
        this.#productos.forEach(elemento => {
            let producto = `
                <p>
                    ${elemento.referencia} - ${elemento.precio}
                    <br>
                    ${elemento.resumen}
                </p>
                <br>`;
            document.querySelector('#carrito-lista').insertAdjacentHTML('beforeend', producto);
        });
    }
}