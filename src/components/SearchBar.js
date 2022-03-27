import '../style/SearchBar.css';
import { useState } from 'react';

const SearchBar = ({ register, handleSubmit, onSubmit, servers }) => {
    const [showHistoryNames, setShowHistoryNames] = useState(false);

    var summnames = [];
    if (localStorage.getItem('summNames') !== null)
        summnames = JSON.parse(localStorage.getItem('summNames'))['names'];

    return (
        <div className='search-bar'
            onFocus={() => setShowHistoryNames(true)}
            onBlur={() => setShowHistoryNames(false)}>
            <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
                <select {...register('server')}>
                    {Object.keys(servers).map(key =>
                        key === 'euw' ?
                            <option value={key} selected="selected">{key.toUpperCase()}</option> :
                            <option value={key}>{key.toUpperCase()}</option>
                    )}
                </select>
                <input {...register('summName')}/>
                <button type="submit">
                    <i className="fas fa-search" />
                </button>
            </form>
            {showHistoryNames ?
                <ul className='history-names'>
                    {summnames.map(sname => {
                        return (
                            <li key={sname}>
                                <a href={`${sname}`}>{sname}</a>
                                <button onClick={() => {
                                    const res = JSON.parse(localStorage.getItem('summNames'))
                                    console.log(res['names']);
                                    res['names'] = res['names'].filter(n => n !== sname)
                                    localStorage.setItem('summNames', JSON.stringify(res))
                                }}>
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </li>
                        )
                    })}
                </ul> : ''
            }
        </div>
    );
}

export default SearchBar;