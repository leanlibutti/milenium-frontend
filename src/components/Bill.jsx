import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Toaster, toast } from 'react-hot-toast'

import { Colors } from '../constants/Colors'
import { BillItem } from './BillItem'
import { FetchGetData } from '../helpers/FetchGetData'

const { primaryRed, primaryBlue, secondaryBlue, secondaryRed } = Colors

async function getPayment() {
  return await FetchGetData(process.env.REACT_APP_GET_PAYMENTS)
}

export const Bill = ({ user, months }) => {
  const [payment, setPayment] = useState(null)

  useEffect(() => {
    getPayment()
      .then((response) => response.json())
      .then((data) => setPayment(data))
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
  }, [user])

  return (
    <BillContainer>
      <NextPaymentContainer>
        <NoticeTitleNext>Próximo Pago:</NoticeTitleNext>
        {payment !== null && payment.payment !== null ? (
          <Notice>
            El próximo pago deberá realizarse el día{' '}
            {payment.payment.nextPayment.day} de{' '}
            {
              months.find((m) => m.value === payment.payment.nextPayment.month)
                .month
            }{' '}
            del año {payment.payment.nextPayment.year}.
          </Notice>
        ) : (
          <NoData>Sin información.</NoData>
        )}
      </NextPaymentContainer>
      <PaymentsContainer>
        <NoticeTitlePayment>Pagos realizados:</NoticeTitlePayment>
        {payment !== null && payment.payment !== null ? (
          payment.payment.payments.map((el, index) => (
            <BillItem key={index} bill={el} user={user} months={months} />
          ))
        ) : (
          <NoData>Sin pagos disponibles.</NoData>
        )}
      </PaymentsContainer>
      <Toaster />
    </BillContainer>
  )
}

const BillContainer = styled.div``

const NextPaymentContainer = styled.div`
  margin: 7vw 12vw 7vw 12vw;
  padding: 2vw;
  border-radius: 2rem;
  box-shadow: 0 0 10px ${secondaryRed};

  @media screen and (max-width: 480px) {
    padding: 5vw;
    margin: 17vw 5vw 17vw 5vw;
  }
`

const NoData = styled.p`
  margin-top: 2rem;
  margin-left: 4vw;
  font-size: 1.3rem;
  font-style: italic;
`

const NoticeTitleNext = styled.p`
  color: ${primaryRed};
  font-size: 2rem;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const Notice = styled.p`
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-left: 4vw;
  font-style: italic;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const NoticeTitlePayment = styled(NoticeTitleNext)`
  color: ${primaryBlue};
`

const PaymentsContainer = styled(NextPaymentContainer)`
  box-shadow: 0 0 10px ${secondaryBlue};
`
