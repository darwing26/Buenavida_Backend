import { Request, Response } from "express";
import UserControllerExpressPort from "../../../domain/interfaces/ClienteControllerExpressInterface";
import UserUseCaseCreatePort from "../../../domain/port/driver/usecase/ClienteUseCaseCreatePort";
import UserUseCaseGetPort from "../../../domain/port/driver/usecase/ClienteUseCaseGetPort";
import UserUseCaseLoginPort from "../../../domain/port/driver/usecase/ClienteUseCaseLoginPort";


export default class UserControllerExpress implements UserControllerExpressPort {

    constructor(
        private readonly userUseCaseCreate: UserUseCaseCreatePort,
        private readonly userUseCaseGet: UserUseCaseGetPort,
        private readonly userUseCaseLogin: UserUseCaseLoginPort,
        
    ) {}

    public async createCliente(req: Request, res: Response): Promise<void> {
        try {
          
            const { nombre, correo, password, telefono, direccion } = req.body;

          
            if (!nombre || !correo || !password || !telefono || !direccion) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }

          
            await this.userUseCaseCreate.createCliente(nombre, correo, password, telefono, direccion);

        
            res.status(200).json({ message: "Usuario creado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al crear el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            res.status(400).json({ message: "Correo y contraseña son obligatorios" });
            return;
        }

        const loginResult = await this.userUseCaseLogin.login(correo, password);

        if (loginResult) {
            res.status(200).json({ 
                message: "Inicio de sesión exitoso",
                data: loginResult
            });
        } else {
            res.status(401).json({ message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error al realizar el login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
    }

    public async getCliente(req: Request, res: Response): Promise<void> {
        try {
            let id = req.params['id']
            id = id + '';
            if (!id) {
                res.status(400).json({ message: "El ID del usuario es obligatorio" });
                return;
            }
            const user = await this.userUseCaseGet.getClienteById(parseFloat(id));

            
            const userR = {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            precio: user.telefono,
            direccion: user.direccion,
            }
            
            res.status(200).json(userR);  

        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async agregarFavorito(req: Request, res: Response): Promise<void> {
        const { idUsuario, idProducto } = req.body;
        console.log(idUsuario, idProducto);
        console.log("agregarFavorito");
        if (!idUsuario || !idProducto) {
            res.status(400).json({ message: "Datos incompletos" });
            return
        }
        await this.userUseCaseCreate.agregarFavorito(idUsuario, idProducto);
        res.status(200).json({ message: "Producto agregado a favoritos" });
    }

    public async eliminarFavorito(req: Request, res: Response): Promise<void> {
        const { idUsuario, idProducto } = req.body;
        if (!idUsuario || !idProducto) {
            res.status(400).json({ message: "Datos incompletos" });
            return
        }
        await this.userUseCaseCreate.eliminarFavorito(idUsuario, idProducto);
        res.status(200).json({ message: "Producto eliminado de favoritos" });
    }

    public async obtenerFavoritos(req: Request, res: Response): Promise<void> {
    try {
        const idUsuario = req.params['idusuario'];
        
        if (!idUsuario) {
            res.status(400).json({ message: "El ID del usuario es obligatorio" });
            return;
        }

        const favoritos = await this.userUseCaseCreate.obtenerFavoritos(parseFloat(idUsuario));
        
        // Mapeamos para agregar la URL de la imagen a cada producto
        const favoritosConImagen = favoritos.map((producto: any) => ({
            ...producto,
            image: `http://localhost:1802/products/image/${producto.idproductos}.jpg`
        }));

        res.status(200).json(favoritosConImagen);
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
    

    
}