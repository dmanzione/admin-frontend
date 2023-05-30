import FinancialProduct from "./FinancialProduct";

export default class OverdraftProtection extends FinancialProduct{
    enabled:boolean = false;
    overdraftLimit?:number;
    constructor(){
        super("Overdraft Protection");

    }
}
