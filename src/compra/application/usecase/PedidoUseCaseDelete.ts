import PedidoUseCaseDeletePort from "../../domain/port/driver/usecase/PedidoUseCaseDeletePort";
import PedidoServiceDeletePort from "../../domain/interfaces/services/PedidoServiceDeleteInterface";

export default class PedidoUseCaseDelete implements PedidoUseCaseDeletePort {

    constructor(private readonly pedidoServiceDelete: PedidoServiceDeletePort) {}

    public async deletePedido(id: number): Promise<void> {
        await this.pedidoServiceDelete.deletePedido(id);
    }
}