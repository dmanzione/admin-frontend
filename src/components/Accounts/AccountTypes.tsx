import { ListGroup } from "react-bootstrap";
import { AccountType, getAccountTypeInfo, getType } from "../../types/AccountType";
import React, { useState } from "react";
import { getName } from "../../types/AccountType";


const AccountTypes: React.FC = ()=>{

    const loanTypes:AccountType[] =[ AccountType.CHECKING, AccountType.SAVINGS, AccountType.LOAN, AccountType.CREDIT_CARD, AccountType.REWARDS_PROGRAM];
    const [types,setTypes] = useState<AccountType[]>(loanTypes);
   
    return(
        <ListGroup>
            {loanTypes.map(type => (
                <ListGroup.Item key={type}>
                    {getName(type)}
                    <br/><br/>
                    <small>{getAccountTypeInfo(type)}</small>
                    </ListGroup.Item>
                
                )
            )}
        </ListGroup>
    )



}
export default AccountTypes;