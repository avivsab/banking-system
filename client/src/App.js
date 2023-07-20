import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Account from './components/Account';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/account" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/account">
          {loggedIn ? <Account username={username} /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
