import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineArrowUp } from 'react-icons/ai'

import homeHour from '../assets/home-hour.gif'
import homeSlogan from '../assets/home-slogan.gif'
import homeInfo from '../assets/home-info.gif'
import { NutritionalPlan } from './NutritionalPlan'
import { Routine } from './Routine'
import { Colors } from '../constants/Colors'
import { FetchGetData } from '../helpers/FetchGetData'
import { toast, Toaster } from 'react-hot-toast'
import { Carousel } from './Carousel'

const { secondaryBlue, secondaryRed } = Colors

async function getNextPayment() {
  return await FetchGetData(process.env.REACT_APP_CURRENT_USER_NEXT_PAYMENT)
}

export const Home = ({ months, weight, height }) => {
  const [nextPayment, setNextPayment] = useState(null)
  const [debtor, setDebtor] = useState(false)
  const [addInfo, setAddInfo] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  const images = [homeHour, homeInfo, homeSlogan]

  const handleNavigation = (scroll) => {
    const $scrollBtn = document.querySelector('.scroll-top-btn')

    if ($scrollBtn !== null) {
      if (scroll > 2000) {
        if ($scrollBtn.classList.contains('hidden')) {
          $scrollBtn.classList.remove('hidden')
        }
      } else {
        if (!$scrollBtn.classList.contains('hidden')) {
          $scrollBtn.classList.add('hidden')
        }
      }
    }
  }

  useEffect(() => {
    getNextPayment()
      .then((response) => response.json())
      .then((data) => setNextPayment(data))
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
    const onScroll = (event) => {
      setScrollTop(event.target.documentElement.scrollTop)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => handleNavigation(scrollTop))

    return () => {
      window.removeEventListener('scroll', () => handleNavigation(scrollTop))
    }
  }, [scrollTop])

  useEffect(() => {
    if (nextPayment !== null && nextPayment !== undefined) {
      if (nextPayment.payment !== null && nextPayment.payment !== undefined) {
        let today = new Date()

        let userDate = new Date(
          nextPayment.payment.yearNext,
          nextPayment.payment.monthNext,
          nextPayment.payment.dayNext
        )

        if (userDate < today) {
          setDebtor(true)
        }
      }
    }

    if (weight === null || height === null) {
      setAddInfo(true)
    }
  }, [nextPayment, weight, height])

  const handleClickScroll = () => {
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HomeContainer>
      <BannerContainer>
        <Carousel images={images} />
      </BannerContainer>
      {debtor && (
        <ReportPaymentContainer>
          <MessageDebtor>
            ¡Tienes un pago atrasado del día {nextPayment.payment.dayNext} de{' '}
            {
              months.find((m) => m.value === nextPayment.payment.monthNext)
                .month
            }{' '}
            del año {nextPayment.payment.yearNext}!
          </MessageDebtor>
        </ReportPaymentContainer>
      )}
      <RutineContainer>
        <Routine title="Mis Rutinas" addInfo={addInfo} />
      </RutineContainer>
      <Hr />
      <NutritionalPlanContainer>
        <NutritionalPlan title="Mi Plan Nutricional" addInfo={addInfo} />
      </NutritionalPlanContainer>
      <ButtonUp onClick={handleClickScroll} className="scroll-top-btn hidden">
        <AiOutlineArrowUp />
      </ButtonUp>
      <Toaster />
    </HomeContainer>
  )
}

const Banner = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 5px 5px 5px #ccc;
`

const BannerContainer = styled.div`
  margin: 2vw 0vw 3vw 0vw;
  text-align: center;
`

const ButtonUp = styled.button`
  position: fixed;
  z-index: 999;
  margin-bottom: 5vw;
  bottom: 0vh;
  right: calc(4.25rem + 1vw);
  font-size: 2.5rem;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: none;
  background-color: ${secondaryBlue};
  transition: all 0.3s ease-out;

  svg {
    color: #fff;
    margin: 0.6vw 0.5vw 0.5vw 0.5vw;

    @media screen and (max-width: 480px) {
      margin: 1vw;
    }
  }

  :hover {
    background-color: ${secondaryRed};
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 50px;
    bottom: -5vh;
    right: calc(2rem + 1vw);
    font-size: 2.5rem;
  }
`

const HomeContainer = styled.div`
  overflow-x: hidden;

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
`

const Hr = styled.hr`
  width: 95%;
  border: none;
  border-top: 1px solid #ccc;
  height: 1px;
  background: linear-gradient(to right, #ccc, #333, #ccc);

  @media screen and (max-width: 480px) {
    width: 85%;
  }
`

const MessageDebtor = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1vw 1vw;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    margin: 1vw 5vw;
  }
`

const NutritionalPlanContainer = styled.div`
  text-align: center;

  @media screen and (max-width: 1050px) {
    margin: 0vw 4vw 5vw 4vw;
  }
`

const ReportPaymentContainer = styled.div`
  background-color: #ffc107;
  color: black;
  text-align: center;
  padding: 0.5vw;

  @media screen and (max-width: 480px) {
    margin-bottom: 0;
  }
`

const RutineContainer = styled.div`
  text-align: center;

  @media screen and (max-width: 1050px) {
    margin: 4vw 4vw 2vw 4vw;
  }

  @media screen and (max-width: 900px) {
    margin: 8vw 4vw 5vw 4vw;
  }
`
