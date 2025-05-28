import ProductInterface from "../../types/ProductInterface";

export default interface ProductServiceUpdatePort {
    updateProduct(id: number, producto : ProductInterface) : Promise<void>
 }