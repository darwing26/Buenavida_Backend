import ProductServiceGetPort from "../../domain/interfaces/services/ProductServiceGetInterface";
import NullProduct  from "../../domain/model/Products/NullProduct";
import Product from "../../domain/model/Products/Product";
import ProductUseCaseGetPort from "../../domain/port/driver/usecase/ProductUseCaseGetPort";
import path from 'path'
import { promises as fs } from 'fs'


export default class ProductUseCaseGet implements ProductUseCaseGetPort {

    constructor(
        private readonly productGetServicePort: ProductServiceGetPort,
    ){}

    public getAllProduct = async () : Promise<Product[]> => {
        const products = await this.productGetServicePort.getAllProduct();
        if(products.length > 0) {
            return products;
        }
        return [new NullProduct()]
    }

    public getProductById = async (id: number) : Promise<Product> => {
        const product = await this.productGetServicePort.getProductById(id)
        return product;   
    }

    public async getProductImage(file: string): Promise<string> {
        // Ruta absoluta a la carpeta de imágenes
        const absolutePath = path.join(__dirname, '../../../../assets/images/');
        const defaultImage = 'not-icon.png'; // Nombre de la imagen por defecto

        try {
            // Verificar si la imagen existe
            await fs.access(absolutePath + file, fs.constants.F_OK);

            // Obtener información del archivo
            const stats = await fs.stat(absolutePath + file);

            // Verificar si es un archivo
            if (stats.isFile()) {
                return absolutePath + file;
            }

            // Si no es un archivo, devolver la imagen por defecto
            return path.join(absolutePath, defaultImage);
        } catch (err) {
            // Si hay un error, devolver la imagen por defecto
            return path.join(absolutePath, defaultImage);
        }
    }

    public async searchProduct(name: string): Promise<Product[]> {
        const products = await this.productGetServicePort.getAllProduct();
        if (products.length > 0) {
            
            const filteredProducts = products.filter(product => 
                product.nombre.toLowerCase().includes(name.toLowerCase())
            );
            return filteredProducts.length > 0 ? filteredProducts : [new NullProduct()];
        }
        return [new NullProduct()];
    }

    public async filterByPrice(minPrice: number, maxPrice: number): Promise<Product[]> {
    const products = await this.productGetServicePort.getAllProduct();
    if (products.length > 0) {
        const filteredProducts = products.filter(product => 
            product.precio >= minPrice && product.precio <= maxPrice
        );
        return filteredProducts.length > 0 ? filteredProducts : [new NullProduct()];
    }
    return [new NullProduct()];
}

    public async pagination(page: number): Promise<Product[]> {
        const products = await this.productGetServicePort.getAllProduct();
        if (products.length > 0) {
            // Tamaño fijo de la página: 12 productos por página
            const pageSize = 12;
    
            // Calcular el índice de inicio y fin para la paginación
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
    
            // Obtener los productos de la página solicitada
            const paginatedProducts = products.slice(startIndex, endIndex);
    
            // Si no hay productos en la página, devolver un NullProduct
            return paginatedProducts.length > 0 ? paginatedProducts : [new NullProduct()];
        }
        return [new NullProduct()];
    }


} 