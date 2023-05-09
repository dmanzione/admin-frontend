import React, { useEffect, useState } from "react";
import "./App.css";
import "./BranchMan/BranchList.css";
import BranchList from "./pages/BranchList";
import { Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";
import UserRouter from "./routers/UserRouter";
import { userLogin } from "./slices/auth";
import { useAppDispatch, useAppSelector } from "./hooks/useApp";

function App() {
  const dispatch = useAppDispatch();
  const { loggedIn, loading } = useAppSelector((state) => ({
    loggedIn: state.auth.loggedIn,
    loading: state.auth.loading,
  }));

  useEffect(() => {
    const token = localStorage.getItem("tokenLoader");
    if (token) dispatch(userLogin({ token }));
  }, [dispatch]);

  return loading ? (
    <h1>Loading Auth!</h1>
  ) : (
    <Container>
      <Routes>
        <Route path="/users/*" element={<UserRouter />} />
        <Route path="/branches" element={<BranchList />} />
        <Route path="/" element={<h1>Root Path!</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
