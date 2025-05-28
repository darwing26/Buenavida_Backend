import Pedido from "../../model/pedido/Pedido";


export default interface PedidoServiceGetPort {
    getAllPedidos(): Promise<Pedido[]>;
    getPedidoById(id: number): Promise<Pedido>;
    getPedidosByClient(clientId: number): Promise<Pedido[]>;
}
