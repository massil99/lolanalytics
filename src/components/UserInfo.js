import React from 'react';
import '../style/UserInfo.css';

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            user: props.user,
            playerData: {} 
        };
    }
    async componentDidMount(){
        const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.state.user.id}?api_key=${process.env.REACT_APP_API_KEY}`; 
        console.log(url);
        await fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ playerData : data[0]}));

    }

    render(){
        return (
            (Object.keys(this.state.playerData).length !== 0) ?
            <div className="user-info-container">
                <img className='tier-emblem' src={`${process.env.PUBLIC_URL+'/assets/Emblems/Emblem_'+this.state.playerData.tier}.png`}/>
                <div>
                    <h1>{this.state.playerData.summonerName}</h1>
                    <div>
                        <p>W: {this.state.playerData.wins+ ' '} L: { this.state.playerData.losses} </p>
                        <p>{(100 * (this.state.playerData.wins / (this.state.playerData.losses + this.state.playerData.wins))).toFixed(2)}% WR</p>
                    </div>
                    <h4>{
                        this.state.playerData.tier + ' ' +
                        this.state.playerData.rank + ' ' +
                        this.state.playerData.leaguePoints}</h4>
                    </div>
            </div>: 'loading...'
             
        );
    }
}

export default UserInfo;