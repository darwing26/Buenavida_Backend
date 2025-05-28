import NullProduct from "../../../../buenavida/domain/model/Products/NullProduct";
import CarritoPedidos from "./CarritoPedidos";

export default class NullCarritoPedidos extends CarritoPedidos {
    constructor() {
        super(new NullProduct(), 0);
    }
}