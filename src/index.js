import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import GlobalStyle from './utils/global-style';
import history from './utils/history';
import Home from './pages/home';

const App = () => (
    <Router history={history}>
    <GlobalStyle />
      <Page>
        <Switch>
          <Route
            path="/"
            exact
            render={({ history }) => (hasPocId(history) ? <Redirect to="/produtos" /> : <Home history={history} />)}
          />
        </Switch>
      </Page>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
