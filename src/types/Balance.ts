import FinancialProduct from "./FinancialProduct";

export default class Balance extends FinancialProduct {

    amount?: number;
    constructor(){
        super("Balance");
        this.amount = 0.0;
    }

}