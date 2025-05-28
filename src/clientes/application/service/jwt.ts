import jwt from 'jsonwebtoken';

export default class JWTService {
    private readonly SECRET_KEY: string;
    private tokenBlacklist: Set<string>; 

    constructor(secretKey: string) {
        this.SECRET_KEY = secretKey;
        this.tokenBlacklist = new Set();
    }

    public generateToken(userId: number): string {
        return jwt.sign({ userId }, this.SECRET_KEY, { expiresIn: '7d' });
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.SECRET_KEY);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    public invalidateToken(token: string): void {
        this.tokenBlacklist.add(token);
    }

    

}

