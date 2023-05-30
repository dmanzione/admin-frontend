import { ListGroup } from "react-bootstrap";
import { getAccountTypeInfo, getAccountTypes } from "../../types/AccountType";
import React from "react";
import { getName } from "../../types/AccountType";


const AccountTypes: React.FC = ()=>{


   
    return(
        <ListGroup>
            {getAccountTypes().map(type => (
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