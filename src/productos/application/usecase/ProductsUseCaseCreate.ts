import ProductServiceCreatePort from "../../domain/interfaces/services/ProductServiceCreateInterface";
import ProductUseCaseCreatePort from "../../domain/port/driver/usecase/ProductUseCaseCreatePort";


export default class ProductUseCaseCreate implements ProductUseCaseCreatePort {

    constructor(private readonly productServiceCreate : ProductServiceCreatePort ) {}

    public async createProduct(nombre: string, medida: string, precio: number, salea: string, descripcion: string): Promise<void> {
        this.productServiceCreate.createProduct({id : 0, nombre : nombre, medida : medida, precio : precio, salea : salea, descripcion: descripcion, descuento: 0});
    }

} 