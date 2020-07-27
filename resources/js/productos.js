import Helpers from './helpers.js';
import Modal from './modal.js';

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
        let filas = '';

        this.#productos.forEach((producto, indice) =>{
            filas += `
                <tr class="bg-gray-100">
                    <td class="border text-center py-2 px-4">${producto.id}</td>
                    <td class="border text-center py-2 px-4">
                        <img src="./resources/assets/images/${producto.imagen}" alt="" class="h-16 rounded-full mx-auto">
                        <button id="producto-btndetalles-${indice}" class="modal-open text-orange-700 hover:bg-orange-100 px-2 text-sm">${producto.referencia}</button>
                    </td>
                    <td class="border text-left py-2 px-4">${producto.resumen}</td>
                    <td class="border text-center py-2 px-4">${producto.disponible}</td>
                    <td class="border text-center py-2 px-4">${producto.precio}</td>
                    <td class="border text-center py-2 px-4">
                        <button id="producto-btneditar-${indice}" class="button button-small fa fa-edit focus:outline-none" title="Editar"></button>
                        <button id="producto-btneliminar-${indice}" class="button button-small fa fa-trash focus:outline-none" title="Eliminar"></button>
                    </td>
                </tr>
            `;
        });
        document.querySelector('#productos-tabla').innerHTML = filas;

        for (let i=0; i<this.#productos.length; i++){
            document.querySelector(`#producto-btndetalles-${i}`).addEventListener(
                'click', e => this.verDetalles(e, i)
            );
            document.querySelector(`#producto-btneditar-${i}`).addEventListener(
                'click', e => this.editarFila(e, i)
            );
            document.querySelector(`#producto-btneliminar-${i}`).addEventListener(
                'click', e => this.eliminarFila(e, i)
            );
        }

        document.querySelector('#tabla-contenedor #btn-agregar').addEventListener(
            'click', e => this.agregarProducto(e)
        )
    }

    verDetalles(event, i){
        event.preventDefault();
        //componentes reutilizables
        Modal.desplegar({
            titulo: 'Caracteristicas del producto',
            contenido: this.#productos[i].resumen,
            botones: [
                {
                    id: 'btn-cerrar-infoproductos',
                    titulo:'Cerrar',
                    estilo: 'px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                    callBack: this.cualquierCosa
                },
                
            ]
        });
    }

    cualquierCosa(){
        console.log('sjsjsjsjsjs');
    }

    editarFila(event, i){
        event.preventDefault();
        Modal.desplegar({
            titulo: 'Editar Producto',
            contenido: `
                <div class="container">
                    <form class="border-t border-b border-gray-400">
                        <div class="flex mt-4">
                            
                            <div class="w-1/5 mr-3">
                                <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    identificador
                                </label>
                                <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                    type="text" value="${this.#productos[i].id}">
                                    
                               
                            </div>
                            <div class="w-3/5 ml-3 mr-3">
                                <label class="block uppercase tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    referencia
                                </label>
                                <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                    type="text" value="${this.#productos[i].referencia}">
                                    
                            </div>
                           
                            <div class="w-1/5 ml-3">
                                <label class="block uppercase tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    disponible
                                </label>
                                <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                    type="text" value="${this.#productos[i].disponible}">
                                    
                            </div>
                  
                        </div>   
                        
                        <div class="w-full mt-4">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                resumen de características
                            </label>
                            <textarea class="rounded-md leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white">
                                ${this.#productos[i].resumen}
                            </textarea>
                        </div>

                        <div class="w-full mt-4">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                detalles de las características
                            </label>
                            <textarea class="rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white">
                                ${this.#productos[i].detalles}
                            </textarea>
                        </div>

                        <div class="flex mt-4 mb-4">
                            <div class="w-2/6 mr-2">
                                    <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                        precio
                                    </label>
                                    <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                        type="text" value="${this.#productos[i].precio}">
                            </div>
                            
                            <div class="w-1/2 mr-2 ml-2">
                                    <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                        imagen del producto
                                    </label>
                                    <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                        type="text" value="${this.#productos[i].imagen}">
                            </div>

                            <div>
                                    <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                        subir imagen
                                    </label>
                                    <button class="w-full px-4 bg-orange-400 p-3 rounded-lg text-white hover:bg-orange-500 fa fa-arrow-up">
                                    </button>
                            </div>


                        </div>

                    </form>
                </div>
            `,
            botones: [
                {
                    id: 'btn-guardar-editor',
                    titulo:'Guardar',
                    estilo: 'mr-3 px-4 bg-green-400 p-3 rounded-lg text-white hover:bg-green-500',
                    callBack: this.cualquierCosa
                },
                {
                    id: 'btn-cerrar-editor',
                    titulo:'Cerrar',
                    estilo:'px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                    callBack: this.cualquierCosa
                }
            ]
        });
    }
    

    eliminarFila(event, i){
        console.log(event.target.id, i);
    }

    agregarProducto(event){
        event.preventDefault();
        Modal.desplegar({
            titulo: 'Agregar producto',
            contenido:`
            <div class="container">
                <form class="border-t border-b border-gray-400">
                    <div class="flex mt-4">
                        
                        <div class="w-1/5 mr-3">
                            <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                identificador
                            </label>
                            <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                type="text">
                                
                           
                        </div>
                        <div class="w-3/5 ml-3 mr-3">
                            <label class="block uppercase tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                referencia
                            </label>
                            <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                type="text">
                                
                        </div>
                       
                        <div class="w-1/5 ml-3">
                            <label class="block uppercase tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                disponible
                            </label>
                            <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                type="text">
                                
                        </div>
              
                    </div>   
                    
                    <div class="w-full mt-4">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            resumen de características
                        </label>
                        <textarea class="rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white">
                        </textarea>
                    </div>

                    <div class="w-full mt-4">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            detalles de las características
                        </label>
                        <textarea class="rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white">
                        </textarea>
                    </div>

                    <div class="flex mt-4 mb-4">
                        <div class="w-2/6 mr-2">
                                <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    precio
                                </label>
                                <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                    type="text">
                        </div>
                        
                        <div class="w-1/2 mr-2 ml-2">
                                <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    imagen del producto
                                </label>
                                <input class="appearance-none block w-full shadow-inner rounded-md py-3 px-4 leading-tight border border-gray-400 focus:outline-none  focus:border-gray-500"
                                    type="text">
                        </div>

                        <div>
                                <label class="block uppercase w-full tracking-wide text-gray-700 font-bold mb-2 text-xs">
                                    subir imagen
                                </label>
                                <button class="w-full px-4 bg-orange-400 p-3 rounded-lg text-white hover:bg-orange-500 fa fa-arrow-up">
                                </button>
                        </div>


                    </div>

                </form>
            </div>
        `,
        botones: [
            {
                id: 'btn-guardar-editor',
                titulo:'Guardar',
                estilo: 'mr-3 px-4 bg-green-400 p-3 rounded-lg text-white hover:bg-green-500',
                callBack: this.cualquierCosa
            },
            {
                id: 'btn-cerrar-editor',
                titulo:'Cerrar',
                estilo:'px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                callBack: this.cualquierCosa
            }
        ]
        })
    }


   



    
}