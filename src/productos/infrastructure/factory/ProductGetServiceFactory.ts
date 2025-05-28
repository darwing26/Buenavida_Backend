import ProductServiceGet from "../../application/service/ProductsServiceGet";
import ProductServiceGetPort from "../../domain/interfaces/services/ProductServiceGetInterface";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class ProductGetServiceFactory {
    public static readonly create = () : ProductServiceGetPort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new ProductServiceGet(sqlRepository)
    }
}