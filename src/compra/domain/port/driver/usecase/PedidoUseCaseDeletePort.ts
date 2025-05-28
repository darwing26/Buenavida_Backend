export default interface PedidoUseCaseDeletePort {
    deletePedido(id: number): Promise<void>;
}