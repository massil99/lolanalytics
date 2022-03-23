import Summoner from './components/Summoner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/404NotFound';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/summoner" element={<Summoner />} />
        <Route path="/summoner/:id" element={<Summoner />} />
      </Routes>
    </Router>
  );
}

export default App;