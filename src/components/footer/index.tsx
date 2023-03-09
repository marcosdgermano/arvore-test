import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <StyledFooter>
        <CopyrightText>
          <span>Copyright © 2021 Árvore.</span> <span>Todos os direitos reservados.</span>
        </CopyrightText>
        <ButtonsWrapper>
          <FooterButton>Política de privacidade</FooterButton>
          <FooterButton>Ajuda</FooterButton>
        </ButtonsWrapper>
      </StyledFooter>
    </FooterWrapper>
  )
}

const ButtonsWrapper = styled.div`
  @media (max-width: 541px) {
    display: none;
  }
`;

const FooterButton = styled.a.attrs({ className: 'FooterButton' })`
  padding: 10px 16px;
  margin-left: 10px;
  background: #FFFFFF;
  color: #B2B4B9;
  border: 1px solid #B2B4B9;
  border-radius: 10px;
`;

const CopyrightText = styled.p.attrs({ className: 'CopyrightText' })`
  font-size: 12.8px;
  color: #B2B4B9;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 541px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledFooter = styled.div`
  max-width: 950px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 541px) {
    justify-content: center;
  }
`;

const FooterWrapper = styled.footer`
  background: #FFFFFF;
  border: 0.5px solid #D9D9D9;
  height: 75px;

  @media (max-width: 769px) {
    padding: 0 50px;
  }
`;

export default Footer;