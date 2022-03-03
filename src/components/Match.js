import '../style/Match.css';
import Item from './Item';

const Match = ({data, user}) => {
    return (
        (data !== undefined) ? 
        <ul className={data.info.participants.filter(p => p.puuid === user.puuid)[0].win ? 'win': 'loss'}>
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
        })}</ul>:''
    );
}

export default Match;