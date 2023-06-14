import styled from 'styled-components'

import { Colors } from '../constants/Colors'

const { colorText, secondaryBlue } = Colors

const Modal = ({ children, state, setState, title }) => {
  return (
    <>
      {state && (
        <Overlay>
          <ModalContainer className="modal-container">
            <ModalHeader>
              <h3 className="modal-title">{title}</h3>
            </ModalHeader>

            <CloseButton
              className="modal-close-button"
              onClick={() => setState(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </>
  )
}

export default Modal

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  border: none;
  width: 50px;
  height: 50px;
  background: none;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: ${secondaryBlue};

  &:hover {
    background: rgba(210, 230, 250);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const ModalContainer = styled.div`
  min-height: 200px;
  max-height: 800px;
  background: ${colorText};
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  overflow-y: scroll;

  @media screen and (max-width: 480px) {
    width: 80%;
    position: absolute;
    max-height: 700px;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px groove ${colorText};

  h3 {
    margin-left: 1rem;
    font-weight: 500;
    font-size: 2rem;
    color: ${secondaryBlue};
    padding-top: 1rem;

    @media screen and (max-width: 480px) {
      font-size: 1.6rem;
    }
  }
`

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  @media screen and (max-width: 480px) {
    padding: 0;
  }

  @media screen and (max-width: 370px) {
    width: 103vw;
    height: 103vh;
  }
`
