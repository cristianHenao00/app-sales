import Helpers from './helpers.js';
import Modal from './modal.js';

export  default class Productos{
    #productos;
    #formEdicion;


    constructor(){
        this.#productos=[]
    }

    static async crear(){
        const instancia = new Productos();

        await Helpers.cargarPagina(
            '#index-contenido',
            './resources/views/productos.html'
        ).then(()=>
                instancia.#formEdicion = document.querySelector('#bloque-edicion').innerHTML
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
                    estilo: 'modal-close px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                    
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
            contenido: this.formularioEdicion(i),
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
                    estilo: 'modal-close px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500'
                    
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
            contenido: this.formularioAdicion(),
            
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
                    estilo:'modal-close px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                    
                }
        ]
        })
    }
       
    formularioAdicion(){
        this.#formEdicion = this.#formEdicion.replace('productos-edicion', 'productos-adicion');
        const busqueda = ['$identificador', '$referencia', '$disponible', '$precio', '$resumen', '$caracteristicas', '$imagen'];
        const reemplazo = ['', '', '', '', '', '', ''];
        return this.#formEdicion.replaceArray(busqueda, reemplazo);
    }

    formularioEdicion(i){
        this.#formEdicion = this.#formEdicion.replace('productos-edicion', 'productos-adicion');
        const busqueda = ['$identificador', '$referencia', '$disponible', '$precio', '$resumen', '$caracteristicas', '$imagen'];
        const reemplazo = Object.values(this.#productos[i]);
        return this.#formEdicion.replaceArray(busqueda, reemplazo);
    }

    
}