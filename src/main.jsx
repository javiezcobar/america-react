import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './index.css'
import Gallery from './component/Gallery';
import GlobalMenu from './component/GlobalMenu';
import LocalMenu from './component/LocalMenu';
import NextMatch from './component/NextMatch'
import LastMatch from './component/LastMatch'
import TeamStandings from './component/TeamStanding'
import News from './component/News';






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalMenu />
    <LocalMenu />
    <Gallery/>
    <div className='container-grid'>
      <div className='matchContainer'>
        <h2 className='h2Title'>Partidos</h2>
        <div className='container-flex'>
        <NextMatch />
        <LastMatch />
        </div>
      </div>
      <div className='matchContainer-w'>
        <h2 className='h2Title-b'>Posiciones</h2>
        <div className='container-flex'>
        <TeamStandings />
        </div>
      </div>
    </div>
    <div className='section-news'>
        <h2 className='h2Title-b'>Noticias</h2>
        <News />
    </div>
  </React.StrictMode>,
);

/*
para que el desarrollo funcione en netlify
https://rubenr.dev/es/errores-cors-vite-vue/
*/