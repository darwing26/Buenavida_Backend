import AbstractPedido, { PedidoAttributes } from "./AbstractPedido";

export default class Pedido extends AbstractPedido {

    constructor(pedidoAttributes : PedidoAttributes) {
        super(pedidoAttributes);
    }

    public override isNull = (): boolean => {
        return false
    }
    
}