import { string } from "yup";

enum AccountStatus {OPEN = "open",
  FROZEN = "frozen",
  CLOSED = "closed",
  
}
 

export function getStatus(status: string): AccountStatus {
  return AccountStatus[status as keyof typeof AccountStatus];
}
 




export default AccountStatus;
