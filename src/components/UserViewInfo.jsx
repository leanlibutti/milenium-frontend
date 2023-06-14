import { useEffect, useState } from 'react'
import styled from 'styled-components'

import defaultPhoto from '../assets/default_user.jpg'
import { Colors } from '../constants/Colors'
import { FetchGetData } from '../helpers/FetchGetData'

const { primaryRed, secondaryBlue, secondaryRed, backgroundText } = Colors

async function getUserPhoto(email) {
  return await FetchGetData(
    `${process.env.REACT_APP_USER_PHOTO}?email=${email}`
  )
}

export const UserViewInfo = ({ user }) => {
  const [photo, setPhoto] = useState(null)

  const getYears = () => {
    var actDate = new Date()

    var fechaNac = new Date(user.date)

    var dif = actDate.getTime() - fechaNac.getTime()

    return Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25))
  }

  useEffect(() => {
    getUserPhoto(user.email)
      .then((response) => response.blob())
      .then((data) => {
        if (data.size !== 14) {
          const imageUrl = URL.createObjectURL(data)
          setPhoto(imageUrl)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <ProfileContainer>
      <PhotoContainer>
        <UserPhoto src={photo ? photo : defaultPhoto} />
      </PhotoContainer>
      <InfoContainer>
        <FirstInfo>
          <Label>Nombre</Label>
          <TextContainer>
            <Text>{user.username}</Text>
          </TextContainer>
          <Label>Apellido</Label>
          <TextContainer>
            <Text>{user.surname}</Text>
          </TextContainer>
          <Label>Fecha de Nacimiento</Label>
          <TextContainer>
            <Text>
              {user.date} ({getYears()} años)
            </Text>
          </TextContainer>
          <Label>Sexo</Label>
          <TextContainer>
            <Text>{user.gender}</Text>
          </TextContainer>
          <Label>Email</Label>
          <TextContainer>
            <Text>{user.email}</Text>
          </TextContainer>
        </FirstInfo>
        <SecondInfo>
          <AdInfoTitle>Información Adicional</AdInfoTitle>
          <Label>Peso</Label>
          <TextContainer>
            {user.weight ? (
              <Text>{user.weight} Kg.</Text>
            ) : (
              <TextNoData>*Agregar información</TextNoData>
            )}
          </TextContainer>
          <Label>Altura</Label>
          <TextContainer>
            {user.height ? (
              <Text>{user.height} Cm.</Text>
            ) : (
              <TextNoData>*Agregar información</TextNoData>
            )}
          </TextContainer>
          <Label>Medicación</Label>
          <TextContainer>
            {user.medications.length > 0 ? (
              user.medications.map((el, index) => (
                <InfoItem key={index}>
                  <TextMed>- {el}.</TextMed>
                </InfoItem>
              ))
            ) : (
              <Text>Sin información</Text>
            )}
          </TextContainer>
          <Label>Lesiones/Tratamiento</Label>
          <TextContainer>
            {user.injuries.length > 0 ? (
              user.injuries.map((el, index) => (
                <InfoItem key={index}>
                  <TextMed>
                    - {el.injury} -{' '}
                    {el.treatment ? `${el.treatment}.` : 'Sin tratamiento.'}
                  </TextMed>
                </InfoItem>
              ))
            ) : (
              <Text>Sin información</Text>
            )}
          </TextContainer>
          <Label>Enfermedades/Medicación</Label>
          <TextContainer>
            {user.diseases.length > 0 ? (
              user.diseases.map((el, index) => (
                <InfoItem key={index}>
                  <TextMed>
                    - {el.disease} -{' '}
                    {el.medication.length > 0
                      ? el.medication.map((el) => `${el}. `)
                      : 'Sin medicamento.'}
                  </TextMed>
                </InfoItem>
              ))
            ) : (
              <Text>Sin información</Text>
            )}
          </TextContainer>
        </SecondInfo>
      </InfoContainer>
    </ProfileContainer>
  )
}

const AdInfoTitle = styled.h2`
  margin: 0 0 2vw 3vw;
  font-style: italic;
  color: ${secondaryBlue};
  text-decoration: underline;
  text-align: center;

  svg {
    margin-left: 1vw;
    color: ${secondaryBlue};
    transition: all 0.5s ease-in-out;

    @media screen and (max-width: 480px) {
    }
  }

  svg:hover {
    cursor: pointer;
    color: ${secondaryRed};
  }
`

const FirstInfo = styled.div``

const InfoContainer = styled.div``

const InfoItem = styled.li`
  display: block;

  @media screen and (max-width: 480px) {
  }
`

const Label = styled.h3`
  margin-bottom: -0.5rem;
  font-style: italic;
  color: ${secondaryBlue};
  margin-left: 24vw;

  @media screen and (max-width: 480px) {
    margin-left: 8vw;
    margin-bottom: 1rem;
  }
`

const PhotoContainer = styled.div`
  color: ${secondaryBlue};
  text-align: center;

  @media screen and (max-width: 480px) {
    margin-top: 10vw;
    margin-bottom: 10vw;
  }

  svg {
    padding: 1rem;
    transition: all 0.5s ease-in-out;

    @media screen and (max-width: 480px) {
      padding: 1rem 1rem 0 0.5rem;
    }
  }

  svg:hover {
    cursor: pointer;
    color: ${secondaryRed};
  }
`

const ProfileContainer = styled.div`
  display: block;
  margin: 2vw;
  margin-bottom: 1vw !important;
`

const SecondInfo = styled.div``

const Text = styled.p`
  font-size: 1.3rem;
  padding: 0.5rem;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const TextContainer = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 40vw;
  margin: 1vw auto;
  border-radius: 1rem;
  color: ${primaryRed};

  @media screen and (max-width: 480px) {
    width: 80vw;
    margin-bottom: 5vw;
    margin-left: 8vw;
  }
`

const TextMed = styled(Text)`
  padding-left: 1rem;
`

const TextNoData = styled(Text)`
  font-style: italic;
  font-weight: 400;
`

const UserPhoto = styled.img`
  width: 8vw;
  margin-left: 5vw;
  margin-bottom: 1vw;
  border-radius: 1000px;
  box-shadow: 0px 6px 5px #ccc;
  background: ${backgroundText};

  @media screen and (max-width: 480px) {
    width: 25vw !important;
  }

  @media screen and (max-width: 1050px) {
    width: 15vw;
  }
`
