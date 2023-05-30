import { Container, Nav } from "react-bootstrap";
import { ReactNode } from "react";
import { Outlet, OutletProps, Route, Routes } from "react-router-dom";
import AccountRouter from "../../routers/AccountRouter";
export interface PageTemplateProps{
  sons: OutletProps;
}
const AccountsTemplate = ()=> {
  
  return (
       <>
     
    
      
       
     
       
      <Outlet />  
        
   
          

      
     
      

  </>
  );
}
export default AccountsTemplate;
