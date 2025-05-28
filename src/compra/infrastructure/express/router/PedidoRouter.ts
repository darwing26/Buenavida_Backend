import RouterExpress from "../../../../express/domain/RouterExpress";
import PedidoRouterExpressInterface from "../../../domain/interfaces/PedidoRouterExpressInterface";
import PedidoControllerExpressPort from "../../../domain/interfaces/PedidoControllerExpressInterface";

export default class PedidoRouter extends RouterExpress implements PedidoRouterExpressInterface {

    constructor(private readonly pedidoController: PedidoControllerExpressPort) {
        super();
        this.routes();
    }

    public routes = (): void => {
        this.getAllPedidos();
        this.getPedidoById();
        this.getPedidosByClient();
        this.createPedido();
        this.deletePedido();
    }

    public getAllPedidos(): void {
        this.router.get(
            '/pedidos',
            this.pedidoController.getAllPedidos.bind(this.pedidoController)
        );
    }

    public getPedidoById(): void {
        this.router.get(
            '/pedidos/:id',
            this.pedidoController.getPedidoById.bind(this.pedidoController)
        );
    }

    public getPedidosByClient(): void {
        this.router.get(
            '/pedidos/cliente/:clientId',
            this.pedidoController.getPedidosByClient.bind(this.pedidoController)
        );
    }

    public createPedido(): void {
        this.router.post(
            '/createpedido',
            this.pedidoController.createPedido.bind(this.pedidoController)
        );
    }

    public deletePedido(): void {
        this.router.delete(
            '/deletepedido/:id',
            this.pedidoController.deletePedido.bind(this.pedidoController)
        );
    }
}