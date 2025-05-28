export default interface PedidoServiceDeletePort {
    deletePedido(id: number): Promise<void>;
}