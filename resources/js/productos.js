import Helpers from './helpers.js';

export  default class Productos{
    #productos;


    constructor(){
        this.#productos=[]
    }

    static async crear(){
        const instancia = new Productos();

        await Helpers.cargarPagina(
            '#index-contenido',
            './resources/views/productos.html'
        ).catch(error => {
                Helpers.alertar('#index-contenido', 
                'Problemas al acceder a productos', error);
        });
        
        instancia.#productos = await Helpers.leerJSON('./data/productos.json').catch(error =>{
            Helpers.alertar('#index-contenido',
            'Problemas al cargar los productos', error)
        });

        return instancia
    }

    gestionarTabla(){
        this.#productos.forEach((producto, indice) =>{
            let itemIndice = `producto-tabla-${indice}`;
            let itemModal = `modal-item-${indice}`
            let itemProducto = `
                <tr id="${itemIndice}" class="bg-gray-100">
                    <td class="w-1/3 text-left py-3 px-4">
                        <img src="./resources/assets/images/${producto.imagen}" alt="" class="w-full">
                    </td>
                    <td class="w-1/3 text-left py-3 px-4">${producto.referencia}</td>
                    <td class="text-left py-3 px-4">${producto.disponible}</td>
                    <td class="text-left py-3 px-4">${producto.precio}</td>
                    <td class="text-left py-3 px-4">
                        <p>${producto.resumen}
                            <a id="${itemModal}"  data-indice="${indice}" class="text-orange-400 hover:text-orange-700">Ver más...</a>
                        </p>
                    </td>
                </tr>
            `;
            document.querySelector('#productos-tabla').insertAdjacentHTML('afterbegin', itemProducto);
            document.querySelector(`#${itemModal}`).addEventListener('click', e =>{
                this.desplegarModal(e.target.dataset.indice);
            })
        });
    }

    desplegarModal(indice){
        let modalProducto = `
            <div id="modal-producto" class="h-screen w-full flex flex-col items-top bg-teal-lightest">
                <div v-if="modal.visible" @click.self="modal.visible = false" class="h-screen w-full flex items-start justify-center bg-modal">
                    <div class="bg-gray-100 rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
                        <div class="mb-4">
                            <h1 class="text-xl mt-4 font-bold
                            text-orange-600">Detalles!</h1>
                        </div>
                        <div class="mb-8">
                            <p>${this.#productos[indice].detalles}</p>
                        </div>
                        <div class="flex justify-center">
                            <button id="modal-volver" class="flex-no-shrink text-white py-2 px-4 rounded font-bold bg-orange-500 hover:bg-orange-800">Volver.</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('#tabla-contenedor').insertAdjacentHTML('afterbegin', modalProducto);
        document.querySelector('#tabla-contenido').style.display= 'none';
        document.querySelector('#modal-volver').addEventListener('click', event => this.ocultarModal())
    }

    ocultarModal(){
        document.querySelector('#modal-producto').style.display = 'none';
        document.querySelector('#tabla-contenido').style.display= 'block';
    }

    
}