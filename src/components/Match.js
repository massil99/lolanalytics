import '../style/Match.css';
import Item from './Item';
import { useState } from 'react';

const Match = ({data, user}) => {
    const [expend, setExpend] = useState(false);
    const handleExpend = () =>{
        setExpend(old => !old);
    }
    const self = (data !== undefined) ? data.info.participants.filter(p => p.puuid === user.puuid)[0] : null;
    return (
        (data !== undefined) ? 
        <div className={self.win ? 'match-container win': 'match-container loss'}>
            <button className="expend-btn" onClick={handleExpend}>
                {(expend)? <i class="fas fa-angle-up"></i>:<i class="fas fa-angle-down"></i>}
            </button>
            {(!expend) ? 
                <div className="retracted-match">
                    <img 
                        className="champ-img" 
                        src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${self.championName}.png`}/>
                    <Item p={self}/>
                    <div>{self.kills}/{self.deaths}/{self.assists}</div>
                </div>
                :<ul>
                    {data.info.participants.map(p =>{
                        var cname = p.teamId ===100 ? 'blue-side': 'red-side';
                        cname += (p.teamPosition === 'TOP') ? ' top' : '';
                        cname += (p.teamPosition === 'JUNGLE') ? ' jungler' : '';
                        cname += (p.teamPosition === 'MIDDLE') ? ' mid' : '';
                        cname += (p.teamPosition === 'BOTTOM') ? (p.role === 'SUPPORT') ? ' support' : ' adc': '';
                        return (
                            <li key={p.puuid} className={cname}>
                                <div>{p.summonerName}</div>
                                <div>{p.kills}/{p.deaths}/{p.assists}</div>
                                <img className="champ-img" src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${p.championName}.png`}/>
                                <Item p={p}/>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>:''
    );
}

export default Match;