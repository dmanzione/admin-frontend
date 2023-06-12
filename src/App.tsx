import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import UserRouter from "./routers/UserRouter";
import BranchRouter from "./routers/BranchRouter";


import AccountRouter from "./routers/AccountRouter";
import HomePage from "./pages/HomePage";
import RootTemplate from "./pages/RootTemplate";
import TransactionRouter from "./routers/TransactionRouter";
import CardRouter from "./routers/CardRouter";
import LoginPage from "./forms/UserAccount/LoginPage";
import SignupPage from "./forms/UserAccount/SignupPage";

function App() {

  



  
  return (
    <Container>
      <Routes>
        <Route
          element={<RootTemplate />}
          children={[
            <Route path="/" element={<HomePage />} />,
            <Route path="/transactions/*" element={<TransactionRouter />} />,
            <Route path="/accounts/*" element={<AccountRouter />} />,
            <Route path="/users/*" element={<UserRouter />} />,
            <Route path="/branches/*" element={<BranchRouter />} />,
            <Route path="/cards/*" element={<CardRouter />} />,
            <Route path="/login" element={<LoginPage/>} />,
            <Route path='/signup' element={<SignupPage/>} />
          ]}
        />
      </Routes>
    </Container>
  );
}

export default App;
