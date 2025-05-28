export default interface ProductUseCaseUpdatePort {
    updateProduct(id: number, nombre: string, medida: string, precio: number, salea: string, descripcion: string) : Promise<void>
 }