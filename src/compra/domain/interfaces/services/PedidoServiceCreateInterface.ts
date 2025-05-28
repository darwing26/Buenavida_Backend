import { ProductoPedidoInterface } from "../../types/PedidoDataInterface";

export default interface PedidoServiceCreatePort {
    createPedido(usuarioId: number, productos: ProductoPedidoInterface[], fecha: string): Promise<void>;
}

