import '../style/Match.css';
import Item from './Item';
import { useState } from 'react';
import Spell from './Spell';
import ControlableText from './utile/ControlableText';

const version = "12.5.1";

const Match = ({ data, user }) => {
  const [expend, setExpend] = useState(false);
  const handleExpend = () => {
    setExpend(old => !old);
  }
  const self = (data !== undefined) ? data.info.participants.filter(p => p.puuid === user.puuid)[0] : null;
  return (
    (data !== undefined) ?
      <div className={self.win ? 'match-container win' : 'match-container loss'}>
        <button className="expend-btn" onClick={handleExpend}>
          {(expend) ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>}
        </button>
        {(!expend) ?
          <div className="retracted-match">
            <div>
              <div className='champ'>
                <div className="summonerSpells">
                  <Spell summId={self.summoner1Id} />
                  <Spell summId={self.summoner2Id} />
                </div>
                <img
                  className="champ-img"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${self.championName}.png`} />
              </div>
            </div>
            <p>{self.totalMinionsKilled + self.neutralMinionsKilled} cs</p>
            <div>{self.kills}/{self.deaths}/{self.assists}</div>
            <Item p={self} />
          </div>
          : <ul>
            {data.info.participants.map(p => {
              var cname = p.teamId === 100 ? 'blue-side' : 'red-side';
              cname += (p.teamPosition === 'TOP') ? ' top' : '';
              cname += (p.teamPosition === 'JUNGLE') ? ' jungler' : '';
              cname += (p.teamPosition === 'MIDDLE') ? ' mid' : '';
              cname += (p.teamPosition === 'BOTTOM') ? (p.role === 'SUPPORT') ? ' support' : ' adc' : '';
              return (
                <li key={p.puuid} className={cname}>
                  <div>
                    <ControlableText
                      alt="hello"
                      text={p.summonerName}
                      length={10} />
                  </div>
                  <div>
                    <p>{p.kills}/{p.deaths}/{p.assists}</p>
                    <p>{p.totalMinionsKilled + p.neutralMinionsKilled} cs</p>
                  </div>
                  <div className='champ'>
                    <div className="summonerSpells">
                      <Spell summId={p.summoner1Id} />
                      <Spell summId={p.summoner2Id} />
                    </div>
                    <img className="champ-img" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${p.championName}.png`} />
                  </div>
                  <Item p={p} />
                </li>
              )
            })}
          </ul>
        }
      </div> : ''
  );
}

export default Match;