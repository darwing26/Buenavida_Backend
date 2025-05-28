import UserServiceCreate from "../../application/service/ClienteServiceCreate";
import UserServiceCreatePort from "../../domain/interfaces/services/ClienteServiceCreateInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryCliente";

export default class UserCreateServiceFactory {
    public static readonly create = (): UserServiceCreatePort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceCreate(sqlRepository);
    }
}