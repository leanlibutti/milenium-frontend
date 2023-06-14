import { useState } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Loader from './Loader'
import { FontFamily } from '../constants/Fonts'
import { ExerciseComponent } from './ExerciseComponent'
import { FetchDeleteData } from '../helpers/FetchDeleteData'
import { FetchGetData } from '../helpers/FetchGetData'

const { errorInput, primaryRed, primaryBlue, secondaryRed, secondaryBlue } =
  Colors

export const FormClearRoutine = ({ users, dbLocal }) => {
  const [exercises, setExercises] = useState([])
  const [forData, setForData] = useState(null)
  const [dayData, setDayData] = useState(null)
  const [errors, setErrors] = useState({})
  const [viewRoutine, setViewRoutine] = useState(false)
  const [loading, setLoading] = useState(false)

  const seeLogos = false

  const clearData = () => {
    setForData(null)
    setDayData(null)

    setExercises([])
  }

  const onValidate = () => {
    let errorsForm = {}

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (dayData === null) {
      errorsForm.dayData = 'Debe especificar día de rutina.'
    }

    return errorsForm
  }

  const handleFor = (e) => {
    setForData(e.target.value)
  }

  const handleChangeFor = () => {
    setForData(null)
  }

  const handleDay = (e) => {
    setDayData(e.target.value)
  }

  const handleChangeDay = () => {
    setDayData(null)
  }

  const handleSeeRoutine = async () => {
    const err = onValidate()
    setErrors(err)
    setLoading(true)

    if (Object.keys(err).length === 0) {
      let ex = []

      await FetchGetData(
        `${process.env.REACT_APP_USER_ROUTINE}?email=${forData}&day=${dayData}`
      )
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 423:
                throw new Error(
                  'El usuario no cuenta con rutina para el día seleccionado.'
                )
                break

              default:
                break
            }
          }

          return response.json()
        })
        .then((data) => {
          if (data.length > 0) {
            data.forEach((el) => {
              const e = {
                series: el.series,
                measure: el.measure,
                count: el.count,
                name: el.name,
                body_zone: el.zone,
                photo: el.photo,
                rest: el.rest,
                description: el.description,
                id: 'exercise_' + Math.floor(Math.random() * 10000)
              }
              ex.push(e)
            })
          }

          setExercises(ex)
          setViewRoutine(true)
        })
        .catch((e) => {
          toast.error(e.message, {
            position: 'top-right',
            duration: 6000,
            style: {
              background: 'rgba(250, 215, 215)',
              fontSize: '1rem',
              fontWeight: '500'
            }
          })
        })
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await FetchDeleteData({
      path: `${process.env.REACT_APP_USER_DELETE_ROUTINE}?email=${forData}&day=${dayData}`
    })

    if (!(res instanceof Error)) {
      toast.success(
        `Rutina de ${forData} del dia ${
          dbLocal.days.find((d) => d.value === dayData).day
        } eliminada.`,
        {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        }
      )

      clearData()
    } else {
      toast.error(res.message, {
        position: 'top-right',
        duration: 6000,
        style: {
          background: 'rgba(250, 215, 215)',
          fontSize: '1rem',
          fontWeight: '500'
        }
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ForPartContainer>
        {!forData ? (
          <InputContainer>
            <Label>Para:</Label>
            <SelectFirst onChange={handleFor} id="for-data">
              <Option value="null">Seleccione un usuario</Option>
              {users !== null &&
                users.map((el, index) => (
                  <Option key={index} value={el.email}>
                    {el.username} {el.surname} - {el.email}
                  </Option>
                ))}
            </SelectFirst>
            {errors.forData && <ErrorInput>{errors.forData}</ErrorInput>}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>Rutina para {forData}</ForText>
            <FaEdit size="1.5rem" onClick={handleChangeFor} />
          </ForTextContainer>
        )}
      </ForPartContainer>
      <DayPartContainer>
        {!dayData ? (
          <InputContainer>
            <Label>Día:</Label>
            <SelectFirst onChange={handleDay}>
              <Option value="null">Seleccione un día</Option>
              {dbLocal.days.map((el, index) => (
                <Option value={el.value} key={index}>
                  {el.day}
                </Option>
              ))}
            </SelectFirst>
            {errors.dayData && <ErrorInput>{errors.dayData}</ErrorInput>}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>
              Para el día {dbLocal.days.find((el) => el.value === dayData).day}
            </ForText>
            <FaEdit size="1.5rem" onClick={handleChangeDay} />
          </ForTextContainer>
        )}
      </DayPartContainer>
      <ButtonSeeRoutine type="button" onClick={handleSeeRoutine}>
        Ver Rutina
      </ButtonSeeRoutine>
      {loading && <Loader />}
      {exercises.length > 0 && viewRoutine && (
        <ListContainer>
          {forData && dayData && (
            <Title>
              Rutina del dia{' '}
              {dbLocal.days.find((el) => el.value === dayData).day} para{' '}
              {users.find((u) => u.email === forData).username}:
            </Title>
          )}
          <List>
            {exercises.map((el) => (
              <ExerciseComponent key={el.id} el={el} seeLogos={seeLogos} />
            ))}
          </List>
        </ListContainer>
      )}
      {errors.exercises && <ErrorInput>{errors.exercises}</ErrorInput>}
      <ButtonSubmit type="submit">Borrar</ButtonSubmit>
      {loading && <Loader />}
      <Toaster />
    </Form>
  )
}

const ButtonSubmit = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryRed};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 2rem;
  padding: 10px 20px;
  margin-top: 2rem;
  width: 100%;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${primaryBlue};
  }
