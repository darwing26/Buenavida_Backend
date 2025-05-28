import ProductServiceDelete from "../../application/service/ProductsServiceDelete";
import ProductServiceDeletePort from "../../domain/interfaces/services/ProductServiceDeleteInterface";
import SQLRepositryFactory from "./SQLRepositoryFactory";

export default class ProductDeleteServiceFactory {
    public static readonly create = () : ProductServiceDeletePort => {
        const sqlRepository = SQLRepositryFactory.create();
        return new ProductServiceDelete(sqlRepository)
    }
}