import ClienteInterface from "../../types/ClienteInterface";

export default interface UserServiceCreateInterface {
    createCliente(cliente: ClienteInterface): Promise<void>;
    agregar(idUsuario: number, idProducto: number): Promise<void>;
    eliminar(idUsuario: number, idProducto: number): Promise<void>;
    obtenerTodos(idUsuario: number): Promise<any[]>;
}