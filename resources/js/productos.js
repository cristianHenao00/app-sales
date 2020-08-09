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
                <tr id="producto-${indice}" class="bg-gray-100">
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
                    callBack: () => this.agregarNuevaEdicion(event, i)
                },
                {
                    id: 'btn-cerrar-editor',
                    titulo:'Cerrar',
                    estilo: 'modal-close px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500'
                    
                }
            ]
        });
        /**
         * Busca el boton para subir imagen y le crea un evento change el cual llama la funcion que actualiza el nombre 
         */
        //document.querySelector(`#productos-edicion-${i} #btnimagen`).addEventListener('change', e => this.actualizaNombre(e));
    }
    
    eliminarFila(event, i){
        document.querySelector(`#producto-${i}`).style.display='none';
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
                    callBack: () => this.agregarNuevoProducto()
                },
                {
                    id: 'btn-cerrar-editor',
                    titulo:'Cerrar',
                    estilo:'modal-close px-4 bg-red-400 p-3 rounded-lg text-white hover:bg-red-500',
                    
                }
        ]
        });
        // Busca el boton para subir imagen y le crea un evento change el cual llama la funcion que actualiza el nombre 
        document.querySelector('#productos-adicion #btnimagen').addEventListener('change', e => this.actualizaNombre(e));
        
    }
    /**
     * Funcion que captura el nombre de la imagen desde el evento change de un input(file) y
     * lo actualiza en otro input(txt)
     */
    
    actualizaNombre(e){
        let nombre = document.getElementsByName('file')[1].files[0].name;
        document.getElementsByName('txtimagen')[1].value = nombre;
    }

    agregarNuevoProducto(){
                        
        let id = document.getElementsByName('identificador')[1].value;
        let referencia = document.getElementsByName('referencia')[1].value;
        let disponible = document.getElementsByName('disponible')[1].value;
        let resumen = document.getElementsByName('resumen')[1].value;
        let caracteristicas = document.getElementsByName('caracteristicas')[1].value;
        let precio = document.getElementsByName('precio')[1].value;
        let txtimagen = document.getElementsByName('txtimagen')[1].value;

        this.#productos.push({
            "id": id,
            "referencia": referencia,
            "disponible": disponible,
            "precio": precio,
            "resumen": resumen,
            "detalles": caracteristicas,
            "imagen": txtimagen
        });
        let indice = this.#productos.length-1;
        
        let f = `
           <tr id="producto-${indice}" class="bg-gray-100">
                    <td class="border text-center py-2 px-4">${id}</td>
                    <td class="border text-center py-2 px-4">
                        <img src="./resources/assets/images/${txtimagen}" alt="" class="h-16 rounded-full mx-auto">
                        <button id="producto-btndetalles-${indice}" class="modal-open text-orange-700 hover:bg-orange-100 px-2 text-sm">${referencia}</button>
                    </td>
                    <td class="border text-left py-2 px-4">${resumen}</td>
                    <td class="border text-center py-2 px-4">${disponible}</td>
                    <td class="border text-center py-2 px-4">${precio}</td>
                    <td class="border text-center py-2 px-4">
                        <button id="producto-btneditar-${indice}" class="button button-small fa fa-edit focus:outline-none" title="Editar"></button>
                        <button id="producto-btneliminar-${indice}" class="button button-small fa fa-trash focus:outline-none" title="Eliminar"></button>
                    </td>
            </tr>
        `;

        document.querySelector('#productos-tabla').insertAdjacentHTML('beforeend', f);

        document.querySelector(`#producto-btndetalles-${indice}`).addEventListener(
            'click', e => this.verDetalles(e, indice)
        );
        document.querySelector(`#producto-btneditar-${indice}`).addEventListener(
            'click', e => this.editarFila(e, indice)
        );
        document.querySelector(`#producto-btneliminar-${indice}`).addEventListener(
            'click', e => this.eliminarFila(e, indice)
        );
        
    }

    agregarNuevaEdicion(event, i){
        let producto = document.querySelector(`#producto-${i}`);

        this.#productos[i].id = document.getElementsByName(`identificador`)[1].value;
        this.#productos[i].referencia = document.getElementsByName('referencia')[1].value;
        this.#productos[i].disponible = document.getElementsByName('disponible')[1].value;
        this.#productos[i].precio = document.getElementsByName('precio')[1].value;
        this.#productos[i].resumen = document.getElementsByName('resumen')[1].value;
        this.#productos[i].detalles = document.getElementsByName('caracteristicas')[1].value;
        this.#productos[i].imagen = document.getElementsByName('txtimagen')[1].value;
                
        let edicionFila = `
        <tr id="producto-${i}" class="bg-gray-100">
            <td class="border text-center py-2 px-4">${this.#productos[i].id}</td>
            <td class="border text-center py-2 px-4">
                <img src="./resources/assets/images/${this.#productos[i].imagen}" alt="" class="h-16 rounded-full mx-auto">
                <button id="producto-btndetalles-${i}" class="modal-open text-orange-700 hover:bg-orange-100 px-2 text-sm">${this.#productos[i].referencia}</button>
            </td>
            <td class="border text-left py-2 px-4">${this.#productos[i].resumen}</td>
            <td class="border text-center py-2 px-4">${this.#productos[i].disponible}</td>
            <td class="border text-center py-2 px-4">${this.#productos[i].precio}</td>
            <td class="border text-center py-2 px-4">
                <button id="producto-btneditar-${i}" class="button button-small fa fa-edit focus:outline-none" title="Editar"></button>
                <button id="producto-btneliminar-${i}" class="button button-small fa fa-trash focus:outline-none" title="Eliminar"></button>
            </td>
        </tr>
        `;
        producto.innerHTML= edicionFila;

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
   
       
    formularioAdicion(){
        this.#formEdicion = this.#formEdicion.replace('productos-edicion', 'productos-adicion');
        const busqueda = ['$identificador', '$referencia', '$disponible', '$precio', '$resumen', '$caracteristicas', '$imagen'];
        const reemplazo = ['', '', '', '', '', '', ''];
        return this.#formEdicion.replaceArray(busqueda, reemplazo);
    }

    formularioEdicion(i){
        this.#formEdicion = this.#formEdicion.replace('productos-edicion', `productos-edicion-${i}`);
        const busqueda = ['$identificador', '$referencia', '$disponible', '$precio', '$resumen', '$caracteristicas', '$imagen'];
        const reemplazo = Object.values(this.#productos[i]);
        return this.#formEdicion.replaceArray(busqueda, reemplazo);
    }

    
}