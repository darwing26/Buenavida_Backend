import ProductController from "../../../productos/infrastructure/express/controller/ProductController";
import ProductRouterExpress from "../../../productos/infrastructure/express/router/ProductRouter";
import ProductUseCaseGet from "../../../productos/application/usecase/ProductsUseCaseGet";
import ProductUseCaseCreate from "../../../productos/application/usecase/ProductsUseCaseCreate";
import ProductUseCaseDelete from "../../../productos/application/usecase/ProductsUseCaseDelete";
import ProductUseCaseUpdate from "../../../productos/application/usecase/ProductsUseCaseUpdate";
import ProductGetServiceFactory from "../../../productos/infrastructure/factory/ProductGetServiceFactory";
import ProductCreateServiceFactory from "../../../productos/infrastructure/factory/ProductCreateServiceFactory";
import ProductDeleteServiceFactory from "../../../productos/infrastructure/factory/ProductDeleteServiceFactory";
import ProductUpdateServiceFactory from "../../../productos/infrastructure/factory/ProductUpdateServiceFactory";

export default class ProductRouterFactory {
    public static create(): ProductRouterExpress {
        const productGetService = ProductGetServiceFactory.create();
        const productGetUseCase = new ProductUseCaseGet(productGetService);

        const productCreateService = ProductCreateServiceFactory.create();
        const productCreateUseCase = new ProductUseCaseCreate(productCreateService);

        const productDeleteService = ProductDeleteServiceFactory.create();
        const productDeleteUseCase = new ProductUseCaseDelete(productDeleteService);

        const productUpdateService = ProductUpdateServiceFactory.create();
        const productUpdateUseCase = new ProductUseCaseUpdate(productUpdateService);

        const productController = new ProductController(productGetUseCase, productCreateUseCase, productDeleteUseCase, productUpdateUseCase);
        return new ProductRouterExpress(productController);
    }
}