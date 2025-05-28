import { Request, Response } from "express";
import ProductControllerExpressPort from "../../../domain/interfaces/ProductControllerExpressInterface";
import ProductUseCaseGetPort from "../../../domain/port/driver/usecase/ProductUseCaseGetPort";
import ProductUseCaseCreatePort from "../../../domain/port/driver/usecase/ProductUseCaseCreatePort";
import ProductUseCaseDeletePort from "../../../domain/port/driver/usecase/ProductUseCaseDeletePort";
import ProductUseCaseUpdatePort from "../../../domain/port/driver/usecase/ProductUseCaseUpdatePort";

export default class ProductController implements ProductControllerExpressPort {

    constructor(
        private readonly productUseCaseGet : ProductUseCaseGetPort,
        private readonly productUseCaseCreate : ProductUseCaseCreatePort,
        private readonly productUseCaseDelete  : ProductUseCaseDeletePort,
        private readonly productUseCaseUpdate : ProductUseCaseUpdatePort 

    ) {}


    public async getAllProducts(_req: Request, res: Response): Promise<void> {
        const products = await this.productUseCaseGet.getAllProduct()
        const productsResponse = products.map((product) => {
            return {
                id: product.id,
                nombre: product.nombre,
                medida: product.medida,
                precio: product.precio,
                salea: product.salea,
                descripcion : product.description,
                image : product.urlImage,
                descuento : product.descuento
            }
        })
        res.status(200).json(productsResponse)
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        let id = req.params['id']
        id = id + ''

        const product = await this.productUseCaseGet.getProductById(parseFloat(id))
        const productR = {
            id: product.id,
            nombre: product.nombre,
            medida: product.medida,
            precio: product.precio,
            salea: product.salea,
            descripcion : product.description,
            image : product.urlImage,
            descuento : product.descuento
        }
        res.status(200).json(productR);  
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { nombre, medida, precio, salea, descripcion } = req.body;

            // Validar que todos los campos estén presentes
            if (!nombre || !medida || !precio || !salea || !descripcion) {
                res.status(400).json({ message: 'Todos los campos son obligatorios' });
                return;
            }

            // Llamar al caso de uso para guardar el producto
            await this.productUseCaseCreate.createProduct(nombre, medida, precio, salea, descripcion);

            // Responder con un mensaje de éxito
            res.status(200).json({ message: 'Producto guardado exitosamente', data: { nombre, medida, precio, salea, descripcion } });
        } catch (error) {
            // Manejar errores
            console.error('Error al guardar el producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer el ID del producto de los parámetros de la solicitud
            const { id } = req.params;

            // Validar que el ID esté presente
            if (!id) {
                res.status(400).json({ message: "El ID del producto es obligatorio" });
                return;
            }

            // Convertir el ID a número
            const productId = parseInt(id, 10);

            // Llamar al caso de uso para eliminar el producto
            await this.productUseCaseDelete.deleteProduct(productId);

            // Responder con un mensaje de éxito
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al eliminar el producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { id, nombre, medida, precio, salea, descripcion } = req.body;

            // Validar que todos los campos estén presentes
            if (!id || !nombre || !medida || !precio || !salea || !descripcion) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }

            // Convertir el ID a número
            const productId = parseInt(id, 10);

            // Llamar al caso de uso para actualizar el producto
            await this.productUseCaseUpdate.updateProduct(
                productId,
                nombre,
                medida,
                precio,
                salea,
                descripcion
            );

            // Responder con un mensaje de éxito
            res.status(200).json({ message: "Producto actualizado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getProductImage(req: Request, res: Response): Promise<void> {
        try {
            // Extraer el nombre de la imagen de los parámetros de la solicitud
            const { name } = req.params;

            // Validar que el nombre de la imagen esté presente
            if (!name) {
                res.status(400).json({ message: "El nombre de la imagen es obligatorio" });
                return;
            }

            // Llamar al caso de uso para obtener la imagen
            const imagePath = await this.productUseCaseGet.getProductImage(name);

            // Responder con la imagen
            res.status(200).sendFile(imagePath);
        } catch (error) {
            // Manejar errores
            console.error("Error al obtener la imagen del producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async searchProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params; // Obtener el nombre del parámetro de la URL
    
            // Validar que el parámetro "name" no sea nulo o vacío
            if (!name) {
                res.status(400).json({ message: "El parámetro 'name' es obligatorio" });
                return;
            }
    
            const products = await this.productUseCaseGet.searchProduct(name);
    
            // Transformar los productos para la respuesta
            const productsResponse = products.map((product) => ({
                id: product.id,
                nombre: product.nombre,
                medida: product.medida,
                precio: product.precio,
                salea: product.salea,
                descripcion: product.description,
                image: product.urlImage,
                descuento: product.descuento

            }));
    
            // Devolver la respuesta
            res.status(200).json(productsResponse);
        } catch (error) {

        }
    }

    public async filterByPrice(req: Request, res: Response): Promise<void> {
    try {
        const { minPrice, maxPrice } = req.params;

        // Validar que los parámetros no sean nulos o vacíos
        if (!minPrice || !maxPrice) {
            res.status(400).json({ message: "Los parámetros 'minPrice' y 'maxPrice' son obligatorios" });
            return;
        }

        const minPriceNumber = parseFloat(minPrice);
        const maxPriceNumber = parseFloat(maxPrice);

        // Validar que sean números válidos
        if (isNaN(minPriceNumber)) {
            res.status(400).json({ message: "El parámetro 'minPrice' debe ser un número válido" });
            return;
        }

        if (isNaN(maxPriceNumber)) {
            res.status(400).json({ message: "El parámetro 'maxPrice' debe ser un número válido" });
            return;
        }

        // Validar que el precio mínimo no sea mayor al máximo
        if (minPriceNumber > maxPriceNumber) {
            res.status(400).json({ message: "El precio mínimo no puede ser mayor al precio máximo" });
            return;
        }

        const products = await this.productUseCaseGet.filterByPrice(minPriceNumber, maxPriceNumber);

        // Transformar los productos para la respuesta
        const productsResponse = products.map((product) => ({
            id: product.id,
            nombre: product.nombre,
            medida: product.medida,
            precio: product.precio,
            salea: product.salea,
            descripcion: product.description,
            image: product.urlImage,
            descuento: product.descuento
        }));

        res.status(200).json(productsResponse);
    } catch (error) {
        console.error("Error en filterByPrice:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

    public async pagination(req: Request, res: Response): Promise<void> {
        try {
            const { page } = req.params; // Obtener el número de página del parámetro de la URL
            
            console.log(page)
            // Validar que el parámetro "page" no sea nulo o vacío
            if (!page) {
                res.status(400).json({ message: "El parámetro 'page' es obligatorio" });
                return;
            }
    
            const pageNumber = parseInt(page); // Convertir la página a número
    
            // Validar que la página sea un número válido y mayor o igual a 1
            if (isNaN(pageNumber) || pageNumber < 1) {
                res.status(400).json({ message: "El parámetro 'page' debe ser un número válido y mayor o igual a 1" });
                return;
            }
    
            const products = await this.productUseCaseGet.pagination(pageNumber);
    
            // Transformar los productos para la respuesta
            const productsResponse = products.map((product) => ({
                id: product.id,
                nombre: product.nombre,
                medida: product.medida,
                precio: product.precio,
                salea: product.salea,
                descripcion: product.description,
                image: product.urlImage,
                descuento: product.descuento

            }));
    
            // Devolver la respuesta
            res.status(200).json(productsResponse);
        } catch (error) {
        }
    }



}