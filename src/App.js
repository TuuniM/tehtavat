import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/single/:id" component={Single}/>
      </Switch>
    </Router>
  );
};

export default App;
