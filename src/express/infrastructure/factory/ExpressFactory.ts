import Server from "../server/Server";
import ClienteRouterFactory from "../../../clientes/infrastructure/factory/RouterClientesFactory";
import ProductRouterFactory from "../../../productos/infrastructure/factory/ProductRouterFactory";
import PedidoRouterFactory from "../../../compra/infrastructure/factory/PedidoRouterFactory";

export default class ExpressFactory {
  public static readonly create = (): Server => {

    const productRouter = ProductRouterFactory.create()
    const routerCliente = ClienteRouterFactory.create()
    const pedidoRouter = PedidoRouterFactory.create()
    
    const server = new Server([productRouter, routerCliente, pedidoRouter]);
    return server
  }
}