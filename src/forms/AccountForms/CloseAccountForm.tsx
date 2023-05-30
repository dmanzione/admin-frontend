import { useState } from "react";
import Account from "../../types/Account";
import { Button } from "react-bootstrap";

import AccountStatus from "../../types/AccountStatus";


interface DeleteTransactionFormProps{
    account:Account;
}
const CloseAccountForm = ((props:DeleteTransactionFormProps)=>{
    const [, setAccount] = useState<Account>(props.account);
    const closeAccount = ()=>{
        setAccount(acct => { return {...acct, status: AccountStatus.CLOSED}})
        
    }
    return (
        <Button variant ="link" onClick={closeAccount}>Close Account</Button>
    )

})

export default CloseAccountForm;