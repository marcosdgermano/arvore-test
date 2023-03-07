import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <StyledFooter>
        <Copyright>Copyright © 2021 Árvore. Todos os direitos reservados.</Copyright>
        <div>
          <FooterButton>Política de privacidade</FooterButton>
          <FooterButton>Ajuda</FooterButton>
        </div>
      </StyledFooter>
    </FooterWrapper>
  )
}

const FooterButton = styled.a`
  padding: 10px 16px;
  margin-left: 10px;
  background: #FFFFFF;
  color: #B2B4B9;
  border: 1px solid #B2B4B9;
  border-radius: 10px;
`;

const Copyright = styled.span`
  font-size: 12.8px;
  color: #B2B4B9;
`;

const StyledFooter = styled.div`
  width: 950px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterWrapper = styled.footer`
  background: #FFFFFF;
  border: 0.5px solid #D9D9D9;
  height: 75px;
`;

export default Footer;