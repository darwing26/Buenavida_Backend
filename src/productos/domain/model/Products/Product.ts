export default class Product {
    
    public id : number;
    public nombre : string;
    public medida : string;
    public precio: number;
    public salea: string;
    public description : string;
    public urlImage : string;
    public descuento : number;
    
    constructor(
        id: number,
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        description: string,
        urlImage: string,
        descuento?: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.medida = medida;
        this.precio = precio;
        this.salea = salea;
        this.description = description;
        this.urlImage = urlImage;
        this.descuento = descuento ?? 0;
    }

    public isNull = (): boolean => {
        return false;
    }

}