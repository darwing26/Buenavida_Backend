import Product from "../../../../productos/domain/model/Products/Product";

export default class CarritoPedidos {
    public producto : Product;
    public cantidad : number;

    constructor(producto : Product, cantidad : number) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

}