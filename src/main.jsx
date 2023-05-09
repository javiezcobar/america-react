import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './index.css'
import Gallery from './component/Gallery';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Gallery/>
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/