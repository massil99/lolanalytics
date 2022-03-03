import '../style/Item.css';

const Item = ({p}) => {
    return (
        <div className='items'>
        {
            ((p.item0 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item0}.png`}/></div>:
                <div className='itemSlot'/>)
        }
        {
            ((p.item1 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item1}.png`}/></div>:
                <div className='itemSlot'/>)
        }

        {
            ((p.item2 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item2}.png`}/></div>:
                <div className='itemSlot'/>)
        }

        {
            ((p.item3 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item3}.png`}/></div>:
                <div className='itemSlot'/>)
        }

        {
            ((p.item4 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item4}.png`}/></div>:
                <div className='itemSlot'/>)
        }

        {
            ((p.item5 !== 0) ? 
                <div className='itemSlot'><img className='item-img' src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${p.item5}.png`}/></div>:
                <div className='itemSlot'/>)
        }

        </div>
    );
}

export default Item;