import PedidoServiceDeletePort from "../../domain/interfaces/services/PedidoServiceDeleteInterface";
import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort";

export default class PedidoServiceDelete implements PedidoServiceDeletePort {

    constructor(private readonly pedidoRepository: IPedidoRepositoryPort) {}

    public async deletePedido(id: number): Promise<void> {
        try {
            await this.pedidoRepository.delete(id.toString());
            console.log("Pedido eliminado");
        } catch (error) {
            console.error("Error en PedidoServiceDelete:", error);
            throw new Error("Error al eliminar el pedido");
        }
    }
}