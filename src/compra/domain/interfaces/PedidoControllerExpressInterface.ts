import { Request, Response } from 'express'

export default interface PedidoControllerExpressInterface {
    getAllPedidos(req: Request, res: Response): void
    getPedidoById(req: Request, res: Response): void
    getPedidosByClient(req: Request, res: Response): void
    createPedido(req: Request, res: Response): void
    deletePedido(req: Request, res: Response): void
}