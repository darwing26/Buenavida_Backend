export default interface UserUseCaseCreatePort {
    createCliente(
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        dirrecion: string
    ): Promise<void>;

    agregarFavorito(idUsuario: number, idProducto: number): Promise<void>;
    eliminarFavorito(idUsuario: number, idProducto: number): Promise<void>;
    obtenerFavoritos(idUsuario: number): Promise<any[]>;
}