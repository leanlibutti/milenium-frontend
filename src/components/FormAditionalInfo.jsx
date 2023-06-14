import styled from 'styled-components'
import { IoMdAddCircle } from 'react-icons/io'
import { FaTrashAlt } from 'react-icons/fa'

import { FontFamily } from '../constants/Fonts'
import { Colors } from '../constants/Colors'

const {
  primaryBlue,
  primaryRed,
  secondaryBlue,
  secondaryRed,
  success,
  errorInput,
  backgroundSuccess,
  colorText
} = Colors

export const FormAditionalInfo = ({
  handleChange,
  form,
  errors,
  handleChangeMedication,
  handleAddMedication,
  errorMedication,
  newMedications,
  deleteMedication,
  handleChangeInjury,
  handleChangeTreatment,
  handleAddInjury,
  errorInjury,
  newInjuries,
  deleteInjury,
  handleChangeDisease,
  handleChangeMedicationDisease,
  handleAddDisease,
  errorDisease,
  newDiseases,
  deleteDisease,
  handleSubmit
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FirstPart>
        <InputContainer>
          <LabelForm>Peso (Kg.)*</LabelForm>
          <InputForm
            type="number"
            name="weight"
            onChange={handleChange}
            value={form.weight ? form.weight : ''}
          />
          {errors.weight && (
            <ErrorInput className="error-input">{errors.weight}</ErrorInput>
          )}
        </InputContainer>
        <InputContainer>
          <LabelForm>Altura (Cm.)*</LabelForm>
          <InputForm
            type="number"
            name="height"
            onChange={handleChange}
            value={form.height ? form.height : ''}
          />
          {errors.height && (
            <ErrorInput className="error-input">{errors.height}</ErrorInput>
          )}
        </InputContainer>
      </FirstPart>
      <MedicationForm>
        <Title>Medicaciones</Title>
        <InputContainer>
          <InputForm
            type="text"
            name="medication"
            onChange={handleChangeMedication}
            placeholder="Ingrese nueva medicación"
            id="medication"
          />
          <IoMdAddCircle
            fontSize="3.5rem"
            type="button"
            onClick={handleAddMedication}
            className="add-btn add-info-form"
          />
        </InputContainer>
        {errorMedication && (
          <ErrorInput className="error-input">{errorMedication}</ErrorInput>
        )}
        {newMedications.length > 0 ? (
          <List>
            {newMedications.map((el, index) => (
              <MedicationContainer key={index}>
                <MedicationItem>{el}</MedicationItem>
                <FaTrashAlt
                  fontSize="1.1rem"
                  color={secondaryRed}
                  onClick={() => deleteMedication(el)}
                />
              </MedicationContainer>
            ))}
          </List>
        ) : (
          <NoData>Sin medicación.</NoData>
        )}
      </MedicationForm>
      <InjuriesForm>
        <Title>Lesiones</Title>
        <InputContainerTwo>
          <LabelForm>Lesión</LabelForm>
          <InputForm
            type="text"
            name="injury"
            onChange={handleChangeInjury}
            placeholder="Ingrese nueva lesión"
            id="injury"
          />
          {errorInjury.injury && (
            <ErrorInput className="error-input">
              {errorInjury.injury}
            </ErrorInput>
          )}
        </InputContainerTwo>
        <InputContainerTwo>
          <LabelForm>Tratamiento (Opcional)</LabelForm>
          <InputForm
            type="text"
            name="treatment"
            onChange={handleChangeTreatment}
            placeholder="Ingrese tratamiento"
            id="treatment"
          />
          {errorInjury.treatment && (
            <ErrorInput className="error-input">
              {errorInjury.treatment}
            </ErrorInput>
          )}
        </InputContainerTwo>
        <IoMdAddCircle
          fontSize="3.5rem"
          type="button"
          onClick={handleAddInjury}
          className="add-btn add-info-form"
        />
        {newInjuries.length > 0 ? (
          <List>
            {newInjuries.map((el, index) => (
              <InjuryContainer key={index}>
                <InjuryItem>
                  {el.injury} -{' '}
                  {el.treatment ? `${el.treatment}` : 'Sin tratamiento'}
                </InjuryItem>
                <FaTrashAlt
                  fontSize="1.1rem"
                  color={secondaryRed}
                  onClick={() => deleteInjury(el)}
                />
              </InjuryContainer>
            ))}
          </List>
        ) : (
          <NoData>Sin lesiones.</NoData>
        )}
      </InjuriesForm>
      <DiseasesForm>
        <Title>Enfermedades</Title>
        <InputContainerTwo>
          <LabelForm>Enfermedad</LabelForm>
          <InputForm
            type="text"
            name="disease"
            onChange={handleChangeDisease}
            placeholder="Ingrese nueva enfermedad"
            id="disease"
          />
          {errorDisease.disease && (
            <ErrorInput className="error-input">
              {errorDisease.disease}
            </ErrorInput>
          )}
        </InputContainerTwo>
        <InputContainerTwo>
          <LabelForm>Medicamento/s (Opcional)</LabelForm>
          <InputForm
            type="text"
            name="medication-disease"
            onChange={handleChangeMedicationDisease}
            placeholder="Ingrese medicamento"
            id="medication-disease"
          />
          {errorDisease.medication && (
            <ErrorInput className="error-input">
              {errorDisease.medication}
            </ErrorInput>
          )}
        </InputContainerTwo>
        <IoMdAddCircle
          fontSize="3.5rem"
          type="button"
          onClick={handleAddDisease}
          className="add-btn add-info-form"
        />
        {newDiseases.length > 0 ? (
          <List>
            {newDiseases.map((el, index) => (
              <DiseaseContainer key={index}>
                <DiseaseItem>
                  {el.disease} -{' '}
                  {el.medication ? `${el.medication}` : 'Sin tratamiento'}
                </DiseaseItem>
                <FaTrashAlt
                  fontSize="1.1rem"
                  color={secondaryRed}
                  onClick={() => deleteDisease(el)}
                />
              </DiseaseContainer>
            ))}
          </List>
        ) : (
          <NoData>Sin enfermedades.</NoData>
        )}
      </DiseasesForm>
      <ButtonSend type="submit">Guardar Cambios</ButtonSend>
    </Form>
  )
}

const ButtonSend = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  color: ${colorText};
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.7s ease-in-out;

  @media screen and (max-width: 480px) {
    font-size: 1.3rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`

const DiseasesForm = styled.div`
  input {
    width: 70%;
    margin-right: 3vw;

    @media screen and (max-width: 480px) {
      margin-bottom: -2vw;
    }
  }

  .add-info-form {
    position: relative;
    font-weight: 500;
    border: none;
    border-radius: 50px;
    color: ${success};
    transition: all 0.6s ease;
    top: -4.5vw;
    left: 27vw;

    :hover {
      cursor: pointer;
      opacity: 0.6;
    }

    @media screen and (max-width: 1380px) {
      top: -7vw;
      left: 40vw;
    }

    @media screen and (max-width: 1200px) {
      top: -8vw;
      left: 50vw;
    }

    @media screen and (max-width: 1050px) {
      top: -10vw;
      left: 60vw;
    }

    @media screen and (max-width: 800px) {
      top: -12vw;
      left: 75vw;
    }

    @media screen and (max-width: 480px) {
      top: -20vw;
      left: 65vw;
    }

    @media screen and (max-width: 400px) {
      top: -22vw;
      left: 65vw;
    }
  }

  .error-input {
    @media screen and (max-width: 480px) {
      margin-top: 4vw;
      margin-left: 1rem;
      margin-bottom: -5vw;
    }
  }

  h2 {
    @media screen and (max-width: 480px) {
      margin-bottom: -6vw;
    }
  }

  li {
    @media screen and (max-width: 400px) {
      font-size: 0.9rem;
    }
  }

  ol {
    margin-top: -1vw;

    @media screen and (max-width: 480px) {
      margin-top: -5vw;
    }
  }

  p {
    margin-top: -1vw;

    @media screen and (max-width: 480px) {
      margin-top: -6vw;
    }

    @media screen and (max-width: 400px) {
      margin-top: -10vw;
    }
  }
`

const DiseaseContainer = styled.div`
  display: flex;
  padding: 0.5vw 2vw 0.5vw 2vw;
  margin-bottom: 1rem;
  margin-left: -2vw;
  border-radius: 1rem;
  background-color: ${backgroundSuccess};
  box-shadow: 0px 0px 10px #ccc;
  width: 90%;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
    padding: 1.5vw 5vw 1.5vw 5vw;
    margin-left: -7vw;
    width: 90%;
  }

  svg {
    color: ${secondaryRed};

    @media screen and (max-width: 480px) {
      font-size: 1rem;
      padding-right: 2vw;
    }
  }

  svg:hover {
    cursor: pointer;
  }
`

const DiseaseItem = styled.div`
  font-size: 1.1rem;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  ::marker {
    font-weight: bold;
    color: ${secondaryRed};
  }
`

const ErrorInput = styled.div`
  font-size: 12px;
  color: ${errorInput};
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 2rem;
`

const FirstPart = styled.div`
  display: flex;
  justify-content: space-between;
`

const Form = styled.form`
  display: grid;
  margin: 1rem 0 0 1rem;
`

const InjuriesForm = styled(DiseasesForm)``

const InjuryContainer = styled(DiseaseContainer)``

const InjuryItem = styled(DiseaseItem)``

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

const InputContainer = styled.div`
  display: block;
  align-items: flex-start;

  .error-input {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  label {
    @media screen and (max-width: 480px) {
      margin-left: 0;
    }
  }

  svg {
    top: 1.2vw;

    @media screen and (max-width: 480px) {
      position: absolute;
      top: 9vw;
      left: 3vw;
    }

    @media screen and (max-width: 400px) {
      position: absolute;
      top: -16vw;
      left: 65vw;
    }
  }
`

const InputContainerTwo = styled(InputContainer)`
  display: grid;
  margin-bottom: -1vw;

  label {
    margin-top: 1vw;
    margin-bottom: 0;

    @media screen and (max-width: 480px) {
      margin-top: 10vw;
      margin-left: 0;
    }
  }
`

const InputForm = styled(Input)`
  width: 80%;
  margin-top: 0.5vw;
`

const LabelForm = styled.label`
  margin: 0 0 1vw 0;
  font-style: italic;
  color: ${secondaryBlue};

  @media screen and (max-width: 480px) {
    margin-left: 8vw;
    margin-bottom: 1rem;
  }
`

const List = styled.ol``

const MedicationContainer = styled(InjuryContainer)``

const MedicationItem = styled(InjuryItem)``

const MedicationForm = styled.div`
  .error-input {
    @media screen and (max-width: 480px) {
      margin-top: -2vw;
      margin-left: 1rem;
      margin-bottom: 0;
    }

    @media screen and (max-width: 400px) {
      margin-top: -20vw;
      margin-left: 1rem;
      margin-bottom: 20vw;
    }
  }

  h2 {
    @media screen and (max-width: 480px) {
      margin-bottom: -6vw;
    }

    @media screen and (max-width: 400px) {
      margin-bottom: 3vw;
    }
  }

  input {
    width: 70%;
    margin-right: 3vw;
  }

  li {
    @media screen and (max-width: 400px) {
      font-size: 0.9rem;
    }
  }

  ol {
    @media screen and (max-width: 400px) {
      margin-top: -15vw;
    }
  }

  svg {
    position: relative;
    font-weight: 500;
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

const NoData = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 500;

  @media screen and (max-width: 400px) {
    margin-top: -17vw;
  }
`

const Title = styled.h2`
  color: rgb(130, 130, 130);
  margin-bottom: 0;
`
