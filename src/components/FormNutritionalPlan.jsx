import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Loader from './Loader'
import { FontFamily } from '../constants/Fonts'
import { MealComponent } from './MealComponent'
import { FetchPostData } from '../helpers/FetchPostData'
import { FetchGetData } from '../helpers/FetchGetData'

const {
  errorInput,
  primaryRed,
  primaryBlue,
  secondaryBlue,
  secondaryRed,
  success
} = Colors

const initialData = [
  {
    count: null,
    measure: null,
    meal: null,
    id: null
  }
]

export const FormNutritionalPlan = ({ users, dbLocal }) => {
  const [forData, setForData] = useState(null)
  const [errorFor, setErrorFor] = useState(null)
  const [dayData, setDayData] = useState(null)
  const [mealData, setMealData] = useState(null)
  const [count, setCount] = useState(null)
  const [measure, setMeasure] = useState(null)
  const [type, setType] = useState(null)
  const [breakfast, setBreakfast] = useState(initialData)
  const [lunch, setLunch] = useState(initialData)
  const [snack, setSnack] = useState(initialData)
  const [dinner, setDinner] = useState(initialData)
  const [afterDinner, setAfterDinner] = useState(initialData)
  const [preWorkout, setPreWorkout] = useState(initialData)
  const [postWorkout, setPostWorkout] = useState(initialData)
  const [collation, setCollation] = useState(initialData)
  const [errorsPlan, setErrorsPlan] = useState({})
  const [errorsMeal, setErrorsMeal] = useState({})
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay))
  }

  const clearFormMeal = () => {
    document.getElementById('countMeal').value = null
    document.getElementById('measureMeal').value = null
    document.getElementById('type').value = null

    setCount(null)
    setMeasure(null)
    setType(null)
  }

  const clearData = () => {
    setForData(null)
    setDayData(null)
    setMealData(null)

    setBreakfast(initialData)
    setLunch(initialData)
    setSnack(initialData)
    setDinner(initialData)
    setAfterDinner(initialData)
    setPreWorkout(initialData)
    setPostWorkout(initialData)
    setCollation(initialData)
  }

  const onValidateMeal = () => {
    let errorsForm = {}

    if (measure === null) {
      errorsForm.measure = 'Debe especificar tipo de medida.'
    }

    if (count === null) {
      errorsForm.count = 'Debe especificar cantidad.'
    }

    if (count <= 0 && count != null) {
      errorsForm.count = 'La cantidad debe ser mayor a 0.'
    }

    if (type === null || type === '') {
      errorsForm.type = 'Debe especificar tipo de comida.'
    }

    if (mealData === null) {
      errorsForm.mealData = 'Debe especificar comida.'
    }

    return errorsForm
  }

  const onValidatePlan = () => {
    let errorsForm = {}

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (dayData === null) {
      errorsForm.dayData = 'Debe especificar día de plan nutricional.'
    }

    if (
      breakfast[0].count === null &&
      lunch[0].count === null &&
      snack[0].count === null &&
      dinner[0].count === null &&
      afterDinner[0].count === null &&
      preWorkout[0].count === null &&
      postWorkout[0].count === null &&
      collation[0].count === null
    ) {
      errorsForm.planData = 'El plan nutricional esta vacio.'
    }

    return errorsForm
  }

  const handleFor = async (e) => {
    setForData(e.target.value)

    const user = await FetchGetData(
      `${process.env.REACT_APP_USER_WEIGHT_HEIGHT}?email=${e.target.value}`
    )
      .then((response) => response.json())
      .then()
      .catch((e) => {
        toast.error(e.messsage, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(250, 215, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })
      })

    if (user.weight === null || user.height === null) {
      setErrorFor(
        `${e.target.value} no ha completado su información adicional. No es posible agregar un plan nutricional al mismo.`
      )
    } else {
      setErrorFor(null)
    }
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

  const handleMeal = (e) => {
    setMealData(e.target.value)
  }

  const handleChangeMeal = () => {
    setMealData(null)
  }

  const handleMeasure = (e) => {
    setMeasure(e.target.value)
  }

  const handleCount = (e) => {
    setCount(e.target.value)
  }

  const handleType = (e) => {
    setType(e.target.value)
  }

  const editData = (el, data) => {
    deleteData(el.id, data)

    document.getElementById('countMeal').value = el.count
    document.getElementById('measureMeal').value = el.measure
    document.getElementById('type').value = el.meal

    setCount(el.count)
    setMeasure(el.measure)
    setType(el.meal)
    setMealData(null)
  }

  const deleteData = (id, data) => {
    let newData = data.filter((el) => el.id !== id)
    switch (data) {
      case breakfast:
        if (newData.length === 0) {
          setBreakfast(initialData)
        } else {
          setBreakfast(newData)
        }

        break
      case lunch:
        if (newData.length === 0) {
          setLunch(initialData)
        } else {
          setLunch(newData)
        }

        break
      case snack:
        if (newData.length === 0) {
          setSnack(initialData)
        } else {
          setSnack(newData)
        }

        break
      case dinner:
        if (newData.length === 0) {
          setDinner(initialData)
        } else {
          setDinner(newData)
        }

        break
      case afterDinner:
        if (newData.length === 0) {
          setAfterDinner(initialData)
        } else {
          setAfterDinner(newData)
        }

        break
      case preWorkout:
        if (newData.length === 0) {
          setPreWorkout(initialData)
        } else {
          setPreWorkout(newData)
        }

        break
      case postWorkout:
        if (newData.length === 0) {
          setPostWorkout(initialData)
        } else {
          setPostWorkout(newData)
        }

        break
      case collation:
        if (newData.length === 0) {
          setCollation(initialData)
        } else {
          setCollation(newData)
        }

        break
      default:
        break
    }
  }

  const handleAddMeal = () => {
    timeout(2000)

    const err = onValidateMeal()
    setErrorsMeal(err)

    if (Object.keys(err).length === 0) {
      switch (mealData) {
        case 'breakfast':
          const bData = {
            measure,
            count,
            meal: type,
            id: 'breakfast_' + Math.floor(Math.random() * 10000)
          }

          if (breakfast[0].count === null) {
            setBreakfast([bData])
          } else {
            setBreakfast(breakfast.concat(bData))
          }

          break
        case 'lunch':
          const lData = {
            measure,
            count,
            meal: type,
            id: 'lunch_' + Math.floor(Math.random() * 10000)
          }

          if (lunch[0].count === null) {
            setLunch([lData])
          } else {
            setLunch(lunch.concat(lData))
          }

          break
        case 'snack':
          const sData = {
            measure,
            count,
            meal: type,
            id: 'snack_' + Math.floor(Math.random() * 10000)
          }

          if (snack[0].count === null) {
            setSnack([sData])
          } else {
            setSnack(snack.concat(sData))
          }

          break
        case 'dinner':
          const dData = {
            measure,
            count,
            meal: type,
            id: 'dinner_' + Math.floor(Math.random() * 10000)
          }

          if (dinner[0].count === null) {
            setDinner([dData])
          } else {
            setDinner(dinner.concat(dData))
          }

          break
        case 'after-dinner':
          const aData = {
            measure,
            count,
            meal: type,
            id: 'after-dinner_' + Math.floor(Math.random() * 10000)
          }

          if (afterDinner[0].count === null) {
            setAfterDinner([aData])
          } else {
            setAfterDinner(afterDinner.concat(aData))
          }

          break
        case 'pre-workout':
          const preData = {
            measure,
            count,
            meal: type,
            id: 'pre-workout_' + Math.floor(Math.random() * 10000)
          }

          if (preWorkout[0].count === null) {
            setPreWorkout([preData])
          } else {
            setPreWorkout(preWorkout.concat(preData))
          }

          break
        case 'post-workout':
          const postData = {
            measure,
            count,
            meal: type,
            id: 'post-workout_' + Math.floor(Math.random() * 10000)
          }

          if (postWorkout[0].count === null) {
            setPostWorkout([postData])
          } else {
            setPostWorkout(postWorkout.concat(postData))
          }

          break
        case 'collation':
          const cData = {
            measure,
            count,
            meal: type,
            id: 'collation_' + Math.floor(Math.random() * 10000)
          }

          if (collation[0].count === null) {
            setCollation([cData])
          } else {
            setCollation(collation.concat(cData))
          }

          break
        default:
          break
      }

      clearFormMeal()
    }
  }

  const handleSubmitPlan = async (e) => {
    e.preventDefault()
    setLoading(true)

    const err = onValidatePlan()
    setErrorsPlan(err)

    if (Object.keys(err).length === 0 && errorFor === null) {
      const planDay = {
        email: forData,
        dayData,
        breakfast,
        lunch,
        snack,
        dinner,
        afterDinner,
        preWorkout,
        postWorkout,
        collation
      }

      //console.log({ planDay });

      const res = await FetchPostData({
        path: process.env.REACT_APP_CREATE_PLAN,
        data: { planDay }
      })

      if (!(res instanceof Error)) {
        const day = dbLocal.days.find((d) => d.value === dayData).day

        toast.success(
          `Plan nutricional enviado a ${forData} para el dia ${day}.`,
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

    setLoading(false)
  }

  useEffect(() => {
    let b = []
    let l = []
    let s = []
    let d = []
    let ad = []
    let pr = []
    let po = []
    let co = []

    if (forData === null || dayData === null) return

    if (forData !== null && dayData !== null) {
      FetchGetData(
        `${process.env.REACT_APP_USER_PLAN}?email=${forData}&day=${dayData}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setNoData(true)
          } else {
            setNoData(false)
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
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }, [forData, dayData])

  return (
    <Form onSubmit={handleSubmitPlan}>
      <ForPartContainer>
        {!forData ? (
          <InputContainer>
            <Label>Para:</Label>
            <SelectFirst onChange={handleFor}>
              <Option value="null">Seleccione un usuario</Option>
              {users !== null &&
                users.map((el, index) => (
                  <Option key={index} value={el.email}>
                    {el.username} {el.surname} - {el.email}
                  </Option>
                ))}
            </SelectFirst>
            {errorsPlan.forData && (
              <ErrorInput>{errorsPlan.forData}</ErrorInput>
            )}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>Plan nutricional para {forData}</ForText>
            <FaEdit size="1.5rem" onClick={handleChangeFor} />
          </ForTextContainer>
        )}
        {errorFor && <ErrorInput>{errorFor}</ErrorInput>}
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
            {errorsPlan.dayData && (
              <ErrorInput>{errorsPlan.dayData}</ErrorInput>
            )}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>
              Día: {dbLocal.days.find((el) => el.value === dayData).day}
            </ForText>
            <FaEdit size="1.5rem" onClick={handleChangeDay} />
          </ForTextContainer>
        )}
      </DayPartContainer>
      <MealPartContainer>
        {!mealData ? (
          <InputContainer>
            <Label>Comida:</Label>
            <SelectFirst onChange={handleMeal}>
              <Option value="null">Seleccione una comida</Option>
              {dbLocal.meals.map((el, index) => (
                <Option value={el.value} key={index}>
                  {el.meal}
                </Option>
              ))}
            </SelectFirst>
            {errorsPlan.mealData && (
              <ErrorInput>{errorsPlan.mealData}</ErrorInput>
            )}
            {errorsMeal.mealData && (
              <ErrorInput>{errorsMeal.mealData}</ErrorInput>
            )}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>
              Comida: {dbLocal.meals.find((el) => el.value === mealData).meal}
            </ForText>
            <FaEdit size="1.5rem" onClick={handleChangeMeal} />
          </ForTextContainer>
        )}
      </MealPartContainer>
      <DataContainer>
        <InputContainer>
          <Label>Cantidad</Label>
          <Input
            type="number"
            onChange={handleCount}
            id="countMeal"
            placeholder="Determine cantidad"
          />
          {errorsMeal.count && <ErrorInput>{errorsMeal.count}</ErrorInput>}
        </InputContainer>
        <InputContainer>
          <Label>Tipo de medida</Label>
          <Select onChange={handleMeasure} id="measureMeal">
            <Option value="null">Seleccione una medida</Option>
            <Option value="Unidades">Unidades</Option>
            <Option value="Gramos">Gramos</Option>
          </Select>
          {errorsMeal.measure && <ErrorInput>{errorsMeal.measure}</ErrorInput>}
        </InputContainer>
        <InputContainer>
          <Label>Tipo de comida</Label>
          <Input
            type="text"
            onChange={handleType}
            id="type"
            placeholder="Especifique qué tipo de comida consumirá"
          />
          {errorsMeal.type && <ErrorInput>{errorsMeal.type}</ErrorInput>}
        </InputContainer>
        <IoMdAddCircle
          fontSize="3.5rem"
          type="button"
          onClick={handleAddMeal}
        />
      </DataContainer>
      {breakfast[0].count !== null && (
        <MealContainer>
          <MealName>Desayuno:</MealName>
          <List>
            {breakfast.map((el) => (
              <MealComponent
                key={el.id}
                el={el}
                deleteData={deleteData}
                data={breakfast}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={lunch}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={snack}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={dinner}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={afterDinner}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={preWorkout}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={postWorkout}
                editData={editData}
                seeLogos={true}
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
                deleteData={deleteData}
                data={collation}
                editData={editData}
                seeLogos={true}
              />
            ))}
          </List>
        </MealContainer>
      )}
      {noData && (
        <TextNoData>
          Sin plan nutricional para el día{' '}
          {dbLocal.days.find((d) => d.value === dayData).day}.
        </TextNoData>
      )}
      {errorsPlan.planData && <ErrorInput>{errorsPlan.planData}</ErrorInput>}
      <ButtonSubmit type="submit">Enviar</ButtonSubmit>
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

const DataContainer = styled.div`
  svg {
    position: relative;
    top: 3.5vw;
    font-weight: 500;
    margin-left: 5vw;
    border: none;
    border-radius: 50px;
    color: ${success};
    transition: all 0.6s ease;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }
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
    line-height: 1rem;
    margin-top: 1rem;
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

const Input = styled.input`
  font-family: ${FontFamily};
  background-color: #fff;
  border: 2px solid ${primaryBlue};
  border-radius: 4px;
  color: #000;
  font-size: 1.2rem;
  padding: 10px;
  width: 23vw;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    width: 55vw;
  }

  :focus {
    border-color: ${primaryRed};
    box-shadow: 0 0 0 3px rgba(65, 157, 199, 0.5);
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

const MealPartContainer = styled.div``

const Option = styled.option`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: none;
  outline: none;
  padding: 0;

  font-family: ${FontFamily};
  background-color: #fff;
  color: #000;
  font-size: 1.2rem;
  width: 18vw;
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

const TextNoData = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  margin-top: 3vw;

  @media screen and (max-width: 1380px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`
