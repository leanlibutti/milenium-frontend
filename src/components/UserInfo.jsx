import { useState } from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import Modal from './Modal'
import { FormAditionalInfo } from './FormAditionalInfo'
import { FetchPutData } from '../helpers/FetchPutData'

const { primaryRed, secondaryBlue, secondaryRed } = Colors

export const UserInfo = ({ user }) => {
  const initialForm = {
    height: user.height,
    weight: user.weight,
    medication: user.medication,
    injuries: user.injuries,
    diseases: user.diseases
  }

  const [changeInfo, setChangeInfo] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [newMedication, setNewMedication] = useState(null)
  const [errorMedication, setErrorMedication] = useState(null)
  const [newMedications, setNewMedications] = useState(initialForm.medication)
  const [newInjury, setNewInjury] = useState(null)
  const [newTreatment, setNewTreatment] = useState(null)
  const [errorInjury, setErrorInjury] = useState({})
  const [newInjuries, setNewInjuries] = useState(initialForm.injuries)
  const [newDisease, setNewDisease] = useState(null)
  const [newMedicationDisease, setNewMedicationDisease] = useState(null)
  const [errorDisease, setErrorDisease] = useState({})
  const [newDiseases, setNewDiseases] = useState(initialForm.diseases)
  const [errors, setErrors] = useState({})

  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay))
  }

  const onValidateForm = () => {
    let errors = {}

    if (form.weight <= 0) {
      errors.weight = 'El valor debe ser mayor a 0.'
    }

    if (form.height <= 0) {
      errors.height = 'El valor debe ser mayor a 0.'
    }

    return errors
  }

  const onValidateMedication = () => {
    let errors = null

    if (newMedication === null) {
      errors = 'El campo no debe estar vacío.'
    }

    if (newMedications.includes(newMedication)) {
      errors = `El medicamento "${newMedication}" ya ha sido agregado.`
    }

    return errors
  }

  const onValidateInjury = () => {
    let errors = {}

    if (newInjury === null) {
      errors.injury = 'El campo no debe estar vacío.'
    }

    if (newInjuries.some((el) => el.injury === newInjury)) {
      errors.injury = `La lesión "${newInjury}" ya ha sido agregada.`
    }

    return errors
  }

  const onValidateDisease = () => {
    let errors = {}

    if (newDisease === null) {
      errors.disease = 'El campo no debe estar vacío.'
    }

    if (newDiseases.some((el) => el.disease === newDisease)) {
      errors.disease = `La enfermedad "${newDisease}" ya ha sido agregada.`
    }

    return errors
  }

  const handleModal = () => {
    setChangeInfo(!changeInfo)
    setForm(initialForm)
    setNewMedications(initialForm.medication)
    setErrorMedication(null)
    setNewInjuries(initialForm.injuries)
    setErrorInjury({})
    setNewDiseases(initialForm.diseases)
    setErrorDisease({})
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeMedication = (e) => {
    setNewMedication(e.target.value.toLowerCase())
  }

  const handleAddMedication = () => {
    timeout(2000)

    const err = onValidateMedication()
    setErrorMedication(err)

    if (err === null) {
      const m = newMedication
      setNewMedications(newMedications.concat(m))
    } else {
      /* console.log("Error medicamento"); */
    }

    document.getElementById('medication').value = null
    setNewMedication(null)
  }

  const deleteMedication = (med) => {
    let newData = newMedications.filter((el) => el !== med)
    setNewMedications(newData)
  }

  const handleChangeInjury = (e) => {
    setNewInjury(e.target.value.toLowerCase())
  }

  const handleChangeTreatment = (e) => {
    setNewTreatment(e.target.value.toLowerCase())
  }

  const handleAddInjury = () => {
    timeout(2000)

    const err = onValidateInjury()
    setErrorInjury(err)

    if (Object.keys(err).length === 0) {
      const i = { injury: newInjury, treatment: newTreatment }
      setNewInjuries(newInjuries.concat(i))
    } else {
      /* console.log("Error lesión"); */
    }

    document.getElementById('injury').value = null
    setNewInjury(null)
    document.getElementById('treatment').value = null
    setNewTreatment(null)
  }

  const deleteInjury = (i) => {
    let newData = newInjuries.filter((el) => el.injury !== i.injury)
    setNewInjuries(newData)
  }

  const handleChangeDisease = (e) => {
    setNewDisease(e.target.value.toLowerCase())
  }

  const handleChangeMedicationDisease = (e) => {
    setNewMedicationDisease(e.target.value)
  }

  const handleAddDisease = () => {
    timeout(2000)

    const err = onValidateDisease()
    setErrorDisease(err)

    if (Object.keys(err).length === 0) {
      const d = { disease: newDisease, medication: newMedicationDisease }
      setNewDiseases(newDiseases.concat(d))
    } else {
      /* console.log("Error enfermedad"); */
    }

    document.getElementById('disease').value = null
    setNewDisease(null)
    document.getElementById('medication-disease').value = null
    setNewMedicationDisease(null)
  }

  const deleteDisease = (d) => {
    /* console.log(newDiseases); */
    let newData = newDiseases.filter((el) => el.disease !== d.disease)
    setNewDiseases(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = onValidateForm()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      const data = {
        weight: form.weight,
        height: form.height,
        medications: newMedications,
        injuries: newInjuries,
        diseases: newDiseases
      }

      const res = await FetchPutData({
        path: process.env.REACT_APP_INFO_UPDATE,
        data: { user: data }
      })

      if (!(res instanceof Error)) {
        toast.success(`Guardando cambios...`, {
          position: 'top-right',
          duration: 6000,
          style: {
            background: 'rgba(215, 250, 215)',
            fontSize: '1rem',
            fontWeight: '500'
          }
        })

        setChangeInfo(!changeInfo)
        setTimeout(() => {
          window.location.reload()
        }, 500)
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
    <InfoContainer>
      <Modal
        state={changeInfo}
        setState={setChangeInfo}
        title="Cambiar información adicional"
      >
        <Content>
          <UploadInfoContainer>
            <FormAditionalInfo
              handleChange={handleChange}
              form={form}
              errors={errors}
              handleChangeMedication={handleChangeMedication}
              handleAddMedication={handleAddMedication}
              errorMedication={errorMedication}
              newMedications={newMedications}
              deleteMedication={deleteMedication}
              handleChangeInjury={handleChangeInjury}
              handleChangeTreatment={handleChangeTreatment}
              handleAddInjury={handleAddInjury}
              errorInjury={errorInjury}
              newInjuries={newInjuries}
              deleteInjury={deleteInjury}
              handleChangeDisease={handleChangeDisease}
              handleChangeMedicationDisease={handleChangeMedicationDisease}
              handleAddDisease={handleAddDisease}
              errorDisease={errorDisease}
              newDiseases={newDiseases}
              deleteDisease={deleteDisease}
              handleSubmit={handleSubmit}
            />
          </UploadInfoContainer>
        </Content>
      </Modal>
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
          <Text>{user.date}</Text>
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
        <AdInfoTitle>
          Información Adicional
          <FaEdit size="1.4rem" onClick={handleModal} />
        </AdInfoTitle>
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
          {user.medication.length > 0 ? (
            user.medication.map((el, index) => (
              <InfoItem key={index}>
                <TextMed>- {el}</TextMed>
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
                  {el.treatment ? `${el.treatment}` : 'Sin tratamiento'}
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
                    : 'Sin medicamento'}
                </TextMed>
              </InfoItem>
            ))
          ) : (
            <Text>Sin información</Text>
          )}
        </TextContainer>
      </SecondInfo>
      <Toaster />
    </InfoContainer>
  )
}

const AdInfoTitle = styled.h2`
  margin: 0 0 2vw 3vw;
  font-style: italic;
  color: ${secondaryBlue};
  text-decoration: underline;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FirstInfo = styled.div``

const InfoContainer = styled.div``

const InfoItem = styled.li`
  display: block;

  @media screen and (max-width: 480px) {
  }
`

const Label = styled.h3`
  margin-left: 5vw;
  margin-bottom: -0.5rem;
  font-style: italic;
  color: ${secondaryBlue};

  @media screen and (max-width: 480px) {
    margin-left: 8vw;
    margin-bottom: 1rem;
  }
`

const SecondInfo = styled.div``

const Text = styled.p`
  font-size: 1.3rem;
  padding: 1rem;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const TextContainer = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 40vw;
  margin-left: 5vw;
  margin-bottom: 2vw;
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

const UploadInfoContainer = styled.div`
  display: block;
`
