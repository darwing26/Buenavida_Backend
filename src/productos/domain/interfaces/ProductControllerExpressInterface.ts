import { Request, Response } from 'express'

export default interface ProductControllerExpressPort {
    getAllProducts(req: Request, res: Response): void
    getProductById(req: Request, res: Response): void
    createProduct(req: Request, res: Response): void
    deleteProduct(req: Request, res: Response): void
    updateProduct(req: Request, res: Response): void
    getProductImage(req: Request, res: Response): void
    searchProduct(req: Request, res: Response) : void
    filterByPrice(req: Request, res: Response) : void
    pagination(req: Request, res: Response) : void
}