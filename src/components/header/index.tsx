import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = (): JSX.Element => {
  const history = useHistory();
  const [term, setTerm] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      history.replace(`/search?q=${term}`)
    }
  }

  return (
    <header>
    <StyledHeader>
      <StyledLogo href='/'><img src='/public/assets/logo.png' /></StyledLogo>
      <StyledDesktopInput onChange={(event) => setTerm(event.target.value)} onKeyDown={handleKeyDown} />
      <StyledProfile>
        <ProfileNotification>
          <img src='/public/assets/notification.png' />
        </ProfileNotification>
        <ProfileImg src='/public/assets/profile_img.png' />
        <ProfileName>alessandra</ProfileName>
        <ProfileArrow src='/public/assets/arrow_icon.png'/>
      </StyledProfile>
    </StyledHeader>
    <MobileInputWrapper>
      <StyledMobileInput onChange={(event) => setTerm(event.target.value)} onKeyDown={handleKeyDown} />
    </MobileInputWrapper>
    </header>
  )
}

const ProfileNotification = styled.span`
  display: none;
  @media (max-width: 769px) {
    display: block;
    margin: 0 20px;
    position: relative;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FF5267;
      border: 1px solid #fff;
      top: -5px;
      right: -3px;
    }
  }
`;

const StyledLogo = styled.a`
  padding-left: 20px;
  flex: 2 2 20%;

  @media (max-width: 769px) {
    & > img {
      width: 100px;
      height: auto;
      padding-right: 20px;
    }
  }
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  flex: 2 2 20%;
`;

const ProfileImg = styled.img`
  border-radius: 20px;
  margin-right: 20px;

  @media (max-width: 769px) {
   margin: 0;
  }
`;

const ProfileName = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color:#406A76;

  @media (max-width: 769px) {
    display: none;
  }
`;

const ProfileArrow = styled.img`
  @media (max-width: 769px) {
    display: none;
  }
`

const StyledInput = styled.input`
  max-width: 1000px;
  flex: 6 1 60%;
  height: 45%;
  background: #F1F7FC;
  border: 1px solid #DEE1E6;
  border-radius: 20px;
  padding:10px;
`

const StyledDesktopInput = styled(StyledInput)`
  @media (max-width: 541px) {
    display: none;
  }
`;

const StyledMobileInput = styled(StyledInput)`
`;

const MobileInputWrapper = styled.div`
  display: none;

  @media (max-width: 541px) {
    display: flex;
    padding: 20px;
    background-color: #FFF;
    border-top: 1px solid #F1F7FC;
  }
`;

const StyledHeader = styled.div`
  background: #FFFFFF;
  height: 65px;
  box-shadow: 0px 4px 5px rgba(5, 59, 75, 0.06);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default Header;
