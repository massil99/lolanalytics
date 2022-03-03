import {useForm} from 'react-hook-form';
import {useState} from 'react';
import Matchs from './components/Matchs';
import UserInfo from './components/UserInfo'
import './style/App.css'
 
function App() {
  const [stateUser, setStateUser] = useState({});
  const [matchList, setMatchList] = useState([]);
  const {
    handleSubmit, // handles form submission
    register,
  } = useForm();

  const onSubmit = (data) => {
    setStateUser({});
    setMatchList([]);
    const fetchUser = async () => {
      let res = 
        await fetch(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${data.summName}?api_key=${process.env.REACT_APP_API_KEY}`
        );
      let data_ = await res.json();
      setStateUser(data_);

      res = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${data_.puuid}/ids?api_key=${process.env.REACT_APP_API_KEY}`);
      data_ = await res.json();
      setMatchList([])
      data_.map(
          (matchId) => fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(d => {setMatchList(old=>[...old, d])})
      )
        
    };
    (data.summName !== undefined && fetchUser());
  };
  

  return (
    <div>
      <form className='search-bar' onSubmit={handleSubmit(onSubmit)}>
        <input {...register('summName')} />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
      {Object.keys(stateUser).length !== 0 ? <UserInfo user={stateUser}/> : ''}
      {Object.keys(stateUser).length !==0 && matchList.length !== 0 ? <Matchs user={stateUser} matchList={matchList}/>: ''}
    </div>
  );
}

export default App;
