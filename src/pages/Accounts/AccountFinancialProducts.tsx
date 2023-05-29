import axios from "axios"
import { useEffect, useState } from "react"
import FinancialProduct from "../../types/FinancialProduct";
import { useParams } from "react-router-dom";
import { ListGroup, Table } from "react-bootstrap";
import Loan from "../../types/Loan";

export default function AccountFinancialProducts(){
    const [financialProducts, setFinancialProducts] = useState<FinancialProduct[]>([]);
    const accountId = useParams().accountId;
    const api = axios.create({
        headers: { 
           
            "Access-Control-Allow-Origin": "*",

        }
    })
    useEffect(()=>{
        api.get(`http://localhost:8080/accounts-api/financial-products`).then(response=>{
            setFinancialProducts(response.data);
        }).catch(error=>{
            console.log(error);
        })

    }, [])
    return(
        <div>
            <h1>Financial Products</h1>
            <ListGroup>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {financialProducts.map((financialProduct, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{financialProduct.name}</td>
                                    <td>{financialProduct.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </ListGroup>
        </div>

    )
}