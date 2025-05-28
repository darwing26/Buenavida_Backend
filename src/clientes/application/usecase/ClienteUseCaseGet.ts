import UserServiceGetPort from "../../domain/interfaces/services/ClienteServiceGetInterface";
import Cliente from "../../domain/model/client/Client";
import UserUseCaseGetPort from "../../domain/port/driver/usecase/ClienteUseCaseGetPort";

export default class UserUseCaseGet implements UserUseCaseGetPort {

    constructor(private readonly userServiceGet: UserServiceGetPort) {}

    public getClienteById = async (id: number): Promise<Cliente> => {
        const user = await this.userServiceGet.getClienteById(id);
        return user;
    }
    
}