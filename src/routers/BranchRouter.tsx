import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from "react-bootstrap";

import BranchListPage from '../pages/Branches/BranchListPage';

export default function BranchRouter() {

  const [loadingAuth, setLoadingAuth] = useState(false);


  return loadingAuth ? (
    <h1>Loading Auth!</h1>
  ) : (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<BranchListPage />} />
        </Routes>
      </Container>
    </>
  );
}
