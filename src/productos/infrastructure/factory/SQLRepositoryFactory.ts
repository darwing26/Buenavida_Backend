import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";
import ProductRepository from "../repository/ProductRepository";
import SQLRep from "../repository/MetodosDBproductos";

export default class SQLRepositryFactory {
    public static readonly create = (): IProductRepository => {
        return new ProductRepository(new SQLRep())
    }
}