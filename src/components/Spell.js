import '../style/Spell.css';
import Tooltip from './Tooltip';
import { useState } from 'react';

const version = "12.5.1"
const lookup = {
    21: 'Barrier',
    55: '_UltBookSmitePlaceholder',
    1:  'Boost',
    14: 'Dot',
    3:  'Exhaust',
    4:  'Flash',
    6:  'Haste',
    7:  'Heal',
    13: 'Mana',
    30: 'PoroRecall',
    31: 'PoroThrow',
    11: 'Smite',
    39: 'SnowURFSnowball_Mark',
    32: 'Snowball',
    12: 'Teleport',
    54: '_UltBookPlaceholder',
}

const Spell = ({summId}) => {
    const source = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${lookup[summId || 54]}.png`;

    return (
        <Tooltip title={lookup[summId || 54]} text="world">
            <img className='spell-img' src={source} />
        </Tooltip>
    ) 
}

export default Spell;