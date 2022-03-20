import React from 'react';
import '../style/UserInfo.css';
import { useQuery } from 'react-query';
import ProportionCircle from './graphic/ProportionCricle';

const UserInfo = ({ user }) => {
    const fetchUserInfo = async ({ queryKey }) => {
        const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${queryKey[1]}?api_key=${process.env.REACT_APP_API_KEY}`;
        return await fetch(url)
            .then(res => res.json())
    };
    const { isLoading, error, data } = useQuery(['userInfo', user.id], fetchUserInfo);
    if (error)
        return (
            <div><h1>error!</h1></div>
        )
    if (isLoading)
        return (
            <div><h1>loading...</h1></div>
        )

    const playerData = data[0] || {}
    return (
        (Object.keys(playerData).length !== 0) ?
            <div className="user-info-container">
                <img className='tier-emblem' src={`${process.env.PUBLIC_URL}/assets/Emblems/Emblem_${playerData.tier}.png`} />
                <p>
                    {
                        playerData.leaguePoints + ' LPs ' +
                        playerData.tier + ' ' +
                        playerData.rank
                    }
                </p>
                <h1>{playerData.summonerName}</h1>
                <p>W: {playerData.wins + ' '} L: {playerData.losses} </p>
                <ProportionCircle
                    text={(100*(playerData.wins / (playerData.losses + playerData.wins)).toFixed(2)).toString() + '%'}
                    percentage={(playerData.wins / (playerData.losses + playerData.wins))}
                    color="#bed"
                    width={100}
                    height={100} />
            </div>
            : ''

    );
}

export default UserInfo;