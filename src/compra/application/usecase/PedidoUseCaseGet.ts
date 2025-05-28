import PedidoUseCaseGetPort from "../../domain/port/driver/usecase/PedidoUseCaseGetPort";
import PedidoServiceGetPort from "../../domain/interfaces/services/PedidoServiceGetInterface";
import Pedido from "../../domain/model/pedido/Pedido";

export default class PedidoUseCaseGet implements PedidoUseCaseGetPort {

    constructor(private readonly pedidoServiceGet: PedidoServiceGetPort) {}

    public async getAllPedidos(): Promise<Pedido[]> {
        return await this.pedidoServiceGet.getAllPedidos();
    }

    public async getPedidoById(id: number): Promise<Pedido> {
        return await this.pedidoServiceGet.getPedidoById(id);
    }

    public async getPedidosByClient(clientId: number): Promise<Pedido[]> {
        return await this.pedidoServiceGet.getPedidosByClient(clientId);
    }
}