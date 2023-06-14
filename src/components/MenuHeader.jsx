import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { FaHome, FaFileInvoiceDollar, FaUserAlt } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'

/* import { useAuthAdmin } from "./AdminRoute";
import { useAuth } from "./LoginRoute"; */
import { Colors } from '../constants/Colors'
import { BurgerButton } from './BurgerButton'

const { secondaryBlue, colorText } = Colors

export const MenuHeader = ({ username, login, admin }) => {
  const profilePath = `/usuario/${username}`
  const authAdmin = login && admin

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (window.innerWidth <= 1300) {
      setClicked(!clicked)
    }
  }

  return (
    <NavContainer>
      {!authAdmin && (
        <NavContainer>
          <NavLinks className={`links ${clicked ? 'active' : ''}`}>
            <IconContext.Provider
              value={{ size: '1.2rem', style: { verticalAlign: 'top' } }}
            >
              <NavLink to="/" activeclassname="active" onClick={handleClick}>
                <FaHome size="1.3rem" /> Inicio
              </NavLink>
              <NavLink
                to="/mis-pagos"
                activeclassname="active"
                onClick={handleClick}
              >
                <FaFileInvoiceDollar /> Mis Pagos
              </NavLink>
              <NavLink
                to={profilePath}
                activeclassname="active"
                onClick={handleClick}
              >
                <FaUserAlt /> Mi Perfil
              </NavLink>
            </IconContext.Provider>
          </NavLinks>
        </NavContainer>
      )}
      {authAdmin && (
        <NavContainer>
          <NavLinks className={`links ${clicked ? 'active' : ''}`}>
            <IconContext.Provider value={{ style: { verticalAlign: 'top' } }}>
              <NavLink to="/" activeclassname="active" onClick={handleClick}>
                <FaHome size="1.3rem" /> Inicio
              </NavLink>
              <NavLink
                to={profilePath}
                activeclassname="active"
                onClick={handleClick}
              >
                <FaUserAlt fontSize="1.3rem" /> Mi Perfil
              </NavLink>
              <NavLink
                to="/admin"
                onClick={handleClick}
                activeclassname="active"
              >
                <MdAdminPanelSettings fontSize="1.7rem" /> Admin
              </NavLink>
            </IconContext.Provider>
          </NavLinks>
        </NavContainer>
      )}
      <BurgerContainer className="burger">
        <BurgerButton clicked={clicked} handleClick={handleClick} />
      </BurgerContainer>
      <BgDiv className={`initial ${clicked ? 'active' : ''}`} />
    </NavContainer>
  )
}

const BgDiv = styled.div`
  position: absolute;
  background-color: ${colorText};
  top: -700px;
  right: -2000px;
  z-index: 1;
  transition: all 0.3s ease;

  &.active {
    top: 0;
    right: 0;
    width: 100%;
    height: 110%;
  }
`

const BurgerContainer = styled.div``

const NavContainer = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  padding-top: 60px;

  a {
    font-size: 1.2rem;
    color: ${secondaryBlue};
    text-decoration: none;
    width: fit-content;
    margin: 0 1vw 0vw 15vw;
  }

  .burger {
    position: absolute;
    right: 5vw;
    margin-top: 5vw;

    @media screen and (min-width: 1300px) {
      display: none;
    }
  }

  .links {
    display: flex;
    position: absolute;
    top: -200px;
    right: -2000px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    text-align: center;

    a {
      display: block;
      font-size: 1.5rem;
      margin-bottom: 1rem;

      @media screen and (max-width: 480px) {
        padding: 4vw !important;
        margin-bottom: 5vw !important;
        border-radius: 5px;
        min-width: 60vw;
      }

      @media screen and (max-width: 900px) {
        box-shadow: 0px 0px 6px ${secondaryBlue};
        padding: 2vw;
        margin-bottom: 4vw;
        border-radius: 5px;
        min-width: 50vw;
      }

      @media screen and (max-width: 1150px) {
        box-shadow: 0px 0px 6px ${secondaryBlue};
        padding: 2vw;
        margin-bottom: 3vw;
        border-radius: 5px;
        width: 20%;
      }
    }

    @media screen and (min-width: 1150px) {
      position: initial !important;
      margin: 0;

      a {
        font-size: 1.4rem;
        display: inline !important;
      }
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 40%;
    left: 25%;
    right: 0;
    text-align: center;

    @media screen and (max-width: 900px) {
      left: 10%;
    }

    @media screen and (max-width: 480px) {
      left: 5%;
    }
  }
`

const NavLinks = styled.div`
  z-index: 2;
  transition: all 0.2s ease-in-out;
`
