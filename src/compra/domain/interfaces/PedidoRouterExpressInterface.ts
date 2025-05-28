export default interface PedidoRouterExpressInterface {
    getAllPedidos() : void
    getPedidoById() : void
    getPedidosByClient() : void
    createPedido() : void
    deletePedido() : void
}