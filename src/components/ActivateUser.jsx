import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Loader from './Loader'
import { FontFamily } from '../constants/Fonts'
import { FetchPostData } from '../helpers/FetchPostData'

const { errorInput, primaryRed, primaryBlue, secondaryRed, secondaryBlue } =
  Colors

export const ActivateUser = ({ activeUsers, notActiveUsers }) => {
  const [forDataDesactivate, setForDataDesactivate] = useState(null)
  const [forDataActivate, setForDataActivate] = useState(null)
  const [errorsActivate, setErrorsActivate] = useState({})
  const [errorsDesactivate, setErrorsDesactivate] = useState({})
  const [loadingA, setLoadingA] = useState(false)
  const [loadingD, setLoadingD] = useState(false)

  const onValidateActivate = () => {
    let errors = {}

    if (forDataActivate === null) {
      errors.forData = 'Debe especificar usuario.'
    }

    return errors
  }

  const onValidateDesactivate = () => {
    let errors = {}

    if (forDataDesactivate === null) {
      errors.forData = 'Debe especificar usuario.'
    }

    return errors
  }

  const handleSubmitActivate = async (e) => {
    e.preventDefault()
    setLoadingA(true)

    const err = onValidateActivate()
    setErrorsActivate(err)

    if (Object.keys(err).length === 0) {
      const res = await FetchPostData({
        path: process.env.REACT_APP_USER_ACTIVATE,
        data: { email: forDataActivate }
      })

      if (!(res instanceof Error)) {
        toast.success(`${forDataActivate} fue dado de alta. Recargando...`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        setForDataActivate(null)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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

    setLoadingA(false)
  }

  const handleSubmitDesactivate = async (e) => {
    e.preventDefault()
    setLoadingD(true)

    const err = onValidateDesactivate()
    setErrorsDesactivate(err)

    if (Object.keys(err).length === 0) {
      const res = await FetchPostData({
        path: process.env.REACT_APP_USER_DESACTIVATE,
        data: { email: forDataDesactivate }
      })

      if (!(res instanceof Error)) {
        toast.success(`${forDataDesactivate} fue dado de baja. Recargando...`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        setForDataDesactivate(null)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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

    setLoadingD(false)
  }

  return (
    <FormsContainer>
      <FormActivateUser onSubmit={handleSubmitActivate}>
        <ForPartContainer>
          {!forDataActivate ? (
            <InputContainer>
              <Label>Para:</Label>
              <SelectFirst
                onChange={(e) => setForDataActivate(e.target.value)}
                id="for-data"
              >
                <Option value="null">Seleccione un usuario</Option>
                {notActiveUsers.map((el, index) => (
                  <Option key={index} value={el.email}>
                    {el.username} {el.surname} - {el.email}
                  </Option>
                ))}
              </SelectFirst>
              {errorsActivate.forData && (
                <ErrorInput>{errorsActivate.forData}</ErrorInput>
              )}
            </InputContainer>
          ) : (
            <ForTextContainer>
              <ForText>Cargar pago para {forDataActivate}</ForText>
              <FaEdit size="1.5rem" onClick={() => setForDataActivate(null)} />
            </ForTextContainer>
          )}
        </ForPartContainer>
        <ButtonContainer>
          <ButtonSend type="submit">Dar de Alta</ButtonSend>
          {loadingA && <Loader />}
        </ButtonContainer>
      </FormActivateUser>
      <FormNotActivateUser onSubmit={handleSubmitDesactivate}>
        <ForPartContainer>
          {!forDataDesactivate ? (
            <InputContainer>
              <Label>Para:</Label>
              <SelectFirst
                onChange={(e) => setForDataDesactivate(e.target.value)}
                id="for-data"
              >
                <Option value="null">Seleccione un usuario</Option>
                {activeUsers.map((el, index) => (
                  <Option key={index} value={el.email}>
                    {el.username} {el.surname} - {el.email}
                  </Option>
                ))}
              </SelectFirst>
              {errorsDesactivate.forData && (
                <ErrorInput>{errorsDesactivate.forData}</ErrorInput>
              )}
            </InputContainer>
          ) : (
            <ForTextContainer>
              <ForText>Cargar pago para {forDataDesactivate}</ForText>
              <FaEdit
                size="1.5rem"
                onClick={() => setForDataDesactivate(null)}
              />
            </ForTextContainer>
          )}
        </ForPartContainer>
        <ButtonContainer>
          <ButtonSend type="submit">Dar de Baja</ButtonSend>
          {loadingD && <Loader />}
        </ButtonContainer>
      </FormNotActivateUser>
      <Toaster />
    </FormsContainer>
  )
}

const ButtonContainer = styled.div`
  text-align: center;
`

const ButtonSend = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryRed};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 2rem;
  padding: 10px 20px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 90%;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${primaryBlue};
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

const FormActivateUser = styled.form`
  .lds-ring {
    margin-top: 1vw;
    left: 48%;
  }
`

const FormNotActivateUser = styled(FormActivateUser)``

const FormsContainer = styled.div``

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

  @media screen and (max-width: 480px) {
    margin-left: -5vw;
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
