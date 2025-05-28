import Cliente from "../../../model/client/Client";

export default interface UserUseCaseGetPort { 
    getClienteById(id: number): Promise<Cliente>;
}