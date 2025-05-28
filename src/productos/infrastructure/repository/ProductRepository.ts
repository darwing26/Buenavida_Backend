import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";
import ProductInterface from "../../domain/types/ProductInterface";
import MetodosDBproductos from "./MetodosDBproductos";

export default class ProductRepository implements IProductRepository {

    constructor (private readonly metodosDBproductos : MetodosDBproductos) {}

    findAll = async (): Promise<ProductInterface[]> => {
        const productosFromDB = await this.metodosDBproductos.findAll();
        const productos = productosFromDB[0];
        
        return productos.map((producto: any) => ({
            id: producto.idproductos,
            nombre : producto.nombre,
            medida : producto.medida,
            precio : producto.precio,
            salea: producto.salea,
            descripcion : producto.descripcion,
            descuento : producto.descuento
        }));
    }

    findById = async (id: string): Promise<ProductInterface> => {
        const productoFromDB = await this.metodosDBproductos.getById(parseFloat(id))
        if (productoFromDB == null) return {
            id: 0,
            nombre : '',
            medida : '',
            precio : 0,
            salea: '',
            descripcion : '',
            descuento : 0
        }

        const productItemDb = productoFromDB[0];
        
        const product = {
            id: productItemDb.idproductos,
            nombre : productItemDb.nombre,
            medida : productItemDb.medida,
            precio : productItemDb.precio,
            salea: productItemDb.salea,
            descripcion : productItemDb.descripcion,
            descuento : productItemDb.descuento
        }

        return product
    }

    save = (item: ProductInterface): void => {
        try {
            // Llamar al método save de metodosDBproductos con los datos del producto
            this.metodosDBproductos.save(
                item.nombre,
                item.medida,
                item.precio,
                item.salea,
                item.descripcion
            ); 
            console.log('Producto guardado exitosamente');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
    }

    update = async (id: string, item: ProductInterface): Promise<void> => {
        try {
            await this.metodosDBproductos.update(
                parseFloat(id),
                item.nombre,
                item.medida,
                item.precio,
                item.salea,
                item.descripcion
            );
            console.log(`Producto con ID ${id} actualizado`);
        } catch (error) {
            console.error("Error en ProductRepository al actualizar el producto:", error);
            throw new Error("Error al actualizar el producto");
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            await this.metodosDBproductos.deleteById(parseFloat(id));
            console.log(`Producto con ID ${id} eliminado exitosamente`);
            return true;
        } catch (error) {
            console.error("Error en ProductRepository al eliminar el producto:", error);
            throw new Error("Error al eliminar el producto");
        }
    };



}