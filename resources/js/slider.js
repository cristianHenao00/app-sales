import Helpers from './helpers.js';

export default class Slider{

    static async crear(){
        
        await Helpers.cargarPagina(
            '#carrito-carrusel',
            './resources/views/slider.html'
        ).catch(error => 
                console.log(error)
        );
        
    }

    
}