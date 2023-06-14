import { useState } from 'react'
import styled from 'styled-components'
import { toast, Toaster } from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'
import { FetchPutData } from '../helpers/FetchPutData'
import { FetchPostData } from '../helpers/FetchPostData'

const initialData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const {
  colorText,
  primaryBlue,
  secondaryBlue,
  errorInput,
  primaryRed,
  secondaryRed
} = Colors

export const ChangePassword = ({ username, email }) => {
  const [dataUpdate, setDataUpdate] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [viewPassword, setViewPassword] = useState(false)

  const onValidate = () => {
    let errorsForm = {}

    if (dataUpdate.newPassword.length < 8) {
      errorsForm.newPassword = `La contraseña debe tener más de 8 caracteres.`
    }

    if (dataUpdate.newPassword !== dataUpdate.confirmPassword) {
      errorsForm.newPassword = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirmPassword = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataUpdate({ ...dataUpdate, [name]: value })
  }

  const handleBack = () => {
    window.location.href = `/usuario/${username}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = onValidate()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      const userChange = {
        currentPassword: dataUpdate.currentPassword,
        newPassword: dataUpdate.newPassword
      }

      const res = await FetchPutData({
        path: process.env.REACT_APP_SIGN_UP,
        data: { userChange }
      })

      if (res.value === 0 && !(res instanceof Error)) {
        toast.success(`Contraseña actualizada con exito.`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        setDataUpdate(initialData)

        const user = {
          email,
          password: userChange.newPassword
        }

        const resLogin = await FetchPostData({
          path: process.env.REACT_APP_LOGIN,
          data: { user }
        })

        if (!(resLogin instanceof Error)) {
          window.location.replace(`/`)
        } else {
          toast.error(resLogin.message, {
            position: 'top-right',
            duration: 6000,
            style: {
              background: 'rgba(250, 215, 215)',
              fontSize: '1rem',
              fontWeight: '500'
            }
          })
        }
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
    <FormContainer>
      <TitleReset>Cambiar Contraseña</TitleReset>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type={viewPassword ? 'text' : 'password'}
            placeholder="Contraseña actual"
            name="currentPassword"
            value={dataUpdate.currentPassword}
            onChange={handleChange}
          />
          <ViewPasswordButton
            type="button"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </ViewPasswordButton>
        </InputContainer>
        <InputContainer>
          <Input
            type={viewPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            name="newPassword"
            value={dataUpdate.newPassword}
            onChange={handleChange}
          />
          <ViewPasswordButton
            type="button"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </ViewPasswordButton>
        </InputContainer>
        {errors.newPassword && <ErrorInput>{errors.newPassword}</ErrorInput>}
        <InputContainer>
          <Input
            type={viewPassword ? 'text' : 'password'}
            placeholder="Confirma nueva contraseña"
            name="confirmPassword"
            value={dataUpdate.confirmPassword}
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
        <ButtonBack type="button" onClick={handleBack}>
          Volver
        </ButtonBack>
      </Form>
      <Toaster />
    </FormContainer>
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

const ButtonBack = styled(ButtonSend)`
  background-color: ${primaryRed};
  margin-top: 1.5rem;

  :hover {
    background-color: ${secondaryRed};
  }
`

const ErrorInput = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 0.5rem;
`

const Form = styled.form`
  display: grid;
`

const FormContainer = styled.div`
  border-radius: 5px;
  padding: 12vw 15vw 12vw 15vw;

  @media screen and (max-width: 480px) {
    padding: 20vw 8vw 20vw 8vw;
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
