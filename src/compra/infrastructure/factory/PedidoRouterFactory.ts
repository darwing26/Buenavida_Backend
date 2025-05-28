import PedidoController from "../../../compra/infrastructure/express/controller/PedidoController";
import PedidoRouter from "../../../compra/infrastructure/express/router/PedidoRouter";
import PedidoUseCaseCreate from "../../../compra/application/usecase/PedidoUseCaseCreate";
import PedidoUseCaseDelete from "../../../compra/application/usecase/PedidoUseCaseDelete";
import PedidoUseCaseGet from "../../../compra/application/usecase/PedidoUseCaseGet";
import PedidoCreateServiceFactory from "../../../compra/infrastructure/factory/PedidoCreateServiceFactory";
import PedidoDeleteServiceFactory from "../../../compra/infrastructure/factory/PedidoDeleteServiceFactory";
import PedidoGetServiceFactory from "../../../compra/infrastructure/factory/PedidoGetServiceFactory";

export default class  PedidoRouterFactory {
    public static create(): PedidoRouter {
        const pedidoCreateService = PedidoCreateServiceFactory.create();
        const pedidoCreateUseCase = new PedidoUseCaseCreate(pedidoCreateService);

        const pedidoDeleteService = PedidoDeleteServiceFactory.create();
        const pedidoDeleteUseCase = new PedidoUseCaseDelete(pedidoDeleteService);

        const pedidoGetService = PedidoGetServiceFactory.create();
        const pedidoGetUseCase = new PedidoUseCaseGet(pedidoGetService);

        const pedidoController = new PedidoController(pedidoGetUseCase, pedidoCreateUseCase, pedidoDeleteUseCase);
        return new PedidoRouter(pedidoController);
    }
}