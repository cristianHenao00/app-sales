export default class Helpers{
    static async cargarPagina(elemento, url) {
        let respuesta = await fetch(url);
        
        if (respuesta.ok) {
            const contenedor = document.querySelector(elemento);
            contenedor.innerHTML = await respuesta.text();
            return contenedor;
        }

        throw `error ${respuesta.status} -
        ${respuesta.statusText}`;
    }
}