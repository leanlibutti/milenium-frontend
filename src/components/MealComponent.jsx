import styled from 'styled-components'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

import { Colors } from '../constants/Colors'

const { secondaryRed, backgroundSuccess, secondaryBlue } = Colors

export const MealComponent = ({ el, deleteData, data, editData, seeLogos }) => {
  return (
    <MealContainer>
      <MealItem key={el.id}>
        {el.count} {el.measure} - {el.meal}
      </MealItem>
      {seeLogos && (
        <IconsContainer>
          <FaEdit
            className="edit-logo"
            fontSize="1.3rem"
            onClick={() => editData(el, data)}
          />
          <FaTrashAlt
            className="delete-logo"
            fontSize="1.3rem"
            onClick={() => deleteData(el.id, data)}
          />
        </IconsContainer>
      )}
    </MealContainer>
  )
}

const IconsContainer = styled.div`
  display: grid;
`

const MealContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5vw 2vw 0.5vw 2vw;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: ${backgroundSuccess};
  box-shadow: 0px 0px 10px #ccc;
  width: 70%;

  @media screen and (max-width: 480px) {
    padding: 1.5vw;
    margin-left: -5vw;
  }

  .delete-logo {
    color: ${secondaryRed};
  }

  .edit-logo {
    color: ${secondaryBlue};
    margin-bottom: 1vw;
  }

  svg {
    @media screen and (max-width: 480px) {
      font-size: 1rem;
      padding-left: 15vw;
      padding-right: 2vw;
    }
  }

  svg:hover {
    cursor: pointer;
  }
`

const MealItem = styled.li`
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
