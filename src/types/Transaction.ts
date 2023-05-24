import Account from "./Account";
import { TransactionStatus } from "./TransactionStatus";
import { TransactionType } from "./TransactionType";

export default interface Transaction{
    pk: number|null,
    fromAccount: Account|null,
    toAccount: Account|null,
    amount: number,
    date: Date,
    category:TransactionType|null,
    status: TransactionStatus|null,

}