import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Account from "../../types/Account";

export default function ProfileHome() {

    const customerId = useParams().customerId;
    const [account, setAccount] = useState({} as Account); 
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);


    const api = axios.create({

    
        headers: { "Access-Control-Allow-Origin": "*" },
        // withCredentials: true
    })

    useEffect(()=> {


        api.get(`http://localhost:8080/accounts-api/customer/${customerId}`).then(res=>{
            setAccount(res.data);
                        
        }).catch(err=>{
            console.log("There was an error when attempting to fetch account with primary key: " + customerId)
            console.log("Error message: " + err.message)
        })

    }, []);


    return (
        <Container>
           <Card>
            <Card.Header>

            </Card.Header>
           </Card>
        </Container>
    )
}

