import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';
import '../styles/Gallery.css'

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await redaxios.get('/nitter');
        const $ = load(response.data, { xml: true });

        const images = $('item > description').map((i, elem) => {
          const regex = /<img[^>]+src="([^">]+)"/g;
          const matches = regex.exec($(elem).text());
          if (matches && matches[1]) {
            return { src: matches[1] };
          }
          return null;
        }).get().filter((img) => img);

        setImages(images.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='gallery--container'>
      {images.map((img, i) => (
        <img className='gallery--img' key={i} src={img.src} alt={`Image ${i}`} />
      ))}
    </div>
  );
}

export default Gallery;
