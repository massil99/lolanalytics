import React from 'react';
import Match from './Match'
import '../style/Matchs.css'

const Matchs = ({ matchList , user}) =>{
    return (
        <div className='matchs-container'>
            <h1>Matches</h1>
            {matchList.map(match => <Match key={match.metadata.matchId} user={user} data={match}/>)}
        </div>
    );
}

export default Matchs;