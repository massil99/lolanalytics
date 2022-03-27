import { useForm } from 'react-hook-form';
import Matchs from './Matchs';
import UserInfo from './UserInfo';
import '../style/Summoner.css';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import SearchBar from './SearchBar';


const servers = {
  'br': ['br1.api.riotgames.com', 'americas.api.riotgames.com'],
  'eun': ['eun1.api.riotgames.com', 'europe.api.riotgames.com'],
  'euw': ['euw1.api.riotgames.com', 'europe.api.riotgames.com'],
  'jp': ['jp1.api.riotgames.com', 'asia.api.riotgames.com'],
  'kr': ['kr.api.riotgames.com', 'asia.api.riotgames.com'],
  'la1': ['la1.api.riotgames.com', 'americas.api.riotgames.com'],
  'la2': ['la2.api.riotgames.com', 'americas.api.riotgames.com'],
  'na': ['na1.api.riotgames.com', 'americas.api.riotgames.com'],
  'oc': ['oc1.api.riotgames.com', 'asia.api.riotgames.com'],
  'tr': ['tr1.api.riotgames.com', 'europe.api.riotgames.com'],
  'ru': ['ru.api.riotgames.com', 'europe.api.riotgames.com']
}

const Summoner = () => {
  const [matchCount, setMatchCount] = useState(10);
  const [server, setServer] = useState('euw1.api.riotgames.com');
  const [region, setRegion] = useState('europe.api.riotgames.com');

  const { id } = useParams();
  const nav = useNavigate();
  const {
    handleSubmit, // handles form submission
    register,
  } = useForm();

  const fetchUser = async ({ queryKey }) => {
    if (queryKey[1] && queryKey[1] !== '') {
      const res1 =
        await fetch(
          `https://${server}/lol/summoner/v4/summoners/by-name/${queryKey[1]}?api_key=${process.env.REACT_APP_API_KEY}`
        );
      const data1 = await res1.json();

      const res2 = await
        fetch(
          `https://${region}/lol/match/v5/matches/by-puuid/${data1.puuid}/ids?api_key=${process.env.REACT_APP_API_KEY}&count=${queryKey[2]}`);
      const data2 = await res2.json();

      const matchs =
        await Promise.all(data2.map(async (matchId) =>
          await fetch(`https://${region}/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
        ));
      return { 'user': data1, 'matchs': matchs };
    }
    return {};
  };

  const { isLoading, error, data } = useQuery(['fetchUserAndMatchs', id, matchCount], fetchUser);

  const onSubmit = (data) => {
    setServer(servers[data.server][0])
    setRegion(servers[data.server][1])
    if (data.summName !== '') {
      nav(`/summoner/${data.summName}`);

      if (localStorage.getItem('summNames') === null)
        localStorage.setItem('summNames', '{"names":[]}')

      const localSummName = JSON.parse(localStorage.getItem('summNames'));
      if (!localSummName["names"].includes(data.summName.toLowerCase()))
        localSummName["names"].push(data.summName.toLowerCase());

      localStorage.setItem('summNames', JSON.stringify(localSummName));
    }
  }

  if (!data || id === '')
    return (
      <header>
        <SearchBar handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} servers={servers} />
      </header>
    )

  if (error)
    return (
      <div>
        <header>
          <SearchBar handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} servers={servers} />
        </header>
        <h1>Error!</h1>
      </div>
    )

  if (isLoading)
    return (
      <div>
        <header>
          <SearchBar handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} servers={servers} />
        </header>
        <h1>Loading...</h1>
      </div>
    )

  return (
    <div>
      <header>
        <SearchBar handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} servers={servers} />
      </header>
      {Object.keys(data).length !== 0 ?
        (<div className='main-container'>
          <div>
            {Object.keys(data['user']).length !== 0 ? <UserInfo user={data['user']} server={server} /> : ''}
          </div>
          {Object.keys(data['user']).length !== 0 || data['matchs'].length !== 0 ? <Matchs user={data['user']} matchList={data['matchs']} onMore={setMatchCount} /> : ''}
        </div>) : ''
      }
    </div>
  );
}

export default Summoner;
