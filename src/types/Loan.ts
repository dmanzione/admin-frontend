import FinancialProduct from "./FinancialProduct";

export default class Loan extends FinancialProduct {
    interestRate: number;
    termInMonths: number;
    principalAmount: number;
    numberOfPaymentsMade!: number;
    monthlyPayment?: number;
    totalInterestPaid?: number;
    remainingBalance?: number;
   
    constructor(){
        super("Loan");
        this.interestRate = 2;
        this.termInMonths = 30;
        this.principalAmount = 20000;
    }
   
}