import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './index.css'
import Gallery from './component/Gallery';
import GlobalMenu from './component/GlobalMenu';
import LocalMenu from './component/LocalMenu';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalMenu />
    <LocalMenu />
    <Gallery/>
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/