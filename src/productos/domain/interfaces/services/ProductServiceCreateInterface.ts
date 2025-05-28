import ProductInterface from "../../types/ProductInterface";

export default interface ProductServiceCreatePort {
   createProduct(product: ProductInterface) : Promise<void>
}