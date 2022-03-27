import '../style/Item.css';
import { useState } from 'react';
import Tooltip from './Tooltip';

const Item = ({ enable, itemId, onMouseLeave, onMouseEnter }) => {
    return (
        enable ?
            <div className='itemSlot' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <img
                    className='item-img'
                    src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${itemId}.png`} />
            </div> : <div className='itemSlot'/>
    )
};

const Items = ({ p }) => {
    const [tooltipInfo, setTooltipInfo] = useState({
        title: '',
        text: ''
    });
    const [enableTooltip, setEnableTooltip] = useState({
        number: -1
    })

    const handleMouseEnter = (number) => {
        setEnableTooltip({
            number: number
        })
    }

    const handleMouseLeave = () => {
        setEnableTooltip({
            number: -1
        })
    }

    return (
        <div className='items'>
            <Tooltip 
                title='item0'
                text='world'
                disable={enableTooltip.number !== 0}>
                <Item
                    enable={p.item0 !== 0}
                    onMouseLeave={() => handleMouseLeave()}
                    onMouseEnter={() => handleMouseEnter(0)}
                    itemId={p.item0} />
            </Tooltip>
            <Tooltip 
                title='item1'
                text='world'
                disable={enableTooltip.number !== 1}>
                <Item
                    enable={p.item1 !== 0}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() =>handleMouseEnter(1)}
                    itemId={p.item1} />
            </Tooltip>
            <Tooltip 
                title='item2'
                text='world'
                disable={enableTooltip.number !== 2}>
                <Item
                    enable={p.item2 !== 0}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() =>handleMouseEnter(2)}
                    itemId={p.item2} />
            </Tooltip>
            <Tooltip
                title='item3'
                text='world'
                disable={enableTooltip.number !== 3}>
                <Item
                    enable={p.item3 !== 0}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() =>handleMouseEnter(3)}
                    itemId={p.item3} />
            </Tooltip>
            <Tooltip
                title='item4'
                text='
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in tellus non tellus pulvinar aliquet vitae quis nibh. Aenean euismod egestas dolor at fermentum. Proin consequat tortor vel ultrices tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin molestie convallis porttitor. Nulla facilisi. Morbi sagittis ipsum non sem dictum fermentum. Praesent id augue eget neque commodo posuere ac sit amet diam. Donec mollis congue felis. Duis egestas rutrum elit, non congue dui hendrerit maximus.
'
                disable={enableTooltip.number !== 4}>
                <Item
                    enable={p.item4 !== 0}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() =>handleMouseEnter(4)}
                    itemId={p.item4} />
            </Tooltip>
            <Tooltip 
                title='item5'
                text='world'
                disable={enableTooltip.number !== 5}>
                <Item
                    enable={p.item5 !== 0}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => handleMouseEnter(5)}
                    itemId={p.item5} />
            </Tooltip>
        </div>
    );
}

export default Items;