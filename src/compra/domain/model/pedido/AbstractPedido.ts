import Cliente from "../../../../clientes/domain/model/client/Client";
import CarritoPedidos from "../carrito/CarritoPedidos";

export default abstract class AbstractPedido {
    protected id : number;
    protected cliente : Cliente;
    protected productos : CarritoPedidos[];
    protected total : number;
    protected estado : string;
    protected fecha : string;

    constructor(pedidoAttributes : PedidoAttributes){
       this.id = pedidoAttributes.id;
       this.cliente = pedidoAttributes.cliente;
       this.productos = pedidoAttributes.productos;
       this.total = this.calcularTotal(pedidoAttributes.productos);
       this.estado = pedidoAttributes.estado;
       this.fecha = pedidoAttributes.fecha;
    }

    public calcularTotal(proc : CarritoPedidos[]) : number {
        let total : number = 0;
        proc.forEach((producto) => {
            total += producto.producto.precio * producto.cantidad;
        });
        return total;
    }

    public abstract isNull: () => boolean;

    public getId() : number {
        return this.id;
    }

    public getCliente() : Cliente {
        return this.cliente;
    }

    public getProductos() : CarritoPedidos[] {
        return this.productos;
    }

    public getTotal() : number {
        return this.total;
    }

    public getEstado() : string {
        return this.estado;
    }

    public getFecha() : string {
        return this.fecha;
    }

}


export interface PedidoAttributes {
    id : number;
    cliente : Cliente;
    productos : CarritoPedidos[];
    estado : string;
    fecha : string;

}