import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';
import '../styles/News.css'

function News() {
 const [noticias, setNoticias ] = useState('');

 useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await redaxios.get('/america');
            const $ = load(response.data);
            const newsSelect = $('div.elementor-element.elementor-element-2a95db6.elementor-grid-1.elementor-posts--thumbnail-left.elementor-hidden-phone.elementor-grid-tablet-2.elementor-grid-mobile-1.elementor-widget.elementor-widget-posts').html();

            setNoticias(newsSelect)
        }catch(error){
            console.log(error);
        }
    };
    fetchData();
 }, []);

 return (
    <div dangerouslySetInnerHTML={{__html: noticias}} />
 );
}

export default News

//document.querySelector("")