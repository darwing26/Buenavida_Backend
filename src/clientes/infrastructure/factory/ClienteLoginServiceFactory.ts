import UserServiceLogin from "../../application/service/ClienteServiceLogin";
import UserServiceLoginPort from "../../domain/interfaces/services/ClienteServiceLoginInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryCliente";

export default class UserLoginServiceFactory {
    public static readonly create = (): UserServiceLoginPort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceLogin(sqlRepository);
    }
}