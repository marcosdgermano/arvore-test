import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './utils/global-style';
// import Home from '@pages/home';
import Search from '@pages/search';

const App = () => (
  <>
    <GlobalStyle />
    <Search />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
