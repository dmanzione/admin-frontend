import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import CardsDashboard from "../pages/Cards/CardsDashboard";

const CardRouter: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<CardsDashboard/>} />
       
    </Routes>
  );
};

export default CardRouter;
