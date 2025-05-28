import UserServiceCreatePort from "../../domain/interfaces/services/ClienteServiceCreateInterface";
import IUserRepository from "../../domain/port/driven/ClienteRepositoryPort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserServiceCreate implements UserServiceCreatePort {

    constructor(private readonly userRepository: IUserRepository) {}

    public async createCliente(cliente: ClienteInterface): Promise<void> {
        try {
            this.userRepository.save(cliente);
           
        } catch (error) {
            console.error("Error en UserServiceCreate:", error);
            throw new Error("Error al crear el usuario");
        }
    }

    public async agregar(idUsuario: number, idProducto: number): Promise<void> {
        return this.userRepository.agregar(idUsuario, idProducto);
    }

    public async eliminar(idUsuario: number, idProducto: number): Promise<void> {
        return this.userRepository.eliminar(idUsuario, idProducto);
    }

    public async obtenerTodos(idUsuario: number): Promise<any[]> {
        return this.userRepository.obtenerTodos(idUsuario);
    }
}