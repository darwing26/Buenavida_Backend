import User from "../../../types/User";
import Repository from "../../repository/RepositoryCliente";
import ClienteInterface from "../../types/ClienteInterface";

export default interface UserRepositoryPort extends Repository<string, ClienteInterface> {
    login(correo: string, password: string): Promise<User | null>;
    agregar(idUsuario: number, idProducto: number): Promise<void>;
    eliminar(idUsuario: number, idProducto: number): Promise<void>;
    obtenerTodos(idUsuario: number): Promise<any[]>;

}