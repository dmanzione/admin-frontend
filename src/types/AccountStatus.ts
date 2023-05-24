import { string } from "yup";

enum AccountStatus {OPEN = "OPEN",
  FROZEN = "FROZEN",
  CLOSED = "CLOSED",
  
}
 

export function getStatus(status: string): AccountStatus {
  return AccountStatus[status as keyof typeof AccountStatus];
}
 
export function getAllAccountStatuses(): AccountStatus[] {
  return Object.values(AccountStatus);
  // return [AccountStatus.OPEN, AccountStatus.FROZEN, AccountStatus.CLOSED];
}
 
export const accountStatusSchema = string().oneOf(getAllAccountStatuses());



export default AccountStatus;