`

const ButtonSeeRoutine = styled(ButtonSubmit)`
  background-color: ${primaryBlue};

  :hover {
    background-color: ${primaryRed};
  }
`

const DayPartContainer = styled.div``

const ErrorInput = styled.div`
  font-size: 15px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 1rem;

  @media screen and (max-width: 480px) {
    margin-bottom: 0 !important;
  }
`

const Form = styled.form`
  padding: 0 5vw 0 5vw;
`

const ForPartContainer = styled.div``

const ForText = styled.p`
  margin-left: 1rem;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${primaryRed};
  font-style: italic;
  border: 3px solid rgb(117, 112, 112);
  border-radius: 1rem;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`

const ForTextContainer = styled.div`
  display: flex;

  svg {
    color: ${secondaryBlue};
    padding: 1rem;
    transition: all 0.7s ease;
    margin-top: 2.5rem;

    @media screen and (max-width: 480px) {
      margin-top: 3rem;
    }
  }

  svg:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: ${secondaryRed};
  }
`

const InputContainer = styled.div`
  display: inline-grid;
  margin: 1rem;
  line-height: 2.5rem;
`

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
`

const List = styled.ol``

const ListContainer = styled.div``

const NoData = styled.p`
  font-size: 2.5rem;
  margin: 3vw 0vw 2vw 0vw;
  font-style: italic;
  font-weight: 400;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`

const Option = styled.option`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  padding: 0;

  font-family: ${FontFamily};
  background-color: #fff;
  color: #000;
  font-size: 1.2rem;
  width: 25vw;
  max-width: 30vw;
  padding: 10px;
  border: 2px solid ${primaryBlue};
  border-radius: 4px;

  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;

  @media screen and (max-width: 480px) {
    width: 60vw;
    font-size: 1.1rem;
    max-width: 60vw;
  }

  :focus {
    border-color: ${primaryRed};
    box-shadow: 0 0 0 3px rgba(65, 157, 199, 0.5);
  }

  :hover {
    cursor: pointer;
  }

  ::-ms-expand {
    display: none;
  }
`

const SelectFirst = styled(Select)`
  width: 30vw;

  @media screen and (max-width: 480px) {
    width: 60vw;
  }
`

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 400;
  text-align: start;
  margin: 3vw 0.5vw 2vw 1vw;
  font-style: italic;
`
