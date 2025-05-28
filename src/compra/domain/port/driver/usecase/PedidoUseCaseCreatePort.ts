export default interface PedidoUseCaseCreatePort {
    createPedido(usuarioId: number, productos: { productos_idproductos: number, cantidad: number }[], fecha: string): Promise<void>;
}