import styled from 'styled-components'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

import { Colors } from '../constants/Colors'

const { secondaryRed, backgroundSuccess, secondaryBlue } = Colors

export const ExerciseComponent = ({ el, deleteData, editData, seeLogos }) => {
  return (
    <ExerciseContainer>
      <ExerciseItem key={el.id}>
        {el.series} x {el.count} {el.measure} - {el.name} -{' '}
        {el.rest ? `${el.rest} seg. de descanso` : 'Sin descanso estipulado'} -{' '}
        {el.description ? `${el.description}` : 'Sin información adicional'}
      </ExerciseItem>
      <ExercisePhoto src={el.photo} />
      {seeLogos && (
        <IconsContainer>
          <FaEdit
            className="edit-logo"
            fontSize="1.3rem"
            onClick={() => editData(el)}
          />
          <FaTrashAlt
            className="delete-logo"
            fontSize="1.3rem"
            onClick={() => deleteData(el.id)}
          />
        </IconsContainer>
      )}
    </ExerciseContainer>
  )
}

const ExerciseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5vw 2vw 0.5vw 2vw;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: ${backgroundSuccess};
  box-shadow: 0px 0px 10px #ccc;

  @media screen and (max-width: 480px) {
    padding: 1.5vw;
    margin-left: -5vw;
  }

  .delete-logo {
    color: ${secondaryRed};
  }

  .edit-logo {
    color: ${secondaryBlue};
  }

  svg {
    @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
  }

  svg:hover {
    cursor: pointer;
  }
`

const ExerciseItem = styled.li`
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 60%;
  word-wrap: break-word;

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  ::marker {
    font-weight: bold;
    color: ${secondaryRed};
  }
`

const ExercisePhoto = styled.img`
  margin-left: 2vw;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px black;

  @media screen and (max-width: 480px) {
    height: 50px;
  }
`

const IconsContainer = styled.div`
  display: grid;
  margin-top: 1vw;
`
