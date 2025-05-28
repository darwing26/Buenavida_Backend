import UserServiceLoginPort from "../../domain/interfaces/services/ClienteServiceLoginInterface";
import UserUseCaseLoginPort from "../../domain/port/driver/usecase/ClienteUseCaseLoginPort";
import LoginResponse from "../../types/LoginResponse";

export default class UserUseCaseLogin implements UserUseCaseLoginPort {

    constructor(private readonly userServiceLogin: UserServiceLoginPort) {}

    public async login(correo: string, password: string): Promise<LoginResponse | null> {
    try {
        const loginResult = await this.userServiceLogin.login(correo, password);
        return loginResult;
    } catch (error) {
        console.error("Error en UserUseCaseLogin:", error);
        throw new Error("Error al realizar el login");
    }
}
}


