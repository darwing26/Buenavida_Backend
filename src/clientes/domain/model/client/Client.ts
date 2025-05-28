import Usuario, { UserAttributes } from "../user/Usuario";

export default class Cliente extends Usuario {
    public telefono: string;
    public direccion: string;

    constructor(clientAttributes : ClientAttibutes) {
        super({
            id : clientAttributes.id,
            nombre: clientAttributes.nombre,
            correo: clientAttributes.correo,
            password: clientAttributes.password
        });
        this.telefono = clientAttributes.telefono;
        this.direccion = clientAttributes.direccion;
    }

    public override isNull = (): boolean => {
        return false
    }
    

}


export interface ClientAttibutes extends UserAttributes {
    telefono: string;
    direccion: string;
}



