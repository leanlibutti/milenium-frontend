import { useState } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Loader from './Loader'
import { FontFamily } from '../constants/Fonts'
import { MealComponent } from './MealComponent'
import { FetchGetData } from '../helpers/FetchGetData'
import { FetchDeleteData } from '../helpers/FetchDeleteData'

const { errorInput, primaryRed, primaryBlue, secondaryRed, secondaryBlue } =
  Colors

const initialData = [
  {
    count: null,
    measure: null,
    meal: null,
    id: null
  }
]

export const FormClearNutritionalPlan = ({ users, dbLocal }) => {
  const [forData, setForData] = useState(null)
  const [dayData, setDayData] = useState(null)
  const [errors, setErrors] = useState({})
  const [breakfast, setBreakfast] = useState(initialData)
  const [lunch, setLunch] = useState(initialData)
  const [snack, setSnack] = useState(initialData)
  const [dinner, setDinner] = useState(initialData)
  const [afterDinner, setAfterDinner] = useState(initialData)
  const [preWorkout, setPreWorkout] = useState(initialData)
  const [postWorkout, setPostWorkout] = useState(initialData)
  const [collation, setCollation] = useState(initialData)
  const [viewPlan, setViewPlan] = useState(false)
  const [loading, setLoading] = useState(false)

  const clearData = () => {
    setForData(null)
    setDayData(null)

    setBreakfast(initialData)
    setLunch(initialData)
    setSnack(initialData)
    setDinner(initialData)
    setAfterDinner(initialData)
    setPreWorkout(initialData)
    setPostWorkout(initialData)
    setCollation(initialData)
    setViewPlan(false)
  }

  const onValidate = () => {
    let errorsForm = {}

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (dayData === null) {
      errorsForm.dayData = 'Debe especificar día de plan nutricional.'
    }

    return errorsForm
  }

  const onValidateDelete = () => {
    let errorsForm = {}

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (dayData === null) {
      errorsForm.dayData = 'Debe especificar día de rutina.'
    }

    if (
      breakfast.length === 0 ||
      lunch.length === 0 ||
      snack.length === 0 ||
      dinner.length === 0
    ) {
      errorsForm.plan =
        'El plan nutricional esta vacio o no se ha buscado todavía.'
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

  const handleSeePlan = async () => {
    const err = onValidate()
    setErrors(err)
    setLoading(true)

    if (Object.keys(err).length === 0) {
      let b = []
      let l = []
      let s = []
      let d = []
      let ad = []
      let pr = []
      let po = []
      let co = []

      await FetchGetData(
        `${process.env.REACT_APP_USER_PLAN}?email=${forData}&day=${dayData}`
      )
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 423:
                throw new Error(
                  'El usuario no cuenta con plan nutricional para el día seleccionado.'
                )
                break

              default:
                break
            }
          }

          return response.json()
        })
        .then((data) => {
          if (data.breakfast.length > 0) {
            data.breakfast.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'breakfast_' + Math.floor(Math.random() * 10000)
              }
              b.push(m)
            })
          } else {
            b = initialData
          }

          setBreakfast(b)

          if (data.lunch.length > 0) {
            data.lunch.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'lunch_' + Math.floor(Math.random() * 10000)
              }
              l.push(m)
            })
          } else {
            l = initialData
          }

          setLunch(l)

          if (data.snack.length > 0) {
            data.snack.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'snack_' + Math.floor(Math.random() * 10000)
              }
              s.push(m)
            })
          } else {
            s = initialData
          }

          setSnack(s)

          if (data.dinner.length > 0) {
            data.dinner.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'dinner_' + Math.floor(Math.random() * 10000)
              }
              d.push(m)
            })
          } else {
            d = initialData
          }

          setDinner(d)

          if (data.afterDinner.length > 0) {
            data.afterDinner.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'after-dinner_' + Math.floor(Math.random() * 10000)
              }
              ad.push(m)
            })
          } else {
            ad = initialData
          }

          setAfterDinner(ad)

          if (data.preWorkout.length > 0) {
            data.preWorkout.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'pre-workout_' + Math.floor(Math.random() * 10000)
              }
              pr.push(m)
            })
          } else {
            pr = initialData
          }

          setPreWorkout(pr)

          if (data.postWorkout.length > 0) {
            data.postWorkout.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'post-workout_' + Math.floor(Math.random() * 10000)
              }
              po.push(m)
            })
          } else {
            po = initialData
          }

          setPostWorkout(po)

          if (data.collation.length > 0) {
            data.collation.forEach((el) => {
              const m = {
                measure: el.measure,
                count: el.count,
                meal: el.meal,
                id: 'collation_' + Math.floor(Math.random() * 10000)
              }
              co.push(m)
            })
          } else {
            co = initialData
          }

          setCollation(co)
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

      setViewPlan(true)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const err = onValidateDelete()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      const res = await FetchDeleteData({
        path: `${process.env.REACT_APP_USER_DELETE_PLAN}?email=${forData}&day=${dayData}`
      })

      if (!(res instanceof Error)) {
        toast.success(
          `Plan nutricional de ${forData} del dia ${
            dbLocal.days.find((d) => d.value === dayData).day
          } eliminado.`,
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

      setLoading(false)
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
      <ButtonSeeRoutine type="button" onClick={handleSeePlan}>
        Ver Plan Nutricional
      </ButtonSeeRoutine>
      {loading && <Loader />}
      {breakfast[0].count !== null && (
        <MealContainer>
          <MealName>Desayuno:</MealName>
          <List>
            {breakfast.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={breakfast}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {lunch[0].count !== null && (
        <MealContainer>
          <MealName>Almuerzo:</MealName>
          <List>
            {lunch.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={lunch}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {snack[0].count !== null && (
        <MealContainer>
          <MealName>Merienda:</MealName>
          <List>
            {snack.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={snack}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {dinner[0].count !== null && (
        <MealContainer>
          <MealName>Cena:</MealName>
          <List>
            {dinner.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={dinner}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {afterDinner[0].count !== null && (
        <MealContainer>
          <MealName>Post-cena:</MealName>
          <List>
            {afterDinner.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={afterDinner}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {preWorkout[0].count !== null && (
        <MealContainer>
          <MealName>Pre-entreno:</MealName>
          <List>
            {preWorkout.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={preWorkout}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {postWorkout[0].count !== null && (
        <MealContainer>
          <MealName>Post-entreno:</MealName>
          <List>
            {postWorkout.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={postWorkout}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {collation[0].count !== null && (
        <MealContainer>
          <MealName>Colación:</MealName>
          <List>
            {collation.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                data={collation}
                seeLogos={false}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {errors.plan && <ErrorInput>{errors.plan}</ErrorInput>}
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

  .lds-ring {
    margin-top: 1vw;
    left: 48%;
  }
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

const MealContainer = styled.div`
  margin-left: 3rem;
`

const MealName = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  font-style: italic;

  @media screen and (max-width: 480px) {
    margin-left: -5vw;
  }
`

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
