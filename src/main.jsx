import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { initFirebase } from './lib/firebase.js';
import App from './App.jsx';

// Initialize Firebase before mounting React (sets window.__FIREBASE__)
initFirebase();

const root = createRoot(document.getElementById('root'));
root.render(<App />);
