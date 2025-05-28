import Cliente from "../../model/client/Client";

export default interface UserServiceGetInterface {    
    getClienteById(id: number): Promise<Cliente>;
}