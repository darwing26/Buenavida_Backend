import UserRepositoryPort from "../../domain/port/driven/ClienteRepositoryPort";
import ClienteInterface from "../../domain/types/ClienteInterface";
import User from "../../types/User";

import MetodosDBclientes from "./MetodosDBclientes";

export default class UserRepository implements UserRepositoryPort {

    constructor(private readonly metodosDBclientes: MetodosDBclientes) {}


    findById = async (id: string): Promise<ClienteInterface> => {
        const userFromDB = await this.metodosDBclientes.getById(parseFloat(id));
        if (userFromDB == null) return {
            id: 0,
            nombre: '',
            correo: '',
            password: '',
            telefono: '',
            direccion: ''
        };

        const userItemDb = userFromDB[0];

        const user = {
            id: userItemDb.idusuarios,
            nombre: userItemDb.nombre,
            correo: userItemDb.correo,
            password: userItemDb.password,
            telefono: userItemDb.telefono,
            direccion: userItemDb.direccion
        };

        return user;
    }

    save = (item: ClienteInterface): void => {
        try {
            this.metodosDBclientes.save(
                item.nombre,
                item.correo,
                item.password,
                item.telefono,
                item.direccion
            );
            console.log('Usuario guardado exitosamente');
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    }

    login = async (correo: string, password: string): Promise<User | null> => {
    try {
        const user = await this.metodosDBclientes.login(correo, password);
        return user;
    } catch (error) {
        console.error("Error en UserRepository al realizar el login:", error);
        throw new Error("Error al realizar el login");
    }
    }

    public async agregar(idUsuario: number, idProducto: number): Promise<void> {
        await this.metodosDBclientes.agregarFavorito(idUsuario, idProducto);
    }

    public async eliminar(idUsuario: number, idProducto: number): Promise<void> {
        await this.metodosDBclientes.eliminarFavorito(idUsuario, idProducto);
    }

    public async obtenerTodos(idUsuario: number): Promise<any[]> {
        return await this.metodosDBclientes.obtenerFavoritosPorUsuario(idUsuario);
    }
    
}