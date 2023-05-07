import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NextMatch from './component/NextMatch.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <NextMatch />
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/