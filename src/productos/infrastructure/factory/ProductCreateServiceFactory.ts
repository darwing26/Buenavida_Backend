import ProductServiceCreate from "../../application/service/ProductsServiceCreate";
import ProductServiceCreatePort from "../../domain/interfaces/services/ProductServiceCreateInterface";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class ProductCreateServiceFactory {
    public static readonly create = () : ProductServiceCreatePort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new ProductServiceCreate(sqlRepository)
    }
}