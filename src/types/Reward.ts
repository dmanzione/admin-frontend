import FinancialProduct from "./FinancialProduct";

export default class Reward extends FinancialProduct {

    constructor(){
        super("Reward");
        
        this.description = "Reward";
    }
}