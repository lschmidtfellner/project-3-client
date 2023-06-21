import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextComponent from './context/AuthContextComponent';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthContextComponent>
      <App />
    </AuthContextComponent>
  </Router>
);
