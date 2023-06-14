import { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { RiErrorWarningLine } from 'react-icons/ri'

import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'
import { FetchGetData } from '../helpers/FetchGetData'
import { Toaster, toast } from 'react-hot-toast'
import { FetchPostData } from '../helpers/FetchPostData'

const { secondaryBlue, primaryBlue, primaryRed } = Colors

export const DebtorsSection = ({ users }) => {
  const [debtorUsers, setDebtorUsers] = useState([])
  const [viewDebtors, setViewDebtors] = useState(false)

  const handleDebtors = () => {
    if (!viewDebtors) {
      const today = new Date()

      users.forEach(async (user) => {
        const nextPayment = await FetchGetData(
          `${process.env.REACT_APP_GET_NEXT_PAYMENT}?email=${user.email}`
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

        if (nextPayment !== null) {
          let userDate = new Date(
            nextPayment.year,
            nextPayment.month,
            nextPayment.day
          )

          if (userDate < today) {
            let newData = {
              username: user.username,
              surname: user.surname,
              email: user.email
            }

            setDebtorUsers((prevArray) => [...prevArray, newData])
          }
        }
      })

      setViewDebtors(true)
    } else {
      setDebtorUsers([])
      setViewDebtors(false)
    }
  }

  const handleReport = async (email) => {
    const res = await FetchPostData({
      path: process.env.REACT_APP_REPORT,
      data: { email }
    })

    if (!(res instanceof Error)) {
      toast.success(`Reporte enviado a ${email}.`, {
        position: 'top-right',
        duration: 6000,
        style: {
          background: 'rgba(215, 250, 215)',
          fontSize: '1rem',
          fontWeight: '500'
        }
      })

      let newDebtors = debtorUsers.filter((el) => el.email !== email)

      if (newDebtors.length === 0) {
        setViewDebtors(false)
      }

      setDebtorUsers(newDebtors)
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

  return (
    <>
      <ButtonDebtors type="button" onClick={handleDebtors}>
        Ver Deudores{' '}
        {viewDebtors ? (
          <AiOutlineArrowUp fontSize="2.5rem" />
        ) : (
          <AiOutlineArrowDown fontSize="2.5rem" />
        )}
      </ButtonDebtors>
      {debtorUsers.length > 0 && (
        <DebtorsResult>
          {debtorUsers.map((el, index) => (
            <DebtorItem key={index}>
              <DebtorInfo>
                {el.username} {el.surname} - {el.email}
              </DebtorInfo>
              <LogoContainer>
                <RiErrorWarningLine
                  fontSize="2.5rem"
                  onClick={() => handleReport(el.email)}
                />
                <Span className="tooltip">Enviar reporte a {el.email}</Span>
              </LogoContainer>
            </DebtorItem>
          ))}
        </DebtorsResult>
      )}
      <Toaster />
    </>
  )
}

const ButtonDebtors = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryRed};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 2rem;
  padding: 10px 20px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 90%;
  transition: all 0.5s ease-in-out;

  svg {
    position: relative;
    top: 0.5rem;

    @media screen and (max-width: 480px) {
      font-size: 2rem;
    }
  }

  :hover {
    cursor: pointer;
    background-color: ${primaryBlue};
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    width: 80%;
  }
`

const DebtorInfo = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${secondaryBlue};
`

const DebtorItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(255, 210, 210);
  margin: 2.5vw 5vw 0 5vw;
  padding: 0.5vw 2vw;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 3px 3px ${primaryRed};

  svg {
    position: relative;
    top: 0.8vw;
  }
`

const DebtorsResult = styled.div``

const LogoContainer = styled.div`
  color: rgb(255, 69, 0);

  svg {
    cursor: pointer;
    transition: all 0.6s ease;

    :hover {
      transform: scale(1.1);
    }
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    transform: translate(-2%, -75%);
    background-color: black;
    color: white;
    padding: 0.7rem;
    border-radius: 15px 15px 15px 0;
    font-size: 0.8rem;

    @media screen and (max-width: 1350px) {
      transform: translate(-120%, -90%);
      border-radius: 15px 15px 0 15px;
    }

    @media screen and (max-width: 480px) {
      transform: translate(-120%, -90%);
      border-radius: 15px 15px 0 15px;
    }
  }

  :hover .tooltip {
    visibility: visible;
  }
`

const Span = styled.span``
