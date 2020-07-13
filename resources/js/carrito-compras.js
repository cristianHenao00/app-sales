import Helpers from './helpers.js';

export default class CarritoDeCompras{
    #productos;
    #porComprar;
    #descuento;

    constructor(){
        this.#productos = [];
        this.#porComprar = [];
        this.#descuento = 15;
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
        this.#productos.forEach((producto, indice) => {
            let idEnlace = `carrito-producto-${indice}`;
            let fichaProducto = `
                <div class="w-full flex flex-col p-3">
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <img src="./resources/assets/images/${producto.imagen}" alt="" class="w-full h-64">
                        <div class="p-4 flex-1 flex flex-col" style="">
                            <h3 class="mb-4 tex-2x1">${producto.referencia} - ${producto.precio}</h3>
                            <div class="mb-4 text-grey-darker tex-sm flex-1">
                                <p>${producto.resumen}</p>
                            </div>
                            <a id="${idEnlace}" data-indice="${indice}" href="#"
                                class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded
                                    focus:outline-none focus:shadow-outline text-center"
                                style="">AGREGAR AL CARRITO
                            </a>
                        </div>
                    </div>
                </div>`;
            document.querySelector('#carrito-disponibles').insertAdjacentHTML('beforeend', fichaProducto);
            document.querySelector(`#${idEnlace}`).addEventListener('click', e =>{
                this.agregarAlCarrito(e.target.dataset.indice);
            })
        });
        let btnPagar = document.querySelector('#carrito-btnpagar')
        btnPagar.style.display = 'none'; //visible si hay elementos en el carrito
        btnPagar.addEventListener('click', event => this.procesarPago());
        let btnVaciarCarrito = document.querySelector('#carrito-vaciar');
        btnVaciarCarrito.style.display = 'none';
        btnVaciarCarrito.addEventListener('click', event => this.vaciarCarrito());
        this.carrusel();
        this.generarCupon()
    }

    agregarAlCarrito(indice){
        
        let idBtnEliminar = `carrito-btneliminar-${indice}`;
        let disponibles = this.#productos[indice].disponible;
        let item = this.#porComprar.find(producto =>
            producto.indice === indice);
        if (item){
            document.querySelector(`#carrito-venta-${item.indice}`).scrollIntoView();
            document.querySelector(`#lstcantidad-${item.indice}`).focus();
            return
        }
        this.#porComprar.push({
            indice,
            articulo: this.#productos[indice],
            cantidad: 1
        });
        let elementosLista = '<option>1</option>';
        for (let i = 2; i <= disponibles; i++){
            elementosLista += `<option>${i}</option>`;
        }
    
        let producto = `
            
            <div id="carrito-venta-${indice}" class="border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap">
                <div class="w-2/4">
                    <h3 class="text-lg font-medium">${this.#productos[indice].referencia}</h3>
                    <h4 class="text-red-600 text-xs font-bold mt-1">Sólo quedan ${disponibles} en stock</h4>
                </div>
                <div>
                    <h5 class="text-2x1 font-medium">
                        <sup class="text-lg text-orange-700">$</sup>
                        ${this.#productos[indice].precio}
                    </h5>
                    <h5 class="text-sm font-bold text-orange-800">Descuento ${this.#descuento}%</h5>
                </div>
                <div class="w-full flex justify-between mt-4">
                    <button id="${idBtnEliminar}" data-indice="${indice}" class="text-red-600 hover:bg-red-100 px-2">
                        ELIMINAR</button>
                    <label class="block uppercase tracking-wide text-gray-700" for="grid-first-name">
                        UNIDADES
                        <select id="lstcantidad-${indice}" class="ml-3 text-sm bg-gray-400 border-gray-200 text-white-200 p-2 rounded leading-tight">
                            ${elementosLista}
                        </select>
                    </label>
                </div>
            </div>`;
        document.querySelector('#carrito-elegidos').insertAdjacentHTML('beforeend', producto);
        document.querySelector('#carrito-btnpagar').style.display = '';
        document.querySelector('#carrito-vaciar').style.display = '';
        document.querySelector(`#${idBtnEliminar}`).addEventListener('click', e =>{
            this.eliminarDelCarrito(e.target.dataset.indice);
        });
        
        
    }

    vaciarCarrito(){
        let elemento = document.querySelector(`#carrito-elegidos`);
        elemento.innerHTML = '';
        this.#porComprar = []
        if(this.#porComprar.length === 0){
            document.querySelector('#carrito-btnpagar').style.display = 'none';
            document.querySelector('#carrito-vaciar').style.display = 'none';
        }
        
    }
   

    eliminarDelCarrito(indice){
        let elemento = document.querySelector(`#carrito-venta-${indice}`);
        elemento.parentNode.removeChild(elemento); //distinto a dejarlo vacío
        
        let item = this.#porComprar.find(
            producto => producto.indice === indice
        );
        let i = this.#porComprar.indexOf(item);
        this.#porComprar.splice(i, 1);
        
        if(this.#porComprar.length === 0){
            document.querySelector('#carrito-btnpagar').style.display = 'none';
            document.querySelector('#carrito-vaciar').style.display = 'none';
        }
    }

    procesarPago(){
        let subtotal = 0;
        
        let valor = this.#porComprar.forEach(producto =>{
            subtotal += (producto.articulo.precio * producto.cantidad);
            return subtotal
        });
        let iva = subtotal * (this.#descuento / 100);
        let totalPago = iva + subtotal;
       
        
        
        let pago = `
            <div class="bg-white rounded shadow p-2 w-full">
                <div class="w-full bg-orange-100 px-8 py-6">
                    <h3 class="text-2x1 mt-4 font-bold">Resumen del pago</h3>
                    <div class="flex justify-between mt-3">
                        <div class="text-1 text-orange-900 font-bold">Valor</div>
                        <div class="text-1 text-right font-bold">$${subtotal}</div>
                    </div>
                    <div class="flex justify-between mt-3">
                        <div class="text-1 text-orange-900 font-bold">
                            IVA (19%)
                        </div>
                        <div class="text-x1 text-right font-bold">$${iva}</div>
                    </div>
                    <div class="bg-orange-300 h-1 w-full mt-3"></div>
                    <div class="flex justify-between mt-3">
                        <div class="text-xl text-orange-900 font-bold">
                             Total a pagar
                        </div>
                        <div class="text-x1 text-orange-900 font-bold">
                            $${totalPago}
                        </div>
                    </div>
                    <button id="carrito-btnconfirmar" class="px-2 py-2 bg-orange-500 text-white w-full mt-3
                        rounded shadow font-bold hover:bg-orange-800">
                        CONFIRMAR
                    </button>
                </div>
            </div>`;
        document.querySelector('#carrito-confirmacion').innerHTML = pago;
        document.querySelector('#carrito-btnconfirmar').addEventListener('click', event => this.confirmarPago())
    }

    confirmarPago() {

        if (Helpers.existeElemento('#carrito-orden-envio')) return;
       
        let nroOrden = Helpers.getRandomInt(10000, 9999999);

        let confirmacion = `
            <div id="carrito-orden-envio"
                class="bg-white rounded shadow px-10 py-6 w-full mt-4
                       flex flex-wrap justify-center ">


                <div class="pr-8">
                    <h3 class="text-2xl mt-4 font-bold
                        text-orange-900">Gracias por su compra
                    </h3>

                    <h4 id="carrito-nro-orden" class="text-sm
                            text-gray-600 font-bold">
                        ORDEN DE ENVÍO #${nroOrden}</h4>
                </div>

                <img src="https://image.flaticon.com/icons/svg/1611/1611768.svg"
                     alt="" class="w-24">
            </div>
        `;
        let stock = 0;
        let tmp = this.#porComprar.forEach(producto =>{
            stock = (producto.articulo.disponible - producto.cantidad);
            this.#productos.disponible = stock
            console.log(this.#productos.disponible)
            return stock
        });
        

        document.querySelector('#carrito-confirmacion')
           .insertAdjacentHTML('beforeend', confirmacion);
    }

    carrusel(){
        let slider = `
                <div class="carousel relative shadow-2xl bg-white">
                    <div class="carousel-inner relative overflow-hidden w-full">
                        <!--Slide 1-->
                        <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked">
                        <div class="carousel-item absolute opacity-0" style="height:30vh;">
                            <img src="./resources/assets/images/promo1.jpg" alt="" class="h-64 w-full">
                        </div>
                        <label for="carousel-3" class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                        <label for="carousel-2" class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
                        
                        <!--Slide 2-->
                        <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
                        <div class="carousel-item absolute opacity-0" style="height:30vh;">
                            <img src="./resources/assets/images/promo2.jpg" alt="" class="h-64 w-full">
                        </div>
                        <label for="carousel-1" class="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                        <label for="carousel-3" class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label> 
                        
                        <!--Slide 3-->
                        <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
                        <div class="carousel-item absolute opacity-0" style="height:30vh;">
                            <img src="./resources/assets/images/promo3.jpg" alt="" class="h-64 w-full">
                        </div>
                        <label for="carousel-2" class="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                        <label for="carousel-1" class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-orange-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
                
                        <!-- Add additional indicators for each slide-->
                        <ol class="carousel-indicators">
                            <li class="inline-block mr-3">
                                <label for="carousel-1" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-orange-700">•</label>
                            </li>
                            <li class="inline-block mr-3">
                                <label for="carousel-2" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-orange-700">•</label>
                            </li>
                            <li class="inline-block mr-3">
                                <label for="carousel-3" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-orange-700">•</label>
                            </li>
                        </ol>
                        
                    </div>
                </div>
        `
        document.querySelector('#carrito-carrusel').insertAdjacentHTML('afterbegin', slider);
               
    }

    generarCupon(){

        let cuponAleatorio = Helpers.getRandomInt(1, 10);

        let cupon = `
            <img src="https://svgsilh.com/svg/151889.svg" class="w-10 block pr-2">
            <div class="text-sm">Felicitaciones usted ha sido elegido para un <b>cupón de
                    descuento</b> en este pedido </div>
        `
        let cupon1= `
            <img src="https://svgsilh.com/svg/151889.svg" class="w-10 block pr-2">
            <div class="text-sm">Felicitaciones llego al mejor sitio de ventas online</div>
        `

        if(cuponAleatorio == 3 || cuponAleatorio == 6 || cuponAleatorio ==9){
            document.querySelector("#carrito-alerta").insertAdjacentHTML('afterbegin', cupon)
            
        }
        else{
            document.querySelector("#carrito-alerta").insertAdjacentHTML('afterbegin', cupon1)
        }
    }    
}