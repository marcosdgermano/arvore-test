import React from 'react';
import ReactDOM from 'react-dom';
// import styled from 'styled-components';
// import GlobalStyle from './utils/global-style';
// import history from './utils/history';
import Home from './pages/home';

const App = () => (
  <>
    <Home />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
