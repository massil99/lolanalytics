import '../style/Spell.css';

const version = "12.5.1"
const lookup = {
    21: 'SummonerBarrier',
    55: 'Summoner_UltBookSmitePlaceholder',
    1: 'SummonerBoost',
    14: 'SummonerDot',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    13: 'SummonerMana',
    30: 'SummonerPoroRecall',
    31: 'SummonerPoroThrow',
    11: 'SummonerSmite',
    39: 'SummonerSnowURFSnowball_Mark',
    32: 'SummonerSnowball',
    12: 'SummonerTeleport',
    54: 'Summoner_UltBookPlaceholder',
}

const Spell = ({summId}) => {
    const source = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${lookup[summId || 54]}.png`;
    return <img className='spell-img' src={source} />
}

export default Spell;