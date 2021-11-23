class Anuncio {

    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}


export class Anuncio_Ext extends Anuncio {

    constructor(id, titulo, transaccion, descripcion, precio, puertas, km, potencia) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.km = km;
        this.potencia = potencia;
    }
}