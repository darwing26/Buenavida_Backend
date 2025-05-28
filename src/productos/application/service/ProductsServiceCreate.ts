import ProductServiceCreatePort from "../../domain/interfaces/services/ProductServiceCreateInterface";
import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";
import ProductInterface from "../../domain/types/ProductInterface";

export default class ProductServiceCreate implements ProductServiceCreatePort {

    constructor(private readonly productRepository : IProductRepository){}

    public async createProduct(product: ProductInterface): Promise<void> {
        this.productRepository.save(product)
    }

    

}