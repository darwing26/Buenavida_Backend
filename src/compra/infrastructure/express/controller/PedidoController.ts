import { Request, Response } from 'express';
import PedidoControllerExpressInterface from '../../../domain/interfaces/PedidoControllerExpressInterface';
import PedidoUseCaseGetPort from '../../../domain/port/driver/usecase/PedidoUseCaseGetPort';
import PedidoUseCaseCreatePort from '../../../domain/port/driver/usecase/PedidoUseCaseCreatePort';
import PedidoUseCaseDeletePort from '../../../domain/port/driver/usecase/PedidoUseCaseDeletePort';

export default class PedidoController implements PedidoControllerExpressInterface {

    constructor(
        private readonly pedidoUseCaseGet: PedidoUseCaseGetPort,
        private readonly pedidoUseCaseCreate: PedidoUseCaseCreatePort,
        private readonly pedidoUseCaseDelete: PedidoUseCaseDeletePort
    ) {}

    public async getAllPedidos(_req: Request, res: Response): Promise<void> {
        try {
            const pedidos = await this.pedidoUseCaseGet.getAllPedidos();
            const pedidosResponse = pedidos.map((pedido) => {
                return {
                    id: pedido.getId(),
                    cliente: pedido.getCliente().nombre,
                    total: pedido.getTotal(),
                    estado: pedido.getEstado(),
                    fecha: pedido.getFecha(),
                    productos: pedido.getProductos()
                }
            });
            res.status(200).json(pedidosResponse);
        } catch (error) {
            console.error("Error en PedidoController (getAllPedidos):", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getPedidoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) return
            const pedido = await this.pedidoUseCaseGet.getPedidoById(parseInt(id, 10));
            const pedidosResponse = {
                    id: pedido.getId(),
                    cliente: pedido.getCliente().nombre,
                    total: pedido.getTotal(),
                    estado: pedido.getEstado(),
                    fecha: pedido.getFecha(),
                    productos: pedido.getProductos()
                }
            res.status(200).json(pedidosResponse);
        } catch (error) {
            console.error("Error en PedidoController (getPedidoById):", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getPedidosByClient(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.params;
            if (!clientId) return
            const pedidos = await this.pedidoUseCaseGet.getPedidosByClient(parseInt(clientId, 10));
            const pedidosResponse = pedidos.map((pedido) => {
                return {
                    id: pedido.getId(),
                    cliente: pedido.getCliente().nombre,
                    total: pedido.getTotal(),
                    estado: pedido.getEstado(),
                    fecha: pedido.getFecha(),
                    productos: pedido.getProductos()
                }
            });
            res.status(200).json(pedidosResponse);
        } catch (error) {
            console.error("Error en PedidoController (getPedidosByClient):", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async createPedido(req: Request, res: Response): Promise<void> {
        try {
            const { usuarioId, productos, fecha } = req.body;
            if (!usuarioId || !productos || !fecha) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }
            await this.pedidoUseCaseCreate.createPedido(usuarioId, productos, fecha);
            res.status(200).json({ message: "Pedido creado exitosamente" });
        } catch (error) {
            console.error("Error en PedidoController (createPedido):", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async deletePedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "El ID del pedido es obligatorio" });
                return;
            }
            await this.pedidoUseCaseDelete.deletePedido(parseInt(id, 10));
            res.status(200).json({ message: "Pedido eliminado exitosamente" });
        } catch (error) {
            console.error("Error en PedidoController (deletePedido):", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}