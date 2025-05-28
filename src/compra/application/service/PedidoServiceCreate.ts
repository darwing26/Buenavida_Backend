import NullProduct from "../../../productos/domain/model/Products/NullProduct";
import Product from "../../../productos/domain/model/Products/Product";
import IProductRepository from "../../../productos/domain/port/driven/ProductRepositoyPort";
import PedidoServiceCreatePort from "../../domain/interfaces/services/PedidoServiceCreateInterface";
import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort";
import { ProductoPedidoInterface } from "../../domain/types/PedidoDataInterface";

export default class PedidoServiceCreate implements PedidoServiceCreatePort {

    constructor(
        private readonly pedidoRepository: IPedidoRepositoryPort,
        private readonly productoRepository : IProductRepository
    ) {}

    public async createPedido(usuarioId: number, productos: ProductoPedidoInterface[], fecha: string): Promise<void> {
        try {
            const total = await this.calcularTotal(productos);
          
            
            this.pedidoRepository.save({
                id: 0,
                usuarioId,
                total,
                estado: "Pendiente", 
                fecha,
                productos 
            });
    
            console.log("Pedido creado");
        } catch (error) {
            console.error("Error en PedidoServiceCreate (createPedido):", error);
            throw new Error("Error al crear el pedido");
        }
    }

    private calcularTotal = async (productos: ProductoPedidoInterface[]): Promise<number> => {
        let total : number = 0;
        if (!productos || productos.length === 0) return total;
        for (let i = 0; i < productos.length; i++) {
            
            const productoPedido = productos[i];
            if (!productoPedido) continue; 

            const id = productoPedido.productos_idproductos;  
            const producto = await this.getProductById(id);

            total += producto.precio * productoPedido.cantidad;
        }
        return total;
    }

    private getProductById = async (id: number) : Promise<Product> => {
                const sqlProduct = await this.productoRepository.findById(id.toString());
                if (sqlProduct.id == 0 ) return new NullProduct()
                return new Product(sqlProduct.id, sqlProduct.nombre , sqlProduct.medida, sqlProduct.precio, sqlProduct.salea, sqlProduct.descripcion, sqlProduct.id + 'png')
        }


}