
import { useState } from "react";
import AccountService from "../../services/AccountService";
import Account from "../../types/Account";




export default function AccountsList(){
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

 AccountService.getInstance().getAccounts().then(accounts => {
        setAccounts(accounts);
        setLoading(false);
    }).catch(error => {
        setError(error);
    });

    
    
    const accountService: AccountService = AccountService.getInstance();
    accountService.getAccounts().then(accounts => {
        return setAccounts(accounts);
      }).catch(error => {
        setError(error.message);
      });


        return (
        <div>
            <h1>Accounts List</h1>
            <ul>
                {accounts.map(account => (
                    <li key={account.pk}>{account.id}</li>
                ))}
            </ul>
        </div>
    );

}