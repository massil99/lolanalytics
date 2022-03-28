import { Link } from 'react-router-dom';
import Tag from './components/utile/Tag';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/summoner">
                <Tag text="Matches"/>
            </Link>
        </div>
    )
}

export default Home;