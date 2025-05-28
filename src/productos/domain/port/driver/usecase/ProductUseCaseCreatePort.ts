

export default interface ProductUseCaseCreatePort {
   createProduct(
      nombre: string,
      medida: string,
      precio: number,
      salea: string,
      descripcion: string
   ) : Promise<void>
}