import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort"
import RepositoryPedido from "../repository/RepositoryCompra"

import MetodosDBcompra from "../repository/MetodosDBcompra"

export default class SQLRepositoryPedidoFactory {
     public static readonly create = (): IPedidoRepositoryPort => {
            return new RepositoryPedido(new MetodosDBcompra())
        }
}