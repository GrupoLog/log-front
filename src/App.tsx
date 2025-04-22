import ClientsTable from "./components/Table/ClientsTable";
import ProductsTable from "./components/Table/ProductsTable";
import PhonesTable from "./components/Table/PhonesTable";
import VehiclesTable from "./components/Table/VehiclesTable";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ProductsTable />} />
        <Route path="/clientes" element={<ClientsTable />} />
        <Route path="/telefone" element={<PhonesTable />} />
        <Route path="/veiculo" element={<VehiclesTable />} />
      </Routes>
    </Router>
  );
};

export default App;


