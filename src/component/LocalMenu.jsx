import React, { useState, useEffect } from 'react';
import '../styles/LocalMenu.css'
import logotipo from '../assets/america-logo-w.svg'


function LocalMenu () {
    return (
    <div className='localMenu__container'>
        <div className='logo__container'>
            <img className='logo' src={logotipo} alt="Escudo America de cali" />
            <h1 className='logo__name'>América</h1>
        </div>
        <nav className='globalMenu__nav'>
            <ul className='globalMenu__nav__ul'>
                <li className='globalMenu__nav__item'><a href="#">Club</a></li>
                <li className='globalMenu__nav__item'><a href="#">Femenino</a></li>
                <li className='globalMenu__nav__item'><a href="#">Masculino</a></li>
                <li className='globalMenu__nav__item'><a href="#">Noticias</a></li>
                <li className='globalMenu__nav__item'><a href="#">Tienda</a></li>
                <li className='globalMenu__nav__item'><a href="#">Boleteria</a></li>
                <li className='globalMenu__nav__item'><a href="#">América Play <i>-</i></a></li>
            </ul>
        </nav>
    </div>
    )
};

export default LocalMenu