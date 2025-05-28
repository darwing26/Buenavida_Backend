import RouterExpress from "../../../../express/domain/RouterExpress";
import ProductControllerExpressPort from "../../../domain/interfaces/ProductControllerExpressInterface";
import ProductRouterExpressInterface from "../../../domain/interfaces/ProductRouterExpressInterface";

export default class ProductRouterExpress extends RouterExpress implements ProductRouterExpressInterface {

    constructor(private readonly productController: ProductControllerExpressPort ) {
        super()
        this.routes();
    }

    public routes = (): void => {
        this.getAllProducts()
        this.getProductById()
        this.createProduct()
        this.deleteProduct()
        this.updateProduct()
        this.getProductImage()
        this.searchProduct()
        this.filterByPrice()
        this.pagination()
    }

    public getAllProducts(): void {
        this.router.get(
            '/products',
            this.productController.getAllProducts.bind(this.productController)
        )
    }

    public getProductById(): void {
        this.router.get(
            '/products/:id',
            this.productController.getProductById.bind(this.productController)
        )
    }

    public createProduct(): void {
        this.router.post(
            '/createproduct',
            this.productController.createProduct.bind(this.productController)
        )
    }

    public deleteProduct(): void {
        this.router.delete(
            '/deleteproduct/:id',
            this.productController.deleteProduct.bind(this.productController)
        )
    }

    public updateProduct(): void {
        this.router.put(
            '/updateproduct',
            this.productController.updateProduct.bind(this.productController)
        )
    }

    public getProductImage(): void {
    this.router.get(
        '/products/image/:name',
        this.productController.getProductImage.bind(this.productController)
      )
    }

    public searchProduct(): void {
        this.router.get(
            '/searchproduct/:name',
            this.productController.searchProduct.bind(this.productController)
        )
    }

    public filterByPrice(): void {
        this.router.get(
            '/filterbyprice/:minPrice/:maxPrice',
            this.productController.filterByPrice.bind(this.productController)
        )
    }

    public pagination(): void {
        this.router.get(
            '/pagination/:page',
            this.productController.pagination.bind(this.productController)
        )
    }


}