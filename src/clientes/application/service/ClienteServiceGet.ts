import UserServiceGetPort from "../../domain/interfaces/services/ClienteServiceGetInterface";
import Cliente from "../../domain/model/client/Client";
import NullClient from "../../domain/model/client/NullClient";
import IUserRepository from "../../domain/port/driven/ClienteRepositoryPort";

export default class UserServiceGet implements UserServiceGetPort {

    constructor(private readonly userRepository: IUserRepository) {}

    public getClienteById = async (id: number): Promise<Cliente> => {
        const sqlUser = await this.userRepository.findById(id.toString());
        if (sqlUser.id === 0) return new NullClient();

        return new Cliente({
            id : sqlUser.id,
            nombre: sqlUser.nombre,
            correo: sqlUser.correo,
            password: sqlUser.password,
            telefono: sqlUser.telefono,
            direccion: sqlUser.direccion
        }
        );
    }
}