import React, { useState, useEffect } from 'react';
import puppeteer from 'puppeteer';
import moment from 'moment-timezone';
import 'moment/locale/es';
import '../styles/LastMatch.css';

function LastMatch() {
  const [matchData, setMatchData] = useState({
    league: '',
    localTeam: '',
    visitingTeam: '',
    localScore: '',
    visitScore: '',
    matchDate: '',
    matchTime: '',
  });

  const fetchMatchData = async () => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('/api');

      const data = await page.evaluate(() => {
        const leagueElement = document.querySelector('html > body > main > section:nth-child(2) > div > div:nth-child(4) > div > div:nth-child(2) > a');
        const localTeamElement = leagueElement.querySelector('div:nth-child(2)');
        const visitingTeamElement = leagueElement.querySelector('div:nth-child(4)');
        const localScoreElement = leagueElement.querySelector('div:nth-child(3) > span > span:nth-child(1)');
        const visitScoreElement = leagueElement.querySelector('div:nth-child(3) > span > span:nth-child(2)');

        return {
          league: leagueElement.querySelector('div:nth-child(1) > div:nth-child(2)').textContent,
          localTeam: localTeamElement.innerHTML,
          visitingTeam: visitingTeamElement.innerHTML,
          localScore: localScoreElement.textContent,
          visitScore: visitScoreElement.textContent,
          matchDate: leagueElement.getAttribute('starttime')
        };
      });

      await browser.close();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatchData();
        const { league, localTeam, visitingTeam, localScore, visitScore, matchDate } = matchData;

        moment.locale('es');
        moment.localeData('es');
        const localDate = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('MMMM D YYYY');
        const localTime = moment(matchDate).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm a');

        setMatchData({
          league,
          localTeam,
          visitingTeam,
          localScore,
          visitScore,
          matchDate: localDate,
          matchTime: localTime,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const hasAmerica = (teamName) => {
    const name = teamName.toLowerCase();
    return name.includes('america') || name.includes('américa');
  };

  const localTeamClass = hasAmerica(matchData.localTeam) ? 'card__body-team__local--america' : 'card__body-team__local';
  const visitingTeamClass = hasAmerica(matchData.visitingTeam) ? 'card__body-team__visit--america' : 'card__body-team__visit';

  return (
    <div className='card'>
      <div className='card__text-container'>
        <div className='card__title'>
          <h3>Último partido</h3>
          <span dangerouslySetInnerHTML={{ __html: matchData.league }} />
        </div>
        <div className='card__body'>
          <div className={localTeamClass}>
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: matchData.localTeam }} />
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: matchData.localScore }} />
          </div>
          <div className={visitingTeamClass}>
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: matchData.visitingTeam }} />
            <div className='team-line-item' dangerouslySetInnerHTML={{ __html: matchData.visitScore }} />
          </div>
        </div>
      </div>
      <div className='vr-100'></div>
      <div className='card__info'>
        <div className='card__info-date'>
          <div dangerouslySetInnerHTML={{ __html: matchData.matchTime }} />
          <div dangerouslySetInnerHTML={{ __html: matchData.matchDate }} />
        </div>
        <button className='card-button'>Resumen</button>
      </div>
    </div>
  );
}

export default LastMatch;
