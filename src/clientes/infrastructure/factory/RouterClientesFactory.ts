import ClienteControllerExpress from "../../../clientes/infrastructure/express/controller/ClienteController";
import ClienteRouterExpress from "../../../clientes/infrastructure/express/router/ClienteRouterExpress";
import ClienteUseCaseCreate from "../../../clientes/application/usecase/ClienteUseCaseCreate";
import ClienteUseCaseGet from "../../../clientes/application/usecase/ClienteUseCaseGet";
import ClienteUseCaseLogin from "../../../clientes/application/usecase/ClienteUseCaseLogin";
import ClienteCreateServiceFactory from "../../../clientes/infrastructure/factory/ClienteCreateServiceFactory";
import ClienteGetServiceFactory from "../../../clientes/infrastructure/factory/ClienteGetServiceFactory";
import ClienteLoginServiceFactory from "../../../clientes/infrastructure/factory/ClienteLoginServiceFactory";
import UserRouterExpress from "../../../clientes/infrastructure/express/router/ClienteRouterExpress";

export default class ClienteRouterFactory {
    public static create(): ClienteRouterExpress {
        const userCreateService = ClienteCreateServiceFactory.create();
        const userCreateUseCase = new ClienteUseCaseCreate(userCreateService);

        const userGetService = ClienteGetServiceFactory.create();
        const userGetUseCase = new ClienteUseCaseGet(userGetService);

        const userLoginService = ClienteLoginServiceFactory.create();
        const userLoginUseCase = new ClienteUseCaseLogin(userLoginService);

        const userController = new ClienteControllerExpress(userCreateUseCase, userGetUseCase, userLoginUseCase);
        return new UserRouterExpress(userController);
    }
}