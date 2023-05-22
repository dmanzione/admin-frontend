import AccountStatus from "../../types/AccountStatus";
import { AccountType } from "../../types/AccountType";

export interface Account {
  accountType: AccountType;
  accountStatus: AccountStatus;
  customer: string;
  bankAgent: string;
  accountN: string;
  pk: number;
  startDate: Date;
  dueDate: Date;
  balance: number;
  rate: number;
}
