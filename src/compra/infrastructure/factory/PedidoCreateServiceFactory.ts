import SQLRepositryFactory from "../../../productos/infrastructure/factory/SQLRepositoryFactory";
import PedidoServiceCreate from "../../application/service/PedidoServiceCreate";
import PedidoServiceCreatePort from "../../domain/interfaces/services/PedidoServiceCreateInterface";
import SQLRepositoryPedidoFactory from "./SQLRepositoryPedidoFactory";

export default class PedidoCreateServiceFactory {
    public static readonly create = (): PedidoServiceCreatePort => {
        const sqlRepository = SQLRepositoryPedidoFactory.create();
        const sqlRepositoryProduct = SQLRepositryFactory.create();
        return new PedidoServiceCreate(sqlRepository, sqlRepositoryProduct);
    }
}