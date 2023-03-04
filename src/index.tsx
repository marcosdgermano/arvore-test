import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './utils/global-style';
import Home from './pages/home';

const App = () => (
  <>
    <GlobalStyle />
    <Home />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
