export default interface ProductServiceDeletePort {
    deleteProduct(id: number) : Promise<void>
 }