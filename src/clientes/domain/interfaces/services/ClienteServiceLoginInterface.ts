import LoginResponse from "../../../types/LoginResponse";

export default interface UserServiceLoginInterface {
    login(correo: string, password: string): Promise<LoginResponse | null>;
}