import UserRepositoryPort from "../../domain/port/driven/ClienteRepositoryPort";
import SQLRep2 from "../repository/MetodosDBclientes";
import UserRepository from "../repository/ClienteRepository";

export default class SQLRepositryFactoryUser {
    public static readonly create = (): UserRepositoryPort => {
        return new UserRepository(new SQLRep2())
    }
}