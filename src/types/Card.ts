import AccountType, { getAccountTypeInfo } from "./AccountType";
import FinancialProduct from "./FinancialProduct";

export default class Card extends FinancialProduct {
    
    constructor(){
        super("Card");
       
        this.description = getAccountTypeInfo(AccountType.CREDIT_CARD);
    }
}