import Cliente from "./Client";

export default class NullClient extends Cliente {
    constructor() {
        super({
            id : 0,
            nombre: 'Unknow',
            correo: 'Unknow',
            password: 'Unknow',
            telefono: 'Unknow',
            direccion: 'Unknow',
        });
    }

    public override isNull = (): boolean => {
        return true
    }
    
}