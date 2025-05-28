import Pedido from "../../../model/pedido/Pedido";

export default interface PedidoUseCaseGetPort {
    getAllPedidos(): Promise<Pedido[]>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidosByClient(clientId: number): Promise<Pedido[]>;
}