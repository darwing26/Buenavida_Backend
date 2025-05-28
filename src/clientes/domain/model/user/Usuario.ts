export default abstract class Usuario {
    id: number;
    nombre: string;
    correo: string;
    password: string;

    constructor(userAttributes : UserAttributes ) {
        this.id = userAttributes.id;
        this.nombre = userAttributes.nombre;
        this.correo = userAttributes.correo;
        this.password = userAttributes.password;
    }

    public abstract isNull: () => boolean
    

}

export interface UserAttributes {
    id: number;
    nombre: string;
    correo: string;
    password: string;

}