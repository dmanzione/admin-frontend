import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from "react-bootstrap";

import BranchListPage from '../pages/Branches/BranchListPage';
import BranchPage from '../pages/Branches/BranchPage';

export default function BranchRouter() {

  const [loadingAuth, setLoadingAuth] = useState(false);


  return loadingAuth ? (
    <h1>Loading Auth!</h1>
  ) : (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<BranchListPage />} />
          <Route path="/:id" element={<BranchPage />} />
        </Routes>
      </Container>
    </>
  );
}
