import ProductServiceDeletePort from "../../domain/interfaces/services/ProductServiceDeleteInterface";
import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";

export default class ProductServiceDelete implements ProductServiceDeletePort {

    constructor(private readonly productRepository : IProductRepository){}

    public async deleteProduct(id: number): Promise<void> {
        try {
            // Llamar al repositorio para eliminar el producto
            await this.productRepository.delete(id.toString());
        } catch (error) {
            console.error("Error en ProductService:", error);
            throw new Error("Error al eliminar el producto");
        }
    }
}