import { connectToDatabase } from "../../../utils/conectdb";

export default class MetodosDBcompra {
    
    private readonly queryGetAllPedidos = 'SELECT * FROM pedido';
    private readonly queryGetPedidoById = 'CALL GetPedidoById(?);';
    private readonly queryGetPedidosByClient = 'CALL GetPedidosByClient(?);';

    
    private readonly queryInsertPedido = 'CALL InsertPedido(?, ?, ?, ?)'; // Insertar en la tabla pedido
    private readonly queryInsertPedidoProducto = 'CALL InsertPedidoProducto(?, ?, ?)'; // Insertar en la tabla pedido_has_produtos
    
    private readonly queryDeletePedido = 'CALL DeletePedido(?);';
    private readonly queryDeleteProductosDePedido = 'CALL DeleteProductosByPedido(?);'// Eliminar productos de un pedido

    private readonly queryGetProductosByPedido = 'CALL ObtenerProductosPorPedido(?);'; // Obtener productos de un pedido

    constructor() {}

    public findAll = async () => {
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetAllPedidos)) as any[];
        return rows;
    }

    public getPedidoById = async (id: number) => {
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetPedidoById, [id])) as any[];

        if (rows.length > 0) {
          
            return rows[0];
        } else {
           
            return null;
        }
    }

    public getPedidosByClient = async (clientId: number) => {
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetPedidosByClient, [clientId])) as any[];
        return rows;
    }

    public save = async (
        usuarioId: number,
        total: number,
        fecha: string,
        productos: { id: number, cantidad: number }[],
        estado: string
    ): Promise<number> => {
        const connectionDB = await connectToDatabase();
        try {
            await connectionDB.beginTransaction();
    
            const [pedidoResult] = (await connectionDB.execute(this.queryInsertPedido, [usuarioId, total, fecha, estado])) as any[];
            
            let pedidoId = pedidoResult[0];
            pedidoId = pedidoId[0].idpedido;
         
           
            for (const producto of productos) {
                await connectionDB.execute(this.queryInsertPedidoProducto, [pedidoId, producto.id, producto.cantidad]);
            }

            await connectionDB.commit();
            console.log('Pedido guardado exitosamente con ID:', pedidoId);
            return pedidoId;
        } catch (error) {
            await connectionDB.rollback();
            console.error('Error al guardar el pedido:', error);
            throw new Error('Error al guardar el pedido en la base de datos');
        }
    }

    public deleteById = async (id: number) => {
        const connectionDB = await connectToDatabase();

        await connectionDB.execute(this.queryDeleteProductosDePedido, [id]); 
        await connectionDB.execute(this.queryDeletePedido, [id]);
        console.log(`Pedido con ID ${id} eliminado exitosamente`);
    }

    public getProductosByPedido = async (pedidoId: number) => {  
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetProductosByPedido, [pedidoId])) as any[];
        return rows[0];
    }
}