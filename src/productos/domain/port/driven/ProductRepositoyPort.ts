import Repository from "../../repository/RepositoryInterface";
import ProductInterface from "../../types/ProductInterface";

export default interface IProductRepository extends Repository<string, ProductInterface > {
    
}