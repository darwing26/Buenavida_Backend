import LoginResponse from "../../../../types/LoginResponse";

export default interface UserUseCaseLoginPort {
    login(
        correo: string,
        password: string
    ): Promise< LoginResponse | null>;
    
}