import ProductServiceUpdatePort from "../../domain/interfaces/services/ProductServiceUpdateInterface";
import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";
import ProductInterface from "../../domain/types/ProductInterface";

export default class ProductServiceUpdate implements ProductServiceUpdatePort {

    constructor(private readonly productRepository : IProductRepository){}

    public async updateProduct(id: number, producto: ProductInterface): Promise<void> {
        try {
            // Llamar al repositorio para actualizar el producto
            await this.productRepository.update(id.toString(), producto);
        } catch (error) {
            console.error("Error en ProductService:", error);
            throw new Error("Error al actualizar el producto");
        }
    }
}