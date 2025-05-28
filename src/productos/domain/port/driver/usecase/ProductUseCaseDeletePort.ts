export default interface ProductUseCaseDeletePort {
   deleteProduct(id: number) : Promise<void>
}