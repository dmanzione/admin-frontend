import React, { useState } from 'react';
import './App.css';
import './BranchMan/BranchList.css';
import BranchList from "./pages/BranchList";
import { Route, Routes } from 'react-router-dom';

import { Container } from "react-bootstrap";

function App() {

  const [loadingAuth, setLoadingAuth] = useState(false);


  return loadingAuth ? (
    <h1>Loading Auth!</h1>
  ) : (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<h1>Root Path!</h1>} />
          <Route path="/branches" element={<BranchList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
