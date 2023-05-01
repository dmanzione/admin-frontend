import React, { useState } from 'react';
import './App.css';
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
        </Routes>
      </Container>
    </>
  );
}

export default App;
