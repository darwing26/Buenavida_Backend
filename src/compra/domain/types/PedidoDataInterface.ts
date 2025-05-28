export default interface PedidoDataInterface {
    id: number; // ID del pedido
    usuarioId: number; // ID del usuario que realizó el pedido
    total: number; // Total del pedido
    estado: string; // Estado del pedido (ej: "Pendiente", "Completado")
    fecha: string; // Fecha del pedido (en formato de cadena, ej: "2023-10-01")
    productos: ProductoPedidoInterface[]; // Lista de productos asociados al pedido
}

export interface ProductoPedidoInterface {
    productos_idproductos: number; // ID del producto
    cantidad: number; // Cantidad del producto en el pedido
}