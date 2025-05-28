import UserServiceCreatePort from "../../domain/interfaces/services/ClienteServiceCreateInterface";
import UserUseCaseCreatePort from "../../domain/port/driver/usecase/ClienteUseCaseCreatePort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserUseCaseCreate implements UserUseCaseCreatePort {

    constructor(private readonly userServiceCreate: UserServiceCreatePort) {}

    public async createCliente(
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ): Promise<void> {
        const cliente: ClienteInterface = {
            id: 0, 
            nombre,
            correo,
            password,
            telefono,
            direccion
        };

        await this.userServiceCreate.createCliente(cliente);
    }

    public async agregarFavorito(idUsuario: number, idProducto: number): Promise<void> {
        await this.userServiceCreate.agregar(idUsuario, idProducto);
    }

    public async eliminarFavorito(idUsuario: number, idProducto: number): Promise<void> {
        await this.userServiceCreate.eliminar(idUsuario, idProducto);
    }

    public async obtenerFavoritos(idUsuario: number): Promise<any[]> {
        return this.userServiceCreate.obtenerTodos(idUsuario);
    }
}