import React, { useState, useEffect } from 'react';
import puppeteer from 'puppeteer';
import moment from 'moment-timezone';
import 'moment/locale/es'
import '../styles/LastMatch.css';

function LastMatch() {
  const [league, setLeague] = useState('');
  const [localTeam, setLocalTeam] = useState('');
  const [visitingTeam, setVisitingTeam] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [localScore, setLocalScore] = useState('');
  const [visitScore, setVisitScore] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('/api');

        const league = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a > div:nth-child(1) > div:nth-child(2)', element => element.textContent);
        const localTeam = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a > div:nth-child(2)', element => element.innerHTML);
        const visitingTeam = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a > div:nth-child(4)', element => element.innerHTML);
        const localScore = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a > div:nth-child(3) > span > span:nth-child(1)', element => element.textContent);
        const visitScore = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a > div:nth-child(3) > span > span:nth-child(2)', element => element.textContent);
        const matchDate = await page.$eval('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a', element => element.getAttribute('starttime'));

        await browser.close();

        moment.locale('es');
        moment.localeData('es');
        const localDate = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D YYYY');
        const localTime = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm a');

        setLeague(league);
        setLocalTeam(localTeam);
        setVisitingTeam(visitingTeam);
        setMatchDate(localDate)
        setMatchTime(localTime);
        setLocalScore(localScore);
        setVisitScore(visitScore);
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
          <h3>Último partido</h3>
          <span dangerouslySetInnerHTML={{ __html: league }} />
        </div>
        <div className='card__body'>
          <div className={localTeamClass}>
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: localTeam }} />
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: localScore}} />
          </div>
          <div className={visitingTeamClass}>
          <div className='team-line-item' dangerouslySetInnerHTML={{ __html: visitingTeam }} />
          <div className='team-line-item' dangerouslySetInnerHTML={{ __html: visitScore }} />
          </div>
          
        </div>
      </div>
      <div className='vr-100'></div>
      <div className='card__info'>
        <div className='card__info-date'>
        <div dangerouslySetInnerHTML={{ __html: matchTime }} />
        <div dangerouslySetInnerHTML={{ __html: matchDate }} />
        </div>
        <button className='card-button'>Resumen</button>
      </div>
    </div>
  );
}

export default LastMatch