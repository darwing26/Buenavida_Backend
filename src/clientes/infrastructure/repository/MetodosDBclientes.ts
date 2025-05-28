import { connectToDatabase } from "../../../utils/conectdb";
import User from "../../types/User";

export default class MetodosDBclientes {
    
    private readonly queryGetUserById = "CALL GetUserById(?);";
    private readonly queryInsertUser = "CALL GuardarUsuario(?, ?, ?, ?, ?);";
    
    constructor() { }

    public getById = async (id: number) => {
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetUserById, [id])) as any[];

        if (rows[0].length > 0) {
           
            return rows[0];
        } else {
            console.log("No se encontró un usuario con el ID proporcionado");
            return null;
        }
    }

    public save = async (
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ) => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.execute(this.queryInsertUser, [
                nombre,
                correo,
                password,
                telefono,
                direccion,
            ]);
            console.log("Usuario guardado exitosamente");
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
        }
    }

    public login = async (correo: string, password: string): Promise<User | null> => {
    try {
        const connectionDB = await connectToDatabase();
        
        // Cambiar la query para que retorne los datos del usuario
        const queryLoginWithData = `
            SELECT idusuarios, correo, nombre 
            FROM usuarios 
            WHERE correo = ? AND password = ?
        `;
        
        const [rows] = (await connectionDB.execute(queryLoginWithData, [
            correo,
            password,
        ])) as any[];

        if (rows.length > 0) {
            // Retornar el usuario completo con su ID
            console.log("Usuario encontrado:", rows[0].idusuarios);
            return {
                id: rows[0].idusuarios,
                correo: rows[0].correo,
                nombre: rows[0].nombre,
                // otros campos necesarios...
            };
        } else {
            return null; // Credenciales inválidas
        }
    } catch (error) {
        console.error("Error en SQLRep al realizar el login:", error);
        throw new Error("Error al realizar el login en la base de datos");
    }
    }

    public async agregarFavorito(idUsuario: number, idProducto: number): Promise<void> {
        const db = await connectToDatabase();
        await db.execute("INSERT INTO favoritos (idusuario, idproductos) VALUES (?, ?)", [idUsuario, idProducto]);
    }

    public async eliminarFavorito(idUsuario: number, idProducto: number): Promise<void> {
        const db = await connectToDatabase();
        await db.execute("DELETE FROM favoritos WHERE idusuario = ? AND idproductos = ?", [idUsuario, idProducto]);
    }

    public async obtenerFavoritosPorUsuario(idUsuario: number): Promise<any[]> {
        const db = await connectToDatabase();
        const [rows] = await db.execute(`
            SELECT p.*
            FROM favoritos f
            INNER JOIN productos p ON f.idproductos = p.idproductos
            WHERE f.idusuario = ?
        `, [idUsuario]);
        return rows as any[];
    }


}