import { useState } from 'react'
import styled from 'styled-components'
import { toast, Toaster } from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import Modal from './Modal'
import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'
import LoaderSignUp from './LoaderSignUp'
import { FetchPostData } from '../helpers/FetchPostData'

const { primaryBlue, primaryRed, secondaryBlue, colorText, errorInput } = Colors

const initialData = {
  name: '',
  surname: '',
  email: '',
  gender: '',
  date: '',
  password: '',
  confirmPassword: ''
}

export const SignUp = ({ setUser }) => {
  const [register, setRegister] = useState(false)
  const [dataRegister, setDataRegister] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)

  const onValidate = () => {
    let errorsForm = {}
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (!dataRegister.name.trim()) {
      errorsForm.name = `Este campo no debe ser vacío.`
    } else if (!regexName.test(dataRegister.name)) {
      errorsForm.name = 'Este campo solo acepta letras y espacios.'
    }

    if (!dataRegister.surname.trim()) {
      errorsForm.surname = `Este campo no debe ser vacío.`
    } else if (!regexName.test(dataRegister.surname)) {
      errorsForm.surname = 'Este campo solo acepta letras y espacios.'
    }

    if (!dataRegister.email.trim()) {
      errorsForm.email = `Este campo no debe ser vacío.`
    } else if (!regexEmail.test(dataRegister.email)) {
      errorsForm.email = 'Correo no válido.'
    }

    if (dataRegister.gender === '') {
      errorsForm.gender = `Este campo no debe ser vacío.`
    }

    if (!dataRegister.date.trim()) {
      errorsForm.date = `Este campo no debe ser vacío.`
    }

    if (dataRegister.password.length < 8) {
      errorsForm.password = `La contraseña debe tener más de 8 caracteres.`
    }

    if (dataRegister.password !== dataRegister.confirmPassword) {
      errorsForm.password = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirmPassword = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  const handleRegisterModal = () => {
    setRegister(!register)
    setErrors({})
    setDataRegister(initialData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataRegister({ ...dataRegister, [name]: value })
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()

    const err = onValidate()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      setLoading(true)
      const res = await FetchPostData({
        path: process.env.REACT_APP_SIGN_UP,
        data: { user: dataRegister }
      })

      if (!(res instanceof Error)) {
        toast.success(`Registro exitoso.`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })
        setUser(res)
        setDataRegister(initialData)
        setRegister(false)
        setLoading(false)
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
      <ButtonSignUp onClick={handleRegisterModal}>Registrarte</ButtonSignUp>
      <Modal state={register} setState={setRegister} title="Crear Cuenta">
        <Content>
          <FormContainer>
            <Form onSubmit={handleSubmitRegister}>
              <NameAndSurnameContainer>
                <InputContainer>
                  <InputName
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={dataRegister.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <ErrorInputNameSurname>{errors.name}</ErrorInputNameSurname>
                  )}
                </InputContainer>
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Ingrese su apellido"
                    name="surname"
                    value={dataRegister.surname}
                    onChange={handleChange}
                  />
                  {errors.surname && (
                    <ErrorInputNameSurname>
                      {errors.surname}
                    </ErrorInputNameSurname>
                  )}
                </InputContainer>
              </NameAndSurnameContainer>
              <InputContainer>
                <Input
                  type="email"
                  placeholder="Ingrese su email"
                  name="email"
                  value={dataRegister.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorInput>{errors.email}</ErrorInput>}
              </InputContainer>
              <InputRadioContainer>
                <Label>Sexo</Label>
                <LabelRadio htmlFor="male">
                  <Span>Masculino</Span>
                  <InputRadio
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleChange}
                    value="Masculino"
                  />
                </LabelRadio>
                <LabelRadio htmlFor="female">
                  <Span>Femenino</Span>
                  <InputRadio
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleChange}
                    value="Femenino"
                  />
                </LabelRadio>
                <LabelRadio htmlFor="other">
                  <Span>Otro</Span>
                  <InputRadio
                    type="radio"
                    id="other"
                    name="gender"
                    onChange={handleChange}
                    value="Otro"
                  />
                </LabelRadio>
              </InputRadioContainer>
              {errors.gender && <ErrorInput>{errors.gender}</ErrorInput>}
              <InputContainer>
                <Input
                  type="date"
                  placeholder="Ingrese su fecha de nacimiento"
                  name="date"
                  value={dataRegister.date}
                  onChange={handleChange}
                />
                {errors.date && <ErrorInput>{errors.date}</ErrorInput>}
              </InputContainer>
              <InputContainer>
                <InputContainerPassword>
                  <Input
                    type={viewPassword ? 'text' : 'password'}
                    placeholder="Ingrese su contraseña"
                    name="password"
                    value={dataRegister.passwordRegister}
                    onChange={handleChange}
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </ViewPasswordButton>
                </InputContainerPassword>
                {errors.password && <ErrorInput>{errors.password}</ErrorInput>}
              </InputContainer>
              <InputContainer>
                <InputContainerPassword>
                  <Input
                    type={viewPassword ? 'text' : 'password'}
                    placeholder="Confirme su contraseña"
                    name="confirmPassword"
                    value={dataRegister.confirmPassword}
                    onChange={handleChange}
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </ViewPasswordButton>
                </InputContainerPassword>
                {errors.confirmPassword && (
                  <ErrorInput>{errors.confirmPassword}</ErrorInput>
                )}
              </InputContainer>
              <ButtonSignUpModal>Registrarte</ButtonSignUpModal>
              {loading && <LoaderSignUp />}
            </Form>
          </FormContainer>
        </Content>
      </Modal>
      <Toaster />
    </FormContainer>
  )
}

const ButtonSignUp = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  color: ${colorText};
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.7s ease-in-out;

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }

  @media screen and (max-width: 480px) {
    width: 60vw;
    margin-top: 5vw;
    margin-left: 1.2rem;
  }
`

const ButtonSignUpModal = styled(ButtonSignUp)`
  @media screen and (max-width: 480px) {
    width: 70vw;
    margin-top: 2vh;
    margin-left: 1.2rem;
  }

  @media screen and (max-width: 400px) {
    margin-top: 1.5vh;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`

const ErrorInput = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 2rem;
`

const ErrorInputNameSurname = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 1rem;
`

const Form = styled.form`
  display: grid;
  margin-top: 1rem;

  .sign-up {
    left: 45%;
  }
`

const FormContainer = styled.div`
  display: block;
  text-align: center;
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
  width: 90%;

  :focus {
    border-color: ${primaryRed};
    box-shadow: 0 0 0 3px rgba(65, 157, 199, 0.5);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 2vh;
  }

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`

const InputRadio = styled.input`
  font-family: ${FontFamily};
  padding: 10px;
  margin-bottom: 1rem;
  width: 90%;

  :checked + span {
    color: ${primaryBlue};
  }

  :hover {
    cursor: pointer;
  }
`

const InputContainer = styled.div``

const InputContainerPassword = styled.div`
  position: relative;
  width: 100%;
`

const InputRadioContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`

const InputName = styled.input`
  font-family: ${FontFamily};
  margin-bottom: 1rem;
  margin-right: 1rem;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 4px;
  border: 2px solid ${primaryBlue};
  background-color: #fff;
  color: #000;

  @media screen and (max-width: 480px) {
    width: 30vw;
    margin-left: -0.6rem;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
  }
`

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 4rem 0 2rem;
  font-style: italic;
  color: ${secondaryBlue};

  @media screen and (max-width: 480px) {
    margin-left: 8vw;
    margin-bottom: 1rem;
  }
`

const LabelRadio = styled.div``

const NameAndSurnameContainer = styled.div`
  display: flex;
  margin-left: 0.9rem;
  margin-right: 0.9rem;
`

const Span = styled.span`
  font-weight: 500;
  color: rgb(130, 130, 130);
`

const ViewPasswordButton = styled.button`
  position: absolute;
  top: 40%;
  right: 20px;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5rem;
  background-color: transparent;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    right: 10px;
  }
`
