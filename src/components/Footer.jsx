import styled from 'styled-components'

import linkedin from '../assets/linkedin.png'
import logo from '../assets/logo.png'
import { Colors } from '../constants/Colors'

const { primaryBlue } = Colors

export const Footer = () => {
  return (
    <FooterContainer>
      <LeftContent>
        <NameGym>Milenium Gimnasio</NameGym>
        <Info>Calle 4 n°539 e/42 y 43</Info>
        <Info>Tel: (0221) 526-1149</Info>
        <Info>Contacto: mileniumgim@hotmail.com</Info>
        <Info>V 0.1.0 - Beta</Info>
      </LeftContent>
      <CenterContent>
        <Logo src={logo} />
      </CenterContent>
      <RightContent>
        <PoweredBy>Desarrollado por</PoweredBy>
        <ByContent>
          <IconLinkedin
            href="https://www.linkedin.com/in/jeremias-dominguez-vega/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img src={linkedin}></Img>
          </IconLinkedin>
          <IconLinkedin
            href="https://www.linkedin.com/in/leandro-libutti-72258a6a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img src={linkedin}></Img>
          </IconLinkedin>
        </ByContent>
      </RightContent>
    </FooterContainer>
  )
}

const ByContent = styled.div`
  margin-right: 5vh;

  @media screen and (max-width: 480px) {
    margin-right: 2vh;
  }
`

const CenterContent = styled.div`
  @media screen and (max-width: 480px) {
    margin-top: 5vw;
    margin-left: 2vw;
  }
`

const FooterContainer = styled.div`
  display: flex;

  @media screen and (max-width: 480px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr auto;
    margin-top: 5vw;
  }
`

const IconLinkedin = styled.a`
  @media screen and (max-width: 480px) {
    margin-right: 1vw;
    margin-left: 2vw;
  }
`

const Img = styled.img`
  width: 25px;
  border-radius: 50px;
  margin: 5px;
`

const Info = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 1rem;
  margin-left: 10px;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`

const LeftContent = styled.div`
  flex: 1;
  padding-left: 3rem;
  line-height: 5px;

  @media screen and (max-width: 480px) {
    padding-left: 1rem;
    grid-column: 1 / span 2;
    grid-row: 1;
  }
`

const Logo = styled.img`
  width: 200px;
  height: calc(var(--width) / 3.89);
  margin-top: 1rem;

  @media screen and (max-width: 480px) {
    margin-left: 35%;
  }
`

const NameGym = styled.p`
  color: ${primaryBlue};
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 25px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const PoweredBy = styled.p`
  font-size: 0.9rem;
  padding-right: 2rem;
  font-weight: bold;
  color: ${primaryBlue};

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-top: 2vw;
  }
`

const RightContent = styled.div`
  flex: 1;
  text-align: end;
  padding-right: 1rem;

  @media screen and (max-width: 480px) {
    margin-top: -23vw;
  }
`
