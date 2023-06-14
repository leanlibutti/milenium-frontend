import styled from 'styled-components'

import logo from '../assets/logo.png'
import { MenuHeader } from './MenuHeader'

export const Header = ({ username, login, admin }) => {
  const redirectHome = () => {
    window.location.assign('/')
  }

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={redirectHome} />
      <MenuHeader username={username} login={login} admin={admin} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
`

const Logo = styled.img`
  width: 300px;
  height: 75px;
  margin-left: 5vw;
  margin-top: 2vw;
  z-index: 2;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 480px) {
    width: 250px;
    height: 64px;
    margin-top: 5vw;
  }
`
