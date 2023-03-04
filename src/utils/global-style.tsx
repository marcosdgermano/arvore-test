import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto';
    background-color: #f5f5f5;
  }

  h2, ul, li, button {
    all: unset
  }
`;

export default GlobalStyle;
