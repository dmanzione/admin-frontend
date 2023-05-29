import AccountType, { getAccountTypeInfo } from "./AccountType";
import FinancialProduct from "./FinancialProduct";

export default class Card extends FinancialProduct {
    
    constructor(){
        super();
        this.name = "Card";
        this.description = getAccountTypeInfo(AccountType.CREDIT_CARD);
    }
}