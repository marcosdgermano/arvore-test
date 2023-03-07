import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './utils/global-style';
import { history } from './utils/history';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '@pages/home';
import Search from '@pages/search';

const App = () => (
  <Router history={history}>
    <GlobalStyle />
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Home />}
      />
      <Route
        path="/search"
        exact
        render={() => <Search />}
      />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
