import { useState } from "react";
import Account from "../../types/Account";
import { getAllAccounts } from "../../services/AccountService";

export default function AccountsList() {
  const [accounts, setAccounts] = useState<Account[]>(new Array<Account>());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    getAllAccounts()
    .then((res) => {
      setAccounts(res);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
    });

 
  return (
    <div>
      <h1>Accounts List</h1>
      <ul>
        {accounts.map((account) => (
          <li key={account.pk}>{account.number}</li>
        ))}
      </ul>
    </div>
  );
}
