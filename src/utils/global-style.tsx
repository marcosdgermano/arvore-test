import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  body {
    margin: 0;
    font-family: 'Roboto';
    background-color: #f5f5f5;
  }

  a, h2, ul, li, button {
    all: unset
  }

  h2 {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 30px;
  }

  a, h1, h2, p, span, label {
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;
