import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/reset.css'
import NextMatch from './component/NextMatch.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextMatch />
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/