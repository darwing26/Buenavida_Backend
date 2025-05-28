import PedidoServiceDelete from "../../application/service/PedidoServiceDelete";
import PedidoServiceDeletePort from "../../domain/interfaces/services/PedidoServiceDeleteInterface";
import SQLRepositoryPedidoFactory from "./SQLRepositoryPedidoFactory";

export default class PedidoDeleteServiceFactory {
    public static readonly create = (): PedidoServiceDeletePort => {
        const sqlRepository = SQLRepositoryPedidoFactory.create();
        return new PedidoServiceDelete(sqlRepository);
    }
}