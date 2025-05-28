import Product from "./Product";
// Creación objeto nulo de producto  

export default class NullProduct extends Product {
    constructor() {
        super(
            0,                  
            'NullProduct',       
            'Unknow',       
            0,
            'Unknow',            
            'Unknow',  
            'NA'                            
        );
    }

    
    
    
}