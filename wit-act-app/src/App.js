import React from 'react';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Verification } from './pages/Verification';
import { Homepage } from './pages/Homepage';

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route exact path='/' Component={Login} />
          <Route exact path='/verification' Component={Verification} />
          <Route exact path='/register' Component={Register} />
          <Route exact path='/homepage' Component={Homepage} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
