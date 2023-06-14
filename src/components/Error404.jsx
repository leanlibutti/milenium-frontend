import styled from 'styled-components'

import oops from '../assets/oops.png'
import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'

const { primaryBlue, secondaryBlue, colorText } = Colors

export const Error404 = ({ login, admin }) => {
  const handleGoHome = () => {
    if (!login) {
      window.location.replace('/')
    }

    if (login && !admin) {
      window.location.replace('/')
    }

    if (login && admin) {
      window.location.replace('/admin')
    }
  }

  return (
    <ErrorContainer>
      <OopsContainer>
        <OopsPhoto src={oops} />
      </OopsContainer>
      <TitleContainer>
        <Title>404 - PAGE NOT FOUND</Title>
      </TitleContainer>
      <TextContainer>
        <Text>
          La página que está buscando podría haber sido eliminada debido a que
          cambió su nombre o simplemente no existe.
        </Text>
      </TextContainer>
      <ButtonHomeContainer>
        <ButtonHome type="button" onClick={handleGoHome}>
          IR AL INICIO{' '}
        </ButtonHome>
      </ButtonHomeContainer>
    </ErrorContainer>
  )
}

const ButtonHome = styled.button`
  width: 25%;
  margin-bottom: 3vh !important;
  margin-top: 2vh !important;
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  color: ${colorText};
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 480px) {
    width: 70%;
    font-size: 1.3rem;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`

const ButtonHomeContainer = styled.div`
  text-align: center;
  padding: 1rem;
`

const ErrorContainer = styled.div`
  padding: 10vw;
`

const OopsContainer = styled.div`
  text-align: center;
  padding: 1rem;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

const OopsPhoto = styled.img`
  width: 20vw;

  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`

const Text = styled.p`
  font-size: 1.2rem;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const TextContainer = styled.div`
  text-align: center;
  margin-left: 24vw;
  width: 40%;
  padding: 0 1rem 1rem 1rem;

  @media screen and (max-width: 480px) {
    width: 90%;
    margin-left: 0;
    padding: 0 1rem 0.5rem 1rem;
  }
`

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
`

const TitleContainer = styled.div`
  text-align: center;
  padding: 1rem;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`
