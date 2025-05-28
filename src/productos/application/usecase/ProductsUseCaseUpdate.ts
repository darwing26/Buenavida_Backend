import ProductServiceUpdatePort from "../../domain/interfaces/services/ProductServiceUpdateInterface";
import ProductUseCaseUpdatePort from "../../domain/port/driver/usecase/ProductUseCaseUpdatePort";
import ProductInterface from "../../domain/types/ProductInterface";


export default class ProductUseCaseUpdate implements ProductUseCaseUpdatePort {

    constructor(private readonly productServiceUpdate : ProductServiceUpdatePort ) {}

    public async updateProduct(
        id: number,
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        descripcion: string
    ): Promise<void> {
        try {
            // Crear el objeto ProductInterface
            const producto: ProductInterface = {
                id,
                nombre,
                medida,
                precio,
                salea,
                descripcion,
                descuento: 0 // Asignar un valor por defecto o calcularlo según sea necesario
            };

            // Llamar al servicio para actualizar el producto
            await this.productServiceUpdate.updateProduct(id, producto);
        } catch (error) {
            console.error("Error en ProductUseCase:", error);
            throw new Error("Error al actualizar el producto");
        }
    }

}