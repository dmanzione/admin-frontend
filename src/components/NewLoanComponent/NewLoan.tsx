import { useState } from "react";
import { Form } from "react-router-dom";
import { AccountType } from "../../types/AccountType";
import AccountTypesService from "../../services/AccountTypesService";

export default function NewLoan() {
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const accountTypeService = AccountTypesService.getInstance();
  setAccountTypes(accountTypeService.getAccountTypes());
  <Form>
    <div className="mb-3">
      <label className="form-label">City</label>
      <select
        multiple
        className="form-select form-select-lg"
        name=""
        id="account_type"
      >
        <option selected>Select one</option>
        {accountTypes.map((accountType) => (
          <option
            key={accountTypes.indexOf(accountType)}
            value={accountType.toString()}
          >
            {accountType.toString()}
          </option>
        ))}
      </select>
    </div>
  </Form>;
}
