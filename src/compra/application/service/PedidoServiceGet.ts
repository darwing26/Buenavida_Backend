import NullProduct from "../../../productos/domain/model/Products/NullProduct";
import Product from "../../../productos/domain/model/Products/Product";
import IProductRepository from "../../../productos/domain/port/driven/ProductRepositoyPort";
import Cliente from "../../../clientes/domain/model/client/Client";
import NullClient from "../../../clientes/domain/model/client/NullClient";
import UserRepositoryPort from "../../../clientes/domain/port/driven/ClienteRepositoryPort";
import PedidoServiceGetPort from "../../domain/interfaces/services/PedidoServiceGetInterface";
import CarritoPedidos from "../../domain/model/carrito/CarritoPedidos";
import Pedido from "../../domain/model/pedido/Pedido";
import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort";
import { ProductoPedidoInterface } from "../../domain/types/PedidoDataInterface";


export default class PedidoServiceGet implements PedidoServiceGetPort {

    constructor(
        private readonly pedidoRepository: IPedidoRepositoryPort,
        private readonly productoRepository : IProductRepository,
        private readonly clientRepository : UserRepositoryPort
        
    ) {}

    public async getAllPedidos(): Promise<Pedido[]> {

        const sqlPedido = await this.pedidoRepository.findAll();
        const pedidos = await Promise.all(
            sqlPedido.map(async (pedido) => {

                return new Pedido(
                    {
                        id: pedido.id,
                        cliente: await this.getUserById(pedido.usuarioId),
                        productos: await this.buildCarritoProductos(pedido.productos),
                        estado: pedido.estado,
                        fecha: pedido.fecha
                    }
                ) 
            }));
        return pedidos;
    }

    public async getPedidoById(id: number): Promise<Pedido> {
       
            const pedidoFromDB = await this.pedidoRepository.findById(id.toString());
            if (!pedidoFromDB) {
                throw new Error("Pedido no encontrado");
            }
            const cliente = await this.getUserById(pedidoFromDB.usuarioId); 
            const productos = await this.buildCarritoProductos(pedidoFromDB.productos);

            return new Pedido({
                id: pedidoFromDB.id,
                cliente,
                productos,
                estado: pedidoFromDB.estado,
                fecha: pedidoFromDB.fecha
            }); 
    }

    public async getPedidosByClient(clientId: number): Promise<Pedido[]> {
        const sqlPedido = await this.pedidoRepository.getPedidosByClient(clientId.toString());

        const pedidos = await Promise.all(
            sqlPedido.map(async (pedido) => {
                return new Pedido(
                    {
                        id: pedido.id,
                        cliente: await this.getUserById(pedido.usuarioId),
                        productos: await this.buildCarritoProductos(pedido.productos),
                        estado: pedido.estado,
                        fecha: pedido.fecha
                    }
                ) 
            }));
        return pedidos;
    }

    private getUserById = async (id: number): Promise<Cliente> => {
            const sqlUser = await this.clientRepository.findById(id.toString());
            if (sqlUser.id === 0) return new NullClient();
    
            return new Cliente({
                id : sqlUser.id,
                nombre: sqlUser.nombre,
                correo: sqlUser.correo,
                password: sqlUser.password,
                telefono: sqlUser.telefono,
                direccion: sqlUser.direccion
            }
            );
    }

    private async buildCarritoProductos(productos : ProductoPedidoInterface[]) : Promise<CarritoPedidos[]>{
        var carritoProductos : CarritoPedidos[] = [];
        
        for (const producto of productos) {
            carritoProductos.push(new CarritoPedidos(await this.getProductById(producto.productos_idproductos), producto.cantidad));
        }
        return carritoProductos;
    }

    private getProductById = async (id: number) : Promise<Product> => {
            const sqlProduct = await this.productoRepository.findById(id.toString());
            if (sqlProduct.id == 0 ) return new NullProduct()
            return new Product(sqlProduct.id, sqlProduct.nombre , sqlProduct.medida, sqlProduct.precio, sqlProduct.salea, sqlProduct.descripcion, sqlProduct.id + 'png')
    }
    
    
}