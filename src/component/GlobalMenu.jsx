import React, { useState, useEffect } from 'react';
import '../styles/GlobalMenu.css'


function GlobalMenu () {
    return (
    <div className='globalMenu__container'>
        <button className='globalMenu__button'>Unite a la pasion de un pueblo <i>@</i></button>
        <nav className='globalMenu__nav'>
            <ul className='globalMenu__nav__ul'>
                <li className='globalMenu__nav__item'><a href="#">Tiendas Oficiales</a></li>
                <li className='globalMenu__nav__item'><a href="#">Patrocinadores</a></li>
                <li className='globalMenu__nav__item'><a href="#">Prensa</a></li>
                <li className='globalMenu__nav__item'><a href="#">Registro</a></li>
                <li className='globalMenu__nav__item'><a href="#">Contacto</a></li>
            </ul>
        </nav>
    </div>
    )
};

export default GlobalMenu