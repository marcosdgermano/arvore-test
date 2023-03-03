import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: #666;
    margin: 0;
    background-color: #EAEAEA;
    font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  li {
    display: block;
  }

  ul {
    padding: 0;
  }
`;

export default GlobalStyle;
