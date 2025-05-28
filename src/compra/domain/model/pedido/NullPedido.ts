import NullClient from "../../../../users/domain/model/client/NullClient";
import NullCarritoPedidos from "../carrito/NullCarritoPedido";
import Pedido from "./Pedido";

export default class NullPedido extends Pedido {
    constructor() {
        super({
            id: 0,
            cliente: new NullClient(),
            productos: [new NullCarritoPedidos()],
            estado: "",
            fecha: ""
        });
    }

    public override isNull = (): boolean => {
        return true
    }
    
}