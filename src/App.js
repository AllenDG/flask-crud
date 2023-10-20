import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Crud from './components/CRUD';

function App()  {
  return (

    <Routes>

      <Route path="/" element={<LoginForm/>} />
      <Route path="/register" element={<RegisterForm/>} />
      <Route path="/crud" element={<Crud/>} />

    </Routes>

  );
}

export default App;
