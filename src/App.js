import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/single" component={Single}/>
        <Route path="/logout" component={Logout}/>
      </Switch>
    </Router>
  );
};

export default App;
