import RouterExpress from "../../../../express/domain/RouterExpress";
import UserControllerExpressPort from "../../../domain/interfaces/ClienteControllerExpressInterface";
import UserRouterExpressInterface from "../../../domain/interfaces/ClienteRouterExpressInterface";

export default class UserRouterExpress extends RouterExpress implements UserRouterExpressInterface {

    constructor(private readonly userController: UserControllerExpressPort) {
        super();
        this.routes();
    }

    public routes = (): void => {
        this.createCliente();
        this.login();
        this.getCliente();
        this.agregarFavorito();
        this.eliminarFavorito();
        this.obtenerFavoritos();
        
    }

    public createCliente(): void {
        this.router.post(
            '/createuser',
            this.userController.createCliente.bind(this.userController)
        );
    }

    public login(): void {
    this.router.post(
        '/login',
        this.userController.login.bind(this.userController)
    );
}

    public getCliente(): void {
        this.router.get(
            '/cliente/:id',
            this.userController.getCliente.bind(this.userController)
        );
    }

    public agregarFavorito(): void {
        this.router.post(
            '/favorito',
            this.userController.agregarFavorito.bind(this.userController)
        );
    }

    public eliminarFavorito(): void {
        this.router.delete(
            '/favorito',
            this.userController.eliminarFavorito.bind(this.userController)
        );
    }

    public obtenerFavoritos(): void {
        this.router.get(
            '/favoritos/:idusuario',
            this.userController.obtenerFavoritos.bind(this.userController)
        );
    }



    
}