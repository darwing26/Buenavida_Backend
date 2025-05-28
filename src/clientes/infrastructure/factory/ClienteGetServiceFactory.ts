import UserServiceGet from "../../application/service/ClienteServiceGet";
import UserServiceGetPort from "../../domain/interfaces/services/ClienteServiceGetInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryCliente";

export default class UserGetServiceFactory {
    public static readonly create = (): UserServiceGetPort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceGet(sqlRepository);
    }
}