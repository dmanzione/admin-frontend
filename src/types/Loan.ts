import AccountType, { getAccountTypeInfo } from "./AccountType";
import FinancialProduct from "./FinancialProduct";

export default class Loan extends FinancialProduct {
    interestRate: number;
    termInMonths: number;
    principalAmount: number;
    numberOfPaymentsMade!: number;
    monthlyPayment?: number;
    totalInterestPaid?: number;
    remainingBalance?: number;
   
    constructor(interestRate: number, termInMonths: number, principalAmount: number) {
        super("Loan");
       
        this.description = getAccountTypeInfo(AccountType.LOAN);
        this.interestRate = interestRate;
        this.termInMonths = termInMonths;
        this.principalAmount = principalAmount;
    }
}