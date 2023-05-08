import React, { useState, useEffect } from 'react';
import redaxios from 'redaxios';
import { load } from 'cheerio';
import '../styles/TeamStanding.css'

function TeamStandings() {
 const [table, setTable ] = useState('');

 useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await redaxios.get('/api');
            const $ = load(response.data);
            const table = $('html > body > main > section:nth-child(2) > div > div:nth-child(12) > div > div:nth-child(2)').html();

            setTable(table);
        }catch(error){
            console.log(error);
        }
    };
    fetchData();
 }, []);

 return (
    <div dangerouslySetInnerHTML={{__html: table}} />
 );
}

export default TeamStandings