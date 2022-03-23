import { useForm } from 'react-hook-form';
import Matchs from './Matchs';
import UserInfo from './UserInfo';
import '../style/Summoner.css';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';


const Summoner = () => {
  const [ matchCount, setMatchCount ] = useState(10);
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
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${queryKey[1]}?api_key=${process.env.REACT_APP_API_KEY}`
        );
      const data1 = await res1.json();

      const res2 = await
        fetch(
          `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${data1.puuid}/ids?api_key=${process.env.REACT_APP_API_KEY}&count=${queryKey[2]}`);
      const data2 = await res2.json();

      const matchs =
        await Promise.all(data2.map(async (matchId) =>
          await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
        ));
      return { 'user': data1, 'matchs': matchs };
    }
    return {};
  };

  const { isLoading, error, data } = useQuery(['fetchUserAndMatchs', id, matchCount], fetchUser);

  const onSubmit = (data) => {
    nav(`/summoner/${data.summName}`);
  }
  const searchBar =
    <div>
      <form className='search-bar' onSubmit={handleSubmit(onSubmit)}>
        <select>
          <option>EUW</option>
          <option>NA</option>
          <option>KR</option>
        </select>
        <input {...register('summName')} />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>;

  if (!data || id === '')
    return (
      searchBar
    )

  if (error)
    return (
      <div>
        {searchBar}
        <h1>Error!</h1>
      </div>
    )

  if (isLoading)
    return (
      <div>
        <p> count: {matchCount}</p>
        {searchBar}
        <h1>Loading...</h1>
      </div>
    )

  return (
    <div>
      {searchBar}
      {Object.keys(data).length !== 0 ?
        (<div className='main-container'>
          <div>
            {Object.keys(data['user']).length !== 0 ? <UserInfo user={data['user']} /> : ''}
          </div>
          {Object.keys(data['user']).length !== 0 || data['matchs'].length !== 0 ? <Matchs user={data['user']} matchList={data['matchs']} onMore={setMatchCount} /> : ''}
        </div>) : ''
      }
    </div>
  );
}

export default Summoner;
