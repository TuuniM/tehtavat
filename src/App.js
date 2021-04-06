import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import Upload from './views/Upload';
import {MediaProvider} from './contexts/MediaContext';
import {Container} from '@material-ui/core';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Container maxWidth="md">
          <Nav />
          <main style={{marginTop: 80}}>
            <Switch>
              <Route path="/" exact component={Login}/>
              <Route path="/home" component={Home}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/single" component={Single}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/upload" component={Upload}/>
            </Switch>
          </main>
        </Container>
      </MediaProvider>
    </Router>
  );
};

export default App;
