import FinancialProduct from "./FinancialProduct";

export default class InterestRate extends FinancialProduct {
    interestRate?:number;
    constructor() {
        super("Interest Rate");
    }
}