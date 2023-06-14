import { useState } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

import Loader from './Loader'
import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'
import { FetchPostData } from '../helpers/FetchPostData'
import { FetchGetData } from '../helpers/FetchGetData'

const { errorInput, primaryRed, primaryBlue, secondaryRed, secondaryBlue } =
  Colors

export const FormBill = ({ users, dbLocal }) => {
  const [forData, setForData] = useState(null)
  const [day, setDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const [mount, setMount] = useState(null)
  const [monthNext, setMonthNext] = useState(null)
  const [monthText, setMonthText] = useState(null)
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const getYearNow = () => {
    return new Date().getFullYear()
  }

  function getDayNow() {
    const now = new Date()
    return now.getDate()
  }

  function getMonthNow() {
    return new Date().getMonth()
  }

  const getMonthCustom = (month) => {
    // console.log(month)
    return dbLocal.months.find((m) => m.month === month).value
  }

  const clearForm = () => {
    document.getElementById('day').value = null
    document.getElementById('month').value = null
    document.getElementById('year').value = null
    document.getElementById('mount').value = null

    setForData(null)
    setDay(null)
    setMonth(null)
    setYear(null)
    setMount(null)
    setErrors({})
  }

  const onValidate = async () => {
    const errorsForm = {}

    const payment = await FetchGetData(
      `${process.env.REACT_APP_USER_PAYMENTS}?email=${forData}`
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

    if (getYearNow() === year) {
      if (getMonthNow() < month) {
        errorsForm.form = `La fecha determinada todavía no ha llegado (${day} de ${
          dbLocal.months.find((m) => m.value === month).month
        } del ${year})`
      }
      if (getMonthNow() === month) {
        if (getDayNow() < day) {
          errorsForm.form = `La fecha determinada todavía no ha llegado (${day} de ${
            dbLocal.months.find((m) => m.value === month).month
          } del ${year})`
        }
      }
    }

    if (forData !== null) {
      payment.forEach((p) => {
        if (p.month === month && p.year === year) {
          errorsForm.form = `Ya se ha agregado un pago para el mes ${
            dbLocal.months.find((m) => m.value === month).month
          } del año ${year} a ${forData}`
        }
      })
    }

    if (forData === null) {
      errorsForm.forData = 'Debe especificar destinatario.'
    }

    if (day === null) {
      errorsForm.day = 'Debe especificar día de pago realizado.'
    }

    if (month === null) {
      errorsForm.month = 'Debe especificar mes de pago realizado.'
    }

    if (year === null) {
      errorsForm.year = 'Debe especificar año de pago realizado.'
    }

    if (isNaN(mount)) {
      errorsForm.mount = 'Debe ingresar un monto válido.'
    }

    if (mount <= 0) {
      errorsForm.mount = 'El monto debe ser mayor 0.'
    }

    if (mount === null) {
      errorsForm.mount = 'Debe especificar monto de pago realizado.'
    }

    return errorsForm
  }

  const handleFor = async (e) => {
    setForData(e.target.value)
    const user = users.find((u) => u.email === e.target.value)

    setName(user.username)
    setSurname(user.surname)
  }

  const handleChangeFor = () => {
    setForData(null)
  }

  const handleDay = (e) => {
    setDay(parseInt(e.target.value))
  }

  const handleMonth = (e) => {
    const numberMonth = getMonthCustom(e.target.value)
    setMonth(numberMonth)
    setMonthText(e.target.value)

    if (e.target.value === 'Diciembre') {
      setMonthNext(0)
    } else {
      setMonthNext(numberMonth + 1)
    }
  }

  const handleYear = (e) => {
    setYear(parseInt(e.target.value))
  }

  const handleMount = (e) => {
    setMount(parseFloat(e.target.value.replace(',', '.')))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const err = await onValidate()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      let payment

      if (monthNext === 0) {
        payment = {
          forData,
          day,
          month,
          year,
          mount,
          dayNext: day,
          monthNext,
          yearNext: (parseInt(year) + 1).toString()
        }
      } else {
        payment = {
          forData,
          day,
          month,
          year,
          mount,
          dayNext: day,
          monthNext,
          yearNext: year
        }
      }

      // console.log(payment);

      const res = await FetchPostData({
        path: process.env.REACT_APP_CREATE_PAYMENT,
        data: { payment }
      })

      if (!(res instanceof Error)) {
        toast.success(`Pago enviado a ${forData}`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        clearForm()
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

  return (
    <FormAddBill onSubmit={handleSubmit}>
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
            <ForText>Cargar pago para {forData}</ForText>
            <FaEdit size="1.5rem" onClick={handleChangeFor} />
          </ForTextContainer>
        )}
      </ForPartContainer>
      <PaymentContainer>
        <DayContainer>
          <InputContainer>
            <Label>Día del pago</Label>
            <Select onChange={handleDay} id="day">
              <Option value="null">Seleccione día de pago realizado</Option>
              {[...Array(31).keys()].map((d, index) => (
                <Option value={d + 1} key={index}>
                  {d + 1}
                </Option>
              ))}
            </Select>
            {errors.day && <ErrorInput>{errors.day}</ErrorInput>}
          </InputContainer>
        </DayContainer>
        <MonthContainer>
          <InputContainer>
            <Label>Mes del pago</Label>
            <Select onChange={handleMonth} id="month">
              <Option value="null">Seleccione mes de pago realizado</Option>
              <Option value="Enero">Enero</Option>
              <Option value="Febrero">Febrero</Option>
              <Option value="Marzo">Marzo</Option>
              <Option value="Abril">Abril</Option>
              <Option value="Mayo">Mayo</Option>
              <Option value="Junio">Junio</Option>
              <Option value="Julio">Julio</Option>
              <Option value="Agosto">Agosto</Option>
              <Option value="Septiembre">Septiembre</Option>
              <Option value="Octubre">Octubre</Option>
              <Option value="Noviembre">Noviembre</Option>
              <Option value="Diciembre">Diciembre</Option>
            </Select>
            {errors.month && <ErrorInput>{errors.month}</ErrorInput>}
          </InputContainer>
        </MonthContainer>
        <YearContainer>
          <InputContainer>
            <Label>Año del pago</Label>
            <Select onChange={handleYear} id="year">
              <Option value="null">Seleccione año de pago realizado</Option>
              {[...Array(new Date().getFullYear() - 2010).keys()].map(
                (d, index) => (
                  <Option value={d + 2011} key={index}>
                    {d + 2011}
                  </Option>
                )
              )}
            </Select>
            {errors.year && <ErrorInput>{errors.year}</ErrorInput>}
          </InputContainer>
        </YearContainer>
        <MountContainer>
          <InputContainer>
            <Label>Monto del pago</Label>
            <Input
              type="text"
              placeholder="Especifique monto del pago"
              id="mount"
              onChange={handleMount}
            />
            {errors.mount && <ErrorInput>{errors.mount}</ErrorInput>}
          </InputContainer>
        </MountContainer>
        {errors.form && <ErrorInput>{errors.form}</ErrorInput>}
        <ButtonSend type="submit">Enviar</ButtonSend>
        {loading && <Loader />}
      </PaymentContainer>
      <Toaster />
    </FormAddBill>
  )
}

const ButtonPdf = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 2rem;
  padding: 10px 20px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 100%;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`

const ButtonSend = styled(ButtonPdf)`
  background-color: ${primaryRed};

  :hover {
    cursor: pointer;
    background-color: ${primaryBlue};
  }
`

const DayContainer = styled.div`
  display: inline-grid;
  margin: 1rem 1rem 1rem 0;

  @media screen and (max-width: 480px) {
    margin: 0 1rem 0 0;
  }
`

const ErrorInput = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 2rem;

  @media screen and (max-width: 480px) {
    margin-bottom: 0 !important;
    line-height: 1rem;
    margin-top: 1rem;
  }
`

const FormAddBill = styled.form`
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
  width: 15vw;

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

  @media screen and (max-width: 480px) {
    margin-left: -5vw;
  }
`

const MonthContainer = styled(DayContainer)``

const MountContainer = styled(DayContainer)``

const Option = styled.option`
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const PaymentContainer = styled.div``

const Pdf = styled.embed`
  width: 80vw;
  height: 40vw;
`

const PdfContainer = styled.div`
  text-align: center;
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
  width: 22vw;
  padding: 10px;
  border: 2px solid ${primaryBlue};
  border-radius: 4px;

  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;

  @media screen and (max-width: 480px) {
    width: 80vw;
    font-size: 1.1rem;
    margin-left: -5vw;
  }

  :focus {
    border-color: 2px solid ${primaryRed};
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
    width: 80vw;
  }
`

const YearContainer = styled(DayContainer)``
