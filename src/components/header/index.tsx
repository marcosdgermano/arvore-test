import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = (): JSX.Element => {
  const history = useHistory();
  const [term, setTerm] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      history.push(`/search?q=${term}`)
    }
  }

  return (
    <StyledHeader>
      <LogoWrapper>
        <a href='/'><img src='/public/assets/logo.png' /></a>
      </LogoWrapper>
      <StyledInput onChange={(event) => setTerm(event.target.value)} onKeyDown={handleKeyDown} />
      <StyledProfile>
        <ProfileImg src='/public/assets/profile_img.png' />
        <ProfileName>alessandra</ProfileName>
        <img src='/public/assets/arrow_icon.png'/>
      </StyledProfile>
    </StyledHeader>
  )
}

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
`;

const ProfileName = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color:#406A76;
`;

const StyledInput = styled.input`
  max-width: 1000px;
  flex: 6 1 60%;
  height: 45%;
  background: #F1F7FC;
  border: 1px solid #DEE1E6;
  border-radius: 20px;
  padding:10px;
`

const LogoWrapper = styled.div`
  padding-left: 20px;
  flex: 2 2 20%;
`;

const StyledHeader = styled.header`
  background: #FFFFFF;
  height: 65px;
  box-shadow: 0px 4px 5px rgba(5, 59, 75, 0.06);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default Header;
