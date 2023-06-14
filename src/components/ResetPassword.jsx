import { useState } from 'react'
import styled from 'styled-components'
import { Toaster, toast } from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'

import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'
import { FetchPostData } from '../helpers/FetchPostData'

const initialData = {
  newPassword: '',
  confirmPassword: ''
}

const { colorText, primaryBlue, secondaryBlue, errorInput, backgroundText } =
  Colors

export const ResetPassword = () => {
  const [dataRecovery, setDataRecovery] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [viewPassword, setViewPassword] = useState(false)
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('reset_password_token')

  const onValidate = () => {
    let errorsForm = {}

    if (dataRecovery.newPassword.length < 8) {
      errorsForm.newPassword = `La contraseña debe tener más de 8 caracteres.`
    }

    if (dataRecovery.newPassword !== dataRecovery.confirmPassword) {
      errorsForm.newPassword = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirmPassword = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataRecovery({ ...dataRecovery, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = onValidate()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      const user = {
        reset_password_token: token,
        password: dataRecovery.newPassword,
        password_confirmation: dataRecovery.confirmPassword
      }

      const res = await FetchPostData({
        path: process.env.REACT_APP_RECOVER,
        data: { user }
      })

      if (!(res instanceof Error)) {
        toast.success(`Contraseña recuperada con exito.`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        setDataRecovery(initialData)

        setTimeout(() => {
          window.location.replace(`/`)
        }, 2000)
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
  }

  return (
    <Container>
      {token !== null ? (
        <FormContainer>
          <TitleReset>Recuperar Contraseña</TitleReset>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                type={viewPassword ? 'text' : 'password'}
                placeholder="Nueva contraseña"
                name="newPassword"
                value={dataRecovery.newPassword}
                onChange={handleChange}
              />
              <ViewPasswordButton
                type="button"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </ViewPasswordButton>
            </InputContainer>
            {errors.newPassword && (
              <ErrorInput>{errors.newPassword}</ErrorInput>
            )}
            <InputContainer>
              <Input
                type={viewPassword ? 'text' : 'password'}
                placeholder="Confirma nueva contraseña"
                name="confirmPassword"
                value={dataRecovery.confirmPassword}
                onChange={handleChange}
              />
              <ViewPasswordButton
                type="button"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </ViewPasswordButton>
            </InputContainer>

            {errors.confirmPassword && (
              <ErrorInput>{errors.confirmPassword}</ErrorInput>
            )}
            <ButtonSend type="submit">Enviar</ButtonSend>
          </Form>
          <Toaster />
        </FormContainer>
      ) : (
        <ErrorContainer>
          <TitleError>Algo ha salido mal.</TitleError>
          <Message>
            No hay un token de autenticación temporal en la URL. Intente hacer
            clic en el enlace de su correo electrónico de restablecimiento de
            contraseña nuevamente, o intente restablecer su contraseña
            nuevamente.
          </Message>
          <ButtonBack
            type="button"
            onClick={() => (window.location.href = '/')}
          >
            Volver al inicio
          </ButtonBack>
        </ErrorContainer>
      )}
    </Container>
  )
}

const ButtonSend = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  color: ${colorText};
  padding: 10px;
  margin: 10px;
  margin-top: 2rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 480px) {
    margin-top: 0;
    font-size: 1.3rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`

const ButtonBack = styled(ButtonSend)``

const Container = styled.div``

const ErrorContainer = styled.div`
  background-color: ${backgroundText};
  border-radius: 10px;
  padding: 5vw;
  margin: 15% 8vw;

  @media screen and (max-width: 1500px) {
    margin: 20vw 8vw 20vw 8vw;
  }

  @media screen and (max-width: 1300px) {
    margin: 20% 8vw;
  }

  @media screen and (max-width: 1100px) {
    margin: 30% 8vw;
  }

  @media screen and (max-width: 480px) {
    margin: 50% 8vw;
  }

  @media screen and (max-width: 380px) {
    margin: 20% 8vw;
  }
`

const ErrorInput = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-top: 5px;
  text-align: left;
  margin-left: 0.5rem;
`

const Form = styled.form`
  display: grid;
`

const FormContainer = styled.div`
  border-radius: 5px;
  padding: 13vw 15vw 13vw 15vw;

  @media screen and (max-width: 1900px) {
    padding: 17vw 8vw 17vw 8vw;
  }

  @media screen and (max-width: 1500px) {
    padding: 20vw 8vw 20vw 8vw;
  }

  @media screen and (max-width: 1300px) {
    padding: 23vw 8vw 23vw 8vw;
  }

  @media screen and (max-width: 1100px) {
    padding: 27vw 8vw 27vw 8vw;
  }

  @media screen and (max-width: 480px) {
    padding: 32vw 8vw 32vw 8vw;
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
  margin-bottom: 1rem;
  width: 100%;

  @media screen and (max-width: 480px) {
    margin-bottom: 8vw;
    margin-left: -2vw;
  }

  :focus {
    box-shadow: 0 0 0 3px rgba(65, 157, 199, 0.5);
  }
`

const InputContainer = styled.div`
  position: relative;
  right: 0.5rem;
  width: 100%;

  @media screen and (max-width: 480px) {
    right: 0;
  }
`

const Message = styled.p`
  font-size: 1.2rem;
`

const TitleError = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
`

const TitleReset = styled.h1`
  font-family: ${FontFamily};
  text-align: left;
  color: ${primaryBlue};

  @media screen and (max-width: 480px) {
    margin-bottom: 10vw;
  }
`

const ViewPasswordButton = styled.button`
  position: absolute;
  top: 40%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5rem;
  background-color: transparent;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    right: 0;
    top: 35%;
  }

  @media screen and (max-width: 380px) {
    right: -10px;
  }
`
