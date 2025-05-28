import { Request, Response } from 'express'

export default interface UserControllerExpressPort {
    createCliente(req: Request, res: Response): void
    getCliente(req: Request, res: Response): void
    login(req: Request, res: Response): void

    agregarFavorito(req: Request, res: Response): Promise<void>;
    eliminarFavorito(req: Request, res: Response): Promise<void>;
    obtenerFavoritos(req: Request, res: Response): Promise<void>;
   
}