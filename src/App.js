// src/App.js

import React from 'react';
import HomePage from './components/Homepage/Homepage';
import RegisterPage from './components/Registerpage/Registerpage';
import LoginPage from './components/Loginpage/Loginpage';
import ChatApp from './components/ChatApp/ChatApp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
