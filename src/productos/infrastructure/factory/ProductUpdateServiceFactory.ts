import ProductServiceUpdate from "../../application/service/ProductsServiceUpdate";
import ProductServiceUpdatePort from "../../domain/interfaces/services/ProductServiceUpdateInterface";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class ProductUpdateServiceFactory {
    public static readonly create = () : ProductServiceUpdatePort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new ProductServiceUpdate(sqlRepository)
    }
}