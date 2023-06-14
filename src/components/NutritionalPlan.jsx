import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RiErrorWarningLine } from 'react-icons/ri'
import { BsArrowBarUp, BsArrowBarDown } from 'react-icons/bs'

import { getDayNow } from '../helpers/GetDay'
import { Colors } from '../constants/Colors'
import { UseIntersection } from '../helpers/UseIntersection'
import { FetchGetData } from '../helpers/FetchGetData'
import { toast, Toaster } from 'react-hot-toast'

const { primaryBlue, secondaryBlue, primaryRed } = Colors

async function getPlan() {
  return await FetchGetData(process.env.REACT_APP_GET_PLANS)
}

export const NutritionalPlan = ({ email, title, addInfo }) => {
  const [viewData, setViewData] = useState(true)
  const [plan, setPlan] = useState({})
  const [loading, setLoading] = useState(false)
  const day = getDayNow()

  const [planRef, isIntersecting] = UseIntersection({ threshold: 0.5 })

  useEffect(() => {
    setLoading(true)
    getPlan()
      .then((response) => response.json())
      .then((data) => {
        setPlan(data)
        setLoading(false)
      })
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
  }, [email])

  const handleView = () => {
    setViewData(!viewData)
  }

  return (
    <PlanContainer>
      <TitleContainer>
        <TextDiv>
          <Title>
            {viewData ? (
              <BsArrowBarUp onClick={handleView} />
            ) : (
              <BsArrowBarDown onClick={handleView} />
            )}{' '}
            {title}{' '}
          </Title>
        </TextDiv>
        {addInfo && (
          <LogoContainer>
            <RiErrorWarningLine className="report" />{' '}
            <Span className="tooltip">
              Debes completar tu información en "Mi Perfil"
            </Span>
          </LogoContainer>
        )}
      </TitleContainer>
      {loading && (
        <NoPlan>
          <i>Cargando plan nutricional....</i>
        </NoPlan>
      )}
      {viewData && Object.keys(plan).length !== 0 && (
        <PlanData
          ref={planRef}
          className={isIntersecting ? 'visible' : 'right'}
        >
          <PlanDay>
            {day === 1 ? (
              <DayWeekNow>
                Lunes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Lunes</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.monday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.monday.breakfast.length > 0 ? (
                  plan.monday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.monday.lunch.length > 0 ? (
                  plan.monday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.monday.snack.length > 0 ? (
                  plan.monday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.monday.dinner.length > 0 ? (
                  plan.monday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.monday.afterDinner.length > 0 ? (
                  plan.monday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.monday.preWorkout.length > 0 ? (
                  plan.monday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.monday.postWorkout.length > 0 ? (
                  plan.monday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.monday.collation.length > 0 ? (
                  plan.monday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 2 ? (
              <DayWeekNow>
                Martes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Martes</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.tuesday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.tuesday.breakfast.length > 0 ? (
                  plan.tuesday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.tuesday.lunch.length > 0 ? (
                  plan.tuesday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.tuesday.snack.length > 0 ? (
                  plan.tuesday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.tuesday.dinner.length > 0 ? (
                  plan.tuesday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.tuesday.afterDinner.length > 0 ? (
                  plan.tuesday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.tuesday.preWorkout.length > 0 ? (
                  plan.tuesday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.tuesday.postWorkout.length > 0 ? (
                  plan.tuesday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.tuesday.collation.length > 0 ? (
                  plan.tuesday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 3 ? (
              <DayWeekNow>
                Miércoles <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Miércoles</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.wednesday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.wednesday.breakfast.length > 0 ? (
                  plan.wednesday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.wednesday.lunch.length > 0 ? (
                  plan.wednesday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.wednesday.snack.length > 0 ? (
                  plan.wednesday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.wednesday.dinner.length > 0 ? (
                  plan.wednesday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.wednesday.afterDinner.length > 0 ? (
                  plan.wednesday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.wednesday.preWorkout.length > 0 ? (
                  plan.wednesday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.wednesday.postWorkout.length > 0 ? (
                  plan.wednesday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.wednesday.collation.length > 0 ? (
                  plan.wednesday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 4 ? (
              <DayWeekNow>
                Jueves <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Jueves</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.thursday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.thursday.breakfast.length > 0 ? (
                  plan.thursday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.thursday.lunch.length > 0 ? (
                  plan.thursday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.thursday.snack.length > 0 ? (
                  plan.thursday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.thursday.dinner.length > 0 ? (
                  plan.thursday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.thursday.afterDinner.length > 0 ? (
                  plan.thursday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.thursday.preWorkout.length > 0 ? (
                  plan.thursday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.thursday.postWorkout.length > 0 ? (
                  plan.thursday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.thursday.collation.length > 0 ? (
                  plan.thursday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 5 ? (
              <DayWeekNow>
                Viernes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Viernes</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.friday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.friday.breakfast.length > 0 ? (
                  plan.friday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.friday.lunch.length > 0 ? (
                  plan.friday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.friday.snack.length > 0 ? (
                  plan.friday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.friday.dinner.length > 0 ? (
                  plan.friday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.friday.afterDinner.length > 0 ? (
                  plan.friday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.friday.preWorkout.length > 0 ? (
                  plan.friday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.friday.postWorkout.length > 0 ? (
                  plan.friday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.friday.collation.length > 0 ? (
                  plan.friday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 6 ? (
              <DayWeekNow>
                Sábado <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Sábado</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.saturday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.saturday.breakfast.length > 0 ? (
                  plan.saturday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.saturday.lunch.length > 0 ? (
                  plan.saturday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.saturday.snack.length > 0 ? (
                  plan.saturday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.saturday.dinner.length > 0 ? (
                  plan.saturday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.saturday.afterDinner.length > 0 ? (
                  plan.saturday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.saturday.preWorkout.length > 0 ? (
                  plan.saturday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.saturday.postWorkout.length > 0 ? (
                  plan.saturday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.saturday.collation.length > 0 ? (
                  plan.saturday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
          <PlanDay>
            {day === 0 ? (
              <DayWeekNow>
                Domingo <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Domingo</DayWeek>
            )}
            <Hr />
            {Object.keys(plan.sunday).length !== 0 ? (
              <List>
                <TextMeal>Desayuno</TextMeal>
                {plan.sunday.breakfast.length > 0 ? (
                  plan.sunday.breakfast.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Almuerzo</TextMeal>
                {plan.sunday.lunch.length > 0 ? (
                  plan.sunday.lunch.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Merienda</TextMeal>
                {plan.sunday.snack.length > 0 ? (
                  plan.sunday.snack.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Cena</TextMeal>
                {plan.sunday.dinner.length > 0 ? (
                  plan.sunday.dinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-cena</TextMeal>
                {plan.sunday.afterDinner.length > 0 ? (
                  plan.sunday.afterDinner.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Pre-entreno</TextMeal>
                {plan.sunday.preWorkout.length > 0 ? (
                  plan.sunday.preWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Post-entreno</TextMeal>
                {plan.sunday.postWorkout.length > 0 ? (
                  plan.sunday.postWorkout.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
                <TextMeal>Colación</TextMeal>
                {plan.sunday.collation.length > 0 ? (
                  plan.sunday.collation.map((el, index) => (
                    <InfoItem key={index}>
                      {el.count} {el.measure} - {el.meal}
                    </InfoItem>
                  ))
                ) : (
                  <NoData>
                    <TextNoData>Sin Información.</TextNoData>
                  </NoData>
                )}
              </List>
            ) : (
              <NoData>
                <TextNoData>Sin Información.</TextNoData>
              </NoData>
            )}
          </PlanDay>
        </PlanData>
      )}{' '}
      {viewData && Object.keys(plan).length === 0 && (
        <NoPlan>Sin Información.</NoPlan>
      )}
      <Toaster />
    </PlanContainer>
  )
}

const DayWeek = styled.p`
  font-size: 2rem;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const DayWeekNow = styled(DayWeek)`
  color: ${primaryRed};
`

const Hr = styled.hr``

const InfoItem = styled.li`
  color: rgb(30, 30, 30);
  font-size: 1.4rem;
  line-height: 3rem;
  display: flex;
  margin-left: 1rem;

  @media screen and (max-width: 1380px) {
    font-size: 1.1rem;
  }
`

const List = styled.div``

const LogoContainer = styled.div`
  svg {
    cursor: pointer;
    transition: all 0.6s ease;

    :hover {
      transform: scale(1.1);
    }
  }

  .report {
    font-size: 2rem;
    margin-left: 5%;
    color: black;
    position: absolute;

    @media screen and (max-width: 480px) {
      margin-left: 5vw;
    }
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    transform: translate(42%, -110%);
    background-color: black;
    color: white;
    padding: 0.7rem;
    border-radius: 15px 15px 15px 0;
    font-size: 0.8rem;

    @media screen and (max-width: 1600px) {
      transform: translate(35%, -100%);
      width: max-content;
    }

    @media screen and (max-width: 1000px) {
      transform: translate(-90%, -150%);
      border-radius: 15px 15px 0 15px;
      font-size: 0.6rem;
    }

    @media screen and (max-width: 600px) {
      transform: translate(-125%, -140%);
      width: max-content;
    }
  }

  :hover .tooltip {
    visibility: visible;
  }
`

const NoData = styled.div`
  text-align: center;
  color: rgb(30, 30, 30);
  font-style: italic;
`

const NoPlan = styled.p`
  font-size: 2rem;
  margin-top: -2vw;
  padding-bottom: 2vw;

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`

const PlanContainer = styled.div`
  align-content: center;
  border-left: 4px solid ${primaryRed};
  margin: 5vw 2vw 5vw 5vw;

  @media screen and (max-width: 1380px) {
    margin: 10vw -2vw 5vw 1vw;
  }

  @media screen and (max-width: 480px) {
    margin: 10vw 3vw 5vw 1vw;
  }

  .visible {
    opacity: 1;
    transform: scale(1);
  }

  .right {
    transform: translateX(200px);
  }
`

const PlanData = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: -4vw 1vw 2vw 5vw;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1s ease-in-out;

  @media screen and (max-width: 1380px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0;
    margin: -1.5rem 1rem 2rem 1rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0;
    margin: -1.5rem 1rem 2rem 1rem;
  }
`

const PlanDay = styled.div`
  color: ${primaryBlue};
  width: auto;
  max-width: 30vw;
  padding: 1rem;
  margin: 2vw 1vw 2vw 1vw;
  text-align: left;
  box-shadow: 0px 0px 5px ${primaryBlue};
  border-radius: 10px;

  @media screen and (max-width: 1380px) {
    max-width: 70vw;
  }

  @media screen and (max-width: 480px) {
    max-width: 90vw;
    margin: 10vw -8vw 0.5vw 2vw;
    padding: 2vw;
  }
`

const Span = styled.span``

const TextMeal = styled.p`
  font-weight: bold;
  font-size: 1.4rem;

  @media screen and (max-width: 1380px) {
    font-size: 1.3rem;
  }
`

const TextDiv = styled.div``

const TextNoData = styled.p`
  font-size: 1.4rem;

  @media screen and (max-width: 1380px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const Title = styled.p`
  display: flex;
  font-size: 3rem;
  color: ${secondaryBlue};
  font-weight: bold;
  text-align: start;
  margin: 0 -1vw 5vw 10vw;

  svg {
    cursor: pointer;
    position: absolute;
    font-size: 3.5rem;
    left: 11vw;
    transition: all 0.5s ease-in-out;

    :hover {
      transform: scale(1.1);
    }

    @media screen and (max-width: 1380px) {
      font-size: 3.2rem;
      left: 5vw;
    }

    @media screen and (max-width: 850px) {
      font-size: 3.2rem;
      left: 8vw;
    }

    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
  }

  @media screen and (max-width: 1380px) {
    font-size: 2.8rem;
    margin-left: 13vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.9rem;
    margin-left: 18vw;
  }
`

const TitleContainer = styled.div`
  display: flex;
`

const Today = styled.i``
