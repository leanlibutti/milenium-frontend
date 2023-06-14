import { useState, useLayoutEffect, useEffect } from 'react'
import styled from 'styled-components'
import { toast, Toaster } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import { FormBill } from './FormBill'
import { FormNutritionalPlan } from './FormNutritionalPlan'
import FormRoutine from './FormRoutine'
import { SeeUser } from './SeeUser'
import { FetchGetData } from '../helpers/FetchGetData'
import { DebtorsSection } from './DebtorsSection'
import { FormClearRoutine } from './FormClearRoutine'
import { FormClearNutritionalPlan } from './FormClearNutritionalPlan'
import { ActivateUser } from './ActivateUser'

const { secondaryBlue, backgroundText } = Colors

async function getUsers() {
  return await FetchGetData(process.env.REACT_APP_ADMIN_USER)
}

export const AdminPage = ({ dbLocal }) => {
  const [users, setUsers] = useState(null)
  const [activeUsers, setActiveUsers] = useState([])
  const [notActiveUsers, setNotActiveUsers] = useState([])

  useLayoutEffect(() => {
    getUsers()
      .then((response) => response.json())
      .then((data) => setUsers(data))
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
  }, [])

  useEffect(() => {
    if (users !== null) {
      setActiveUsers(users.filter((user) => user.active))
      setNotActiveUsers(users.filter((user) => !user.active))
    }
  }, [users])

  return (
    <AdminContainer>
      <AddRoutineContainer>
        <Title>Agregar rutina</Title>
        <FormRoutine users={activeUsers} dbLocal={dbLocal} />
      </AddRoutineContainer>
      <Hr />
      <ClearRoutineContainer>
        <Title>Borrar rutina</Title>
        <FormClearRoutine users={activeUsers} dbLocal={dbLocal} />
      </ClearRoutineContainer>
      <Hr />
      <AddNutritionalPlan>
        <Title>Agregar plan nutricional</Title>
        <FormNutritionalPlan users={activeUsers} dbLocal={dbLocal} />
      </AddNutritionalPlan>
      <Hr />
      <ClearPlanContainer>
        <Title>Borrar plan nutricional</Title>
        <FormClearNutritionalPlan users={activeUsers} dbLocal={dbLocal} />
      </ClearPlanContainer>
      <BillSection>
        <Title>Agregar pago</Title>
        <FormBill users={activeUsers} dbLocal={dbLocal} />
      </BillSection>
      <SeeUserSection>
        <Title>Ver detalles de usuario</Title>
        <SeeUser users={activeUsers} />
      </SeeUserSection>
      <DebtorsContainer>
        <Title>Reportar deudores</Title>
        <DebtorsSection users={activeUsers} />
      </DebtorsContainer>
      <ActivateContainer>
        <Title>Dar de baja/alta a usuario</Title>
        <ActivateUser
          activeUsers={activeUsers}
          notActiveUsers={notActiveUsers}
        />
      </ActivateContainer>
      <Toaster />
    </AdminContainer>
  )
}

const AdminContainer = styled.div``

const ActivateContainer = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 1rem 3rem 1rem;
  margin: 3vw 3vw 3vw 3vw;
  border-radius: 1rem;

  @media (max-width: 480px) {
    margin: 7vw 4vw 7vw 4vw;
  }
`

const AddRoutineContainer = styled(ActivateContainer)``

const ClearPlanContainer = styled(AddRoutineContainer)``

const ClearRoutineContainer = styled(AddRoutineContainer)``

const AddNutritionalPlan = styled(AddRoutineContainer)``

const BillSection = styled(AddRoutineContainer)``

const DebtorsContainer = styled(AddRoutineContainer)`
  text-align: center;

  p {
    text-align: start;
  }
`

const Hr = styled.hr`
  background-color: ${backgroundText};
  border: 0;
  height: 0.1rem;
  width: 90%;
  border-radius: 100px;
`

const SeeUserSection = styled(AddRoutineContainer)``

const Title = styled.p`
  font-size: 2.1rem;
  font-weight: 500;
  color: ${secondaryBlue};
  margin-left: 1vw;
  border-radius: 1rem;
`
