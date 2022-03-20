import { useState, useEffect } from 'react';

const version = "12.5.1"

const Spell = () => {
    const  spellName= 'Summoner_UltBookPlaceholder';
    const source = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellName}.png`;
    return <img src={source} />
}

export default Spell;