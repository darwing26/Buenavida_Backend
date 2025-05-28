import ProductServiceGetPort from "../../domain/interfaces/services/ProductServiceGetInterface";
import NullProduct from "../../domain/model/Products/NullProduct";
import Product from "../../domain/model/Products/Product";
import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";

import path from 'path'
import { promises as fs } from 'fs'

export default class ProductServiceGet implements ProductServiceGetPort {

    constructor(private readonly productRepository : IProductRepository){}

    public getAllProduct = async () : Promise<Product[]> => {
        const sqlProducts = await this.productRepository.findAll();
        
        if (sqlProducts.length == 0) return [new NullProduct()]
        const products = await Promise.all(sqlProducts.map(async (product) => {
            
            return new Product(product.id, product.nombre , product.medida, product.precio, product.salea, product.descripcion, 'http://localhost:1802/products/image/' + product.id + '.jpg' , product.descuento)
        }))
        
        return products
    }
    
    public getProductById = async (id: number) : Promise<Product> => {
        const sqlProduct = await this.productRepository.findById(id.toString());
        if (sqlProduct.id == 0 ) return new NullProduct()
      
        return new Product(sqlProduct.id, sqlProduct.nombre , sqlProduct.medida, sqlProduct.precio, sqlProduct.salea, sqlProduct.descripcion, 'http://localhost:1802/products/image/' + sqlProduct.id + '.jpg', sqlProduct.descuento)
    }

    public async retrieveMovieImage(file: string): Promise<string> {
        const absolutePath = path.join(__dirname, `../../../assets/iamges/`)
        const defaultImage = 'not-icon.png'
        try {
          await fs.access(absolutePath + file, fs.constants.F_OK)
          const stats = await fs.stat(absolutePath + file)
          if (stats.isFile()) {
            return absolutePath + file
          }
          return absolutePath + defaultImage
        } catch (err) {
          return absolutePath + defaultImage
        }
      }

}