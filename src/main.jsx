import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './index.css'
import NextMatch from './component/NextMatch.jsx'
import LastMatch from './component/LastMatch.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextMatch />
    <LastMatch />
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/