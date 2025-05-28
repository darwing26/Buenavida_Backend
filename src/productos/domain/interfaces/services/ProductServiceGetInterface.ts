import Product from "../../model/Products/Product"

export default interface ProductServiceGetPort {
    getAllProduct(): Promise<Product[]>
    getProductById(id : number): Promise<Product>
}