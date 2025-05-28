import { connectToDatabase } from "../../../utils/conectdb";

export default class MetodosDBproductos {
    private readonly queryGetProducts = "CALL GetAllProductos();";
    private readonly queryGetProductsById = "CALL GetAllProductosById(?);";
    private readonly queryInsertProduct = "CALL GuardarProducto(?, ?, ?, ?, ?)";
    private readonly queryDeleteProduct = "CALL EliminarProducto(?)";
    private readonly queryUpdateProduct = "CALL ActualizarProducto(?, ?, ?, ?, ?, ?)";


    constructor() { }

    public findAll = async () => {
        const conectionDB = await connectToDatabase();
        const [rows] = (await conectionDB.execute(this.queryGetProducts)) as any[];

        console.log(rows);

        if (rows.length > 0) {    
            return rows;
        } else {      
            return null;
        }
    }

    public getById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [rows] = (await conectionDB.execute(this.queryGetProductsById, [
            id,
        ])) as any[];

        if (rows[0].length > 0) {
            return rows[0];
        } else {
            return null;
        }
    }

    public save = async (
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        descripcion: string
    ) => {
        try {
            // acá se hacae la conexion a la db
            const connectionDB = await connectToDatabase();
            // Ejecutar el procedimiento almacenado
            await connectionDB.execute(this.queryInsertProduct, [
                nombre,
                medida,
                precio,
                salea,
                descripcion,
            ]);
            console.log("Producto guardado ");
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    }

    public deleteById = async (id: number): Promise<void> => {
        try {
            const connectionDB = await connectToDatabase(); // Conectar a la base de datos
            await connectionDB.execute(this.queryDeleteProduct, [id]);
            console.log(`Producto con ID ${id} eliminado `);
        } catch (error) {
            console.error("Error en SQLRep al eliminar el producto:", error);
            throw new Error("Error al eliminar el producto en la base de datos");
        }
    }

    public update = async (
        id: number,
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        descripcion: string
    ): Promise<void> => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.execute(this.queryUpdateProduct, [
                id,
                nombre,
                medida,
                precio,
                salea,
                descripcion,
            ]);
            console.log(`Producto con ID ${id} actualizado`);
        } catch (error) {
            console.error("Error en SQLRep al actualizar el producto:", error);
            throw new Error("Error al actualizar el producto en la base de datos");
        }
    };
}
