import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';

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
        const ligue = $('#mod_nextLastMatch > div.panel > div.panel-body > a > div:nth-child(1)').html();
        const local = $('#mod_nextLastMatch > div.panel > div.panel-body > a > div:nth-child(2)').html();
        const visit = $('#mod_nextLastMatch > div.panel > div.panel-body > a > div:nth-child(4)').html();
        const hour = $('#mod_nextLastMatch > div.panel > div.panel-body > a > div:nth-child(3)').html();
        const date = $('html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a').attr('starttime')
        setLigue(ligue);
        setLocal(local);
        setVisit(visit);
        setHour(hour);
        setDate(date);
        
      } catch (error) {
        console.error(error);
        setTitle('Ocurrió un error');
      }
    };
    fetchData();
  }, []);

  return (<>
    <div dangerouslySetInnerHTML={{ __html: ligue }} />
    <div dangerouslySetInnerHTML={{ __html: local }} />
    <div dangerouslySetInnerHTML={{ __html: visit }} />
    <div dangerouslySetInnerHTML={{ __html: hour }} />
    <div dangerouslySetInnerHTML={{ __html: date }} />
  </>);
}

export default NextMatch;


"html > body > main > section:nth-child(2) > div > div:nth-child(3) > div.panel > div.panel-body > a > div:nth-child(5)"