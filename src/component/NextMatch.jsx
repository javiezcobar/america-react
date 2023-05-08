import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';
import moment from 'moment-timezone';
import 'moment/locale/es'
import '../styles/NextMatch.css'

function NextMatch() {
  const [ligue, setLigue] = useState('');
  const [local, setLocal] = useState('');
  const [visit, setVisit] = useState('');
  const [hour, setHour] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await redaxios.get('/api');
        const $ = load(response.data);
        const ligue = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(1)').text();
        const local = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(2)').html();
        const visit = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(4)').html();
        const date = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a').attr('starttime');

        moment.locale('es');
        moment.localeData('es');
        const localDate = moment(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D YYYY');
        const localHour = moment(date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm a');

        setLigue(ligue);
        setLocal(local);
        setVisit(visit);
        setHour(localHour);
        setDate(localDate);

      } catch (error) {
        console.error(error);
        setTitle('Ocurrió un error');
      }
    };
    fetchData();
  }, []);

  return (
    <div className='card'>
      <div className='card__text-container'>
        <div className='card__title'>
          <h3>Proximo partido</h3>
          <span dangerouslySetInnerHTML={{ __html: ligue }} />
        </div>
        <div className='card__body'>
          <div className='card__body-team__local' dangerouslySetInnerHTML={{ __html: local }} />
          <div className='card__body-team__visit' dangerouslySetInnerHTML={{ __html: visit }} />
        </div>
      </div>
      <div className='vr-100'></div>
      <div className='card__info'>
        <div className='card__info-date'>
        <div dangerouslySetInnerHTML={{ __html: hour }} />
        <div dangerouslySetInnerHTML={{ __html: date }} />
        </div>
        <button className='card-button'>Resumen</button>
      </div>
    </div>
  );
}

export default NextMatch;