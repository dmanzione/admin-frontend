import axios from "axios";
import Loan from "../types/Loan";

export default class LoanService {
    static getInstance(): LoanService {
      return new LoanService();
    }

    constructor(){
        process.env.BASE_URL = "http://localhost:8080/accounts-api/loan-accounts/";

    }


    getLoanById(id:number){
        return axios.get(process.env.BASE_URL +""+ id).then(res => res.data._embedded.loanAccounts).catch((err)=>{
            console.error(err);
     
        });

    }

    getLoans(){
        return axios.get(""+process.env.BASE_URL).then(res => res.data._embedded.loanAccounts);

    }

    
    createLoan(loan:Loan){
        return axios.post(process.env.BASE_URL+""+loan.pk).then(res => res.data._embedded.loanAccounts).catch((err)=>{
            console.error(err);
    })

    }
    
    
    modifyLoan(loan:Loan){
            let l:Loan = new Loan();
            
         axios.put(process.env.BASE_URL+""+loan.pk).then(res => res.data._embedded.loanAccounts).catch((err)=>{
            console.error(err);
          
        }).finally(()=>{
            return loan;
        })
    }
    
    
    deleteLoan(loan:Loan){
        return axios.delete(process.env.BASE_URL+""+loan.pk).then(res => res.data._embedded.loanAccounts).catch((err)=>{
            console.error(err);
        }).finally(()=>{
            return loan;
        })
    };


    getByPrimaryKey(pk:number){
        return axios.get(process.env.BASE_URL +"/"+ pk).then(res => res.data._embedded.loanAccounts).catch((err)=>{
            console.error(err);
        });
    }



   
}
