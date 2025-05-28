import UserServiceLoginPort from "../../domain/interfaces/services/ClienteServiceLoginInterface";
import IUserRepository from "../../domain/port/driven/ClienteRepositoryPort";
import LoginResponse from "../../types/LoginResponse";
import JWTService from "./jwt";

export default class UserServiceLogin implements UserServiceLoginPort {

    private jwtService: JWTService;
    constructor(private readonly userRepository: IUserRepository, ) {
        this.jwtService = new JWTService('RUIZINI')
    }

    public async login(correo: string, password: string): Promise<LoginResponse | null> {
        try {
            const user = await this.userRepository.login(correo, password);
            
            if (user) {
                // Generar JWT con el ID del usuario
                const jwt = this.jwtService.generateToken(user.id);
                
                return {
                    id: user.id,
                    jwt: jwt
                };
            }
            
            return null; // Credenciales inválidas
        } catch (error) {
            console.error("Error en UserServiceLogin:", error);
            throw new Error("Error al realizar el login");
        }
    }
}