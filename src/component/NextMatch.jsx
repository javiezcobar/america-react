import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';
import moment from 'moment-timezone';
import 'moment/locale/es'
import '../styles/NextMatch.css'

function NextMatch() {
  const [league, setLeague] = useState('');
  const [localTeam, setLocalTeam] = useState('');
  const [visitingTeam, setVisitingTeam] = useState('');
  const [matchdate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await redaxios.get('/api');
        const $ = load(response.data);
        const league = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(1)').text();
        const localTeam = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(2)').html();
        const visitingTeam = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(4)').html();
        const matchDate = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a').attr('starttime');

        moment.locale('es');
        moment.localeData('es');
        const localDate = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D YYYY');
        const localTime = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm a');

        setLeague(league);
        setLocalTeam(localTeam);
        setVisitingTeam(visitingTeam);
        setMatchDate(localDate)
        setMatchTime(localTime);
        
      } catch (error) {
        console.error(error);
        setTitle('Ocurrió un error');
      }
    };
    fetchData();
  }, []);

  const hasAmerica = (teamName) => {
    const name = teamName.toLowerCase();
    return name.includes('america') || name.includes('américa');
  };

  const localTeamClass = hasAmerica(localTeam) ? 'card__body-team__local--america' : 'card__body-team__local';
  const visitingTeamClass = hasAmerica(visitingTeam) ? 'card__body-team__visit--america' : 'card__body-team__visit';

  return (
    <div className='card'>
      <div className='card__text-container'>
        <div className='card__title'>
          <h3>Proximo partido</h3>
          <span dangerouslySetInnerHTML={{ __html: league }} />
        </div>
        <div className='card__body'>
          <div className={localTeamClass} dangerouslySetInnerHTML={{ __html: localTeam }} />
          <div className={visitingTeamClass} dangerouslySetInnerHTML={{ __html: visitingTeam }} />
        </div>
      </div>
      <div className='vr-100'></div>
      <div className='card__info'>
        <div className='card__info-date'>
        <div dangerouslySetInnerHTML={{ __html: matchTime }} />
        <div dangerouslySetInnerHTML={{ __html: matchdate }} />
        </div>
        <button className='card-button'>Resumen</button>
      </div>
    </div>
  );
}

export default NextMatch;