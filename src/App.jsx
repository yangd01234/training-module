import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import MaintainerUI from './components/MaintainerUI';
import OperatorUI from './components/OperatorUI';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/maintainer" element={<MaintainerUI />} />
        <Route path="/operator" element={<OperatorUI />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
