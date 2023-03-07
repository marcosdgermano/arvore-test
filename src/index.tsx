import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './utils/global-style';
import { history } from './utils/history';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '@pages/home';
import Search from '@pages/search';
import Header from '@components/header';
import Footer from '@components/footer';

const App = () => (
  <Router history={history}>
    <GlobalStyle />
    <Header />
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
    <Footer />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
