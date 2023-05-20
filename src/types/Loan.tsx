import Account from "./Account";
import { LoanType } from "./LoanType";
import User from "./User";

export default class Loan {

    pk!: number;

    owner!: User;
    dateCreated!: Date;
    paymentDate!: Date;
    account!: Account;
    totalPaid!: number;
    initialAmount!: number;
    rate!: 5;
    loanType!: LoanType;


}