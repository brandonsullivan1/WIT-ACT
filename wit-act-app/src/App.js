import React, {useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Verification } from './pages/Verification';

function App() {
  const [currentForm, setCurrentForm] =  useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route exact path='/' Component={Login} />
          <Route exact path='/verification' Component={Verification} />
          <Route exact path='/register' Component={Register} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
