import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Loader from './Loader'
import { FontFamily } from '../constants/Fonts'
import { ExerciseComponent } from './ExerciseComponent'
import { FetchPostData } from '../helpers/FetchPostData'
import { FetchGetData } from '../helpers/FetchGetData'

const {
  errorInput,
  primaryRed,
  primaryBlue,
  secondaryRed,
  secondaryBlue,
  success
} = Colors

const FormRoutine = ({ users, dbLocal }) => {
  const [forData, setForData] = useState(null)
  const [errorFor, setErrorFor] = useState(null)
  const [dayData, setDayData] = useState(null)
  const [measure, setMeasure] = useState(null)
  const [series, setSeries] = useState(null)
  const [count, setCount] = useState(null)
  const [zone, setZone] = useState(null)
  const [typeExercise, setTypeExercise] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [rest, setRest] = useState(null)
  const [description, setDescription] = useState(null)
  const [exercises, setExercises] = useState([])
  const [errorsExercises, setErrorsExercises] = useState({})
  const [errorsRoutine, setErrorsRoutine] = useState({})
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)

  const seeLogos = true

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay))
  }

  const clearFormRoutine = () => {
    document.getElementById('seriesExercise').value = null
    document.getElementById('measureExercise').value = null
    document.getElementById('countExercise').value = null
    document.getElementById('zone').value = null
    document.getElementById('exercise').value = null
    document.getElementById('rest').value = null
    document.getElementById('description').value = null

    setSeries(null)
    setMeasure(null)
    setCount(null)
    setTypeExercise(null)
    setPhoto(null)
    setRest(null)
    setDescription(null)
  }

  const clearData = () => {
    setForData(null)
    setDayData(null)

    setExercises([])
  }

  const onValidateExercises = () => {
    let errorsForm = {}

    if (series === null) {
      errorsForm.series = 'Debe especificar series.'
    }

    if (series <= 0 && series != null) {
      errorsForm.series = 'El número de series debe ser mayor a 0.'
    }

    if (measure === null) {
      errorsForm.measure = 'Debe especificar tipo de medida.'
    }

    if (count === null) {
      errorsForm.count = 'Debe especificar cantidad.'
    }

    if (typeExercise === null) {
      errorsForm.typeExercise = 'Debe especificar tipo de ejercicio.'
    }

    return errorsForm
  }

  const onValidateRoutine = () => {
    let errorsForm = {}

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (dayData === null) {
      errorsForm.dayData = 'Debe especificar día de rutina.'
    }

    if (exercises.length === 0) {
      errorsForm.exercises = 'La rutina esta vacia.'
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
        `${e.target.value} no ha completado su información adicional. No es posible agregar una rutina al mismo.`
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

  const handleMeasure = (e) => {
    setMeasure(e.target.value)
  }

  const handleSeries = (e) => {
    setSeries(e.target.value)
  }

  const handleCount = (e) => {
    setCount(e.target.value)
  }

  const handleZone = (e) => {
    setZone(e.target.value)
    document.getElementById('exercise').value = null
  }

  const handleTypeExercise = (e) => {
    setTypeExercise(e.target.value)

    const p = dbLocal.exercises[zone].find(
      (ex) => ex.exercise === e.target.value
    ).photo
    setPhoto(p)
  }

  const handleRest = (e) => {
    setRest(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleAddExercise = () => {
    timeout(2000)

    const err = onValidateExercises()
    setErrorsExercises(err)

    if (Object.keys(err).length === 0) {
      const e = {
        series,
        measure,
        count,
        name: typeExercise,
        body_zone: zone,
        photo,
        rest,
        description,
        id: 'exercise_' + Math.floor(Math.random() * 10000)
      }
      setExercises(exercises.concat(e))
      clearFormRoutine()
    } else {
      /* console.log("Error ejercicio"); */
    }
  }

  const editData = (el) => {
    deleteData(el.id)

    document.getElementById('seriesExercise').value = el.series
    document.getElementById('measureExercise').value = el.measure
    document.getElementById('countExercise').value = el.count
    document.getElementById('zone').value = el.body_zone
    document.getElementById('exercise').value = el.name
    document.getElementById('rest').value = el.rest
    document.getElementById('description').value = el.description

    setSeries(el.series)
    setMeasure(el.measure)
    setCount(el.count)
    setTypeExercise(el.name)
    setRest(el.rest)
    setDescription(el.description)

    const p = dbLocal.exercises[zone].find(
      (ex) => ex.exercise === el.name
    ).photo
    setPhoto(p)
  }

  const deleteData = (id) => {
    let newData = exercises.filter((el) => el.id !== id)
    setExercises(newData)
  }

  const handleSubmitRoutine = async (e) => {
    e.preventDefault()
    setLoading(true)

    const err = onValidateRoutine()
    setErrorsRoutine(err)

    if (Object.keys(err).length === 0 && errorFor === null) {
      const routineDay = {
        user_email: forData,
        day_week: dayData,
        exercises_attributes: exercises
      }

      const res = await FetchPostData({
        path: process.env.REACT_APP_CREATE_ROUTINE,
        data: { routineDay }
      })

      if (!(res instanceof Error)) {
        const day = dbLocal.days.find((d) => d.value === dayData).day

        toast.success(`Rutina enviada a ${forData} para el dia ${day}.`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

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
    let ex = []

    if (forData === null || dayData === null) return

    if (forData !== null && dayData !== null) {
      FetchGetData(
        `${process.env.REACT_APP_USER_ROUTINE}?email=${forData}&day=${dayData}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setNoData(true)
          } else {
            setNoData(false)

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
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }, [forData, dayData])

  return (
    <Form onSubmit={handleSubmitRoutine}>
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
            {errorsRoutine.forData && (
              <ErrorInput>{errorsRoutine.forData}</ErrorInput>
            )}
          </InputContainer>
        ) : (
          <ForTextContainer>
            <ForText>Rutina para {forData}</ForText>
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
            {errorsRoutine.dayData && (
              <ErrorInput>{errorsRoutine.dayData}</ErrorInput>
            )}
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
      <DataContainer>
        <InputContainer>
          <Label>Series</Label>
          <Input
            type="number"
            onChange={handleSeries}
            id="seriesExercise"
            placeholder="Determine series"
          />
          {errorsExercises.series && (
            <ErrorInput>{errorsExercises.series}</ErrorInput>
          )}
        </InputContainer>
        <InputContainer>
          <Label>Cantidad</Label>
          <Input
            type="text"
            onChange={handleCount}
            id="countExercise"
            placeholder="Determine cantidad"
          />
          {errorsExercises.count && (
            <ErrorInput>{errorsExercises.count}</ErrorInput>
          )}
        </InputContainer>
        <InputContainer>
          <Label>Tipo de medida</Label>
          <Select onChange={handleMeasure} id="measureExercise">
            <Option value="null">Seleccione una medida</Option>
            <Option value="Repeticiones">Repeticiones</Option>
            <Option value="Segundos">Segundos</Option>
          </Select>
          {errorsExercises.measure && (
            <ErrorInput>{errorsExercises.measure}</ErrorInput>
          )}
        </InputContainer>
        <InputContainer>
          <Label>Zona del cuerpo</Label>
          <Select onChange={handleZone} id="zone">
            <Option value="null">Seleccione una zona</Option>
            {dbLocal.exercises.Zonas.map((el, index) => (
              <Option value={el} key={index}>
                {el}
              </Option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Ejercicio</Label>
          <Select onChange={handleTypeExercise} id="exercise">
            <Option value="null">Seleccione un ejercicio</Option>
            {zone &&
              dbLocal.exercises[zone].map((el, index) => (
                <Option value={el.exercise} key={index}>
                  {el.exercise}
                </Option>
              ))}
          </Select>
          {errorsExercises.typeExercise && (
            <ErrorInput>{errorsExercises.typeExercise}</ErrorInput>
          )}
        </InputContainer>
        <InputContainer>
          <Label>Descanso (En seg.)</Label>
          <Input
            type="number"
            onChange={handleRest}
            id="rest"
            placeholder="Determine tiempo de descanso"
          />
        </InputContainer>
        <InputContainer>
          <Label>Descripción</Label>
          <TextArea
            onChange={handleDescription}
            id="description"
            placeholder="Descripción adicional"
          />
        </InputContainer>
        <IoMdAddCircle
          fontSize="3.5rem"
          type="button"
          onClick={handleAddExercise}
          className="add-btn"
        />
      </DataContainer>
      {exercises && (
        <List>
          {exercises.map((el) => (
            <ExerciseComponent
              key={el.id}
              el={el}
              deleteData={deleteData}
              editData={editData}
              seeLogos={seeLogos}
            />
          ))}
        </List>
      )}
      {noData && (
        <TextNoData>
          Sin rutina para el día{' '}
          {dbLocal.days.find((d) => d.value === dayData).day}.
        </TextNoData>
      )}
      {errorsRoutine.exercises && (
        <ErrorInput>{errorsRoutine.exercises}</ErrorInput>
      )}
      {photo && (
        <PhotoExampleContainer>
          <ExerciseName>Foto ejercicio "{typeExercise}":</ExerciseName>
          <ExercisePhoto src={photo} />
        </PhotoExampleContainer>
      )}
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
  }
`

const ExerciseName = styled.p``

const ExercisePhoto = styled.img``

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
  width: 18vw;

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

const Option = styled.option`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const PhotoExampleContainer = styled.div``

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

const TextArea = styled.textarea`
  border: 2px solid ${primaryBlue};
  border-radius: 10px;
  box-shadow: none;
  font-family: ${FontFamily};
  font-size: 1.2rem;
  line-height: 1.5;
  height: 1.2vw;
  width: 18vw;
  padding: 10px;
  transition: border-color 0.3s ease-in-out;
  overflow-y: scroll;

  :focus {
    border-color: ${primaryRed};
    outline: none;
  }

  @media screen and (max-width: 480px) {
    height: 25vw;
    width: 55vw;
  }
`

const TextNoData = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;

  @media screen and (max-width: 1380px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

export default FormRoutine
