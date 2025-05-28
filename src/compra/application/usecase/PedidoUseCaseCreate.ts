import PedidoUseCaseCreatePort from "../../domain/port/driver/usecase/PedidoUseCaseCreatePort";
import PedidoServiceCreatePort from "../../domain/interfaces/services/PedidoServiceCreateInterface";
import { ProductoPedidoInterface } from "../../domain/types/PedidoDataInterface";

export default class PedidoUseCaseCreate implements PedidoUseCaseCreatePort {

    constructor(private readonly pedidoServiceCreate: PedidoServiceCreatePort) {}

    public async createPedido(usuarioId: number, productos: { productos_idproductos: number, cantidad: number }[], fecha: string): Promise<void> {
        let p : ProductoPedidoInterface[] = []
        productos.forEach((producto) => { p.push({productos_idproductos: producto.productos_idproductos, cantidad: producto.cantidad}) })

        await this.pedidoServiceCreate.createPedido(usuarioId, p, fecha);
    }
}