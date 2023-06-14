import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RiErrorWarningLine } from 'react-icons/ri'
import { BsArrowBarUp, BsArrowBarDown } from 'react-icons/bs'
import { toast, Toaster } from 'react-hot-toast'

import { getDayNow } from '../helpers/GetDay'
import { Colors } from '../constants/Colors'
import { UseIntersection } from '../helpers/UseIntersection'
import { FetchGetData } from '../helpers/FetchGetData'

const { primaryRed, primaryBlue, secondaryBlue } = Colors

async function getRoutine() {
  return await FetchGetData(process.env.REACT_APP_GET_ROUTINES)
}

export const Routine = ({ email, title, addInfo }) => {
  const [viewData, setViewData] = useState(true)
  const [routine, setRoutine] = useState({})
  const [loading, setLoading] = useState(false)
  const day = getDayNow()

  const [routineRef, isIntersecting] = UseIntersection({ threshold: 0.5 })

  useEffect(() => {
    setLoading(true)
    getRoutine()
      .then((response) => response.json())
      .then((data) => {
        setRoutine(data)
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
    <RoutineContainer>
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
        <NoRoutine>
          <i>Cargando rutina....</i>
        </NoRoutine>
      )}
      {viewData && Object.keys(routine).length !== 0 && (
        <RoutineData
          ref={routineRef}
          className={isIntersecting ? 'visible' : 'right'}
        >
          <RoutineDay>
            {day === 1 ? (
              <DayWeekNow>
                Lunes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Lunes</DayWeek>
            )}
            <Hr />
            <List>
              {routine.monday.length > 0 ? (
                routine.monday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 2 ? (
              <DayWeekNow>
                Martes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Martes</DayWeek>
            )}
            <Hr />
            <List>
              {routine.tuesday.length > 0 ? (
                routine.tuesday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 3 ? (
              <DayWeekNow>
                Miércoles <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Miércoles</DayWeek>
            )}
            <Hr />
            <List>
              {routine.wednesday.length > 0 ? (
                routine.wednesday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 4 ? (
              <DayWeekNow>
                Jueves <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Jueves</DayWeek>
            )}
            <Hr />
            <List>
              {routine.thursday.length > 0 ? (
                routine.thursday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 5 ? (
              <DayWeekNow>
                Viernes <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Viernes</DayWeek>
            )}
            <Hr />
            <List>
              {routine.friday.length > 0 ? (
                routine.friday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 6 ? (
              <DayWeekNow>
                Sábado <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Sábado</DayWeek>
            )}
            <Hr />
            <List>
              {routine.saturday.length > 0 ? (
                routine.saturday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
          <RoutineDay>
            {day === 0 ? (
              <DayWeekNow>
                Domingo <Today>(Hoy)</Today>
              </DayWeekNow>
            ) : (
              <DayWeek>Domingo</DayWeek>
            )}
            <Hr />
            <List>
              {routine.sunday.length > 0 ? (
                routine.sunday.map((el) =>
                  el.exercises.map((ex, index) => (
                    <InfoItem key={index}>
                      <MountAndPhotoContainer>
                        <Mount>
                          {ex.series} x {ex.count} {ex.measure}
                        </Mount>
                        {<ExercisePhoto src={ex.photo} />}
                      </MountAndPhotoContainer>
                      <ExerciseContainer></ExerciseContainer>
                      <Exercise>
                        <TypeExercise>{ex.name}</TypeExercise>
                        <ExtraInfo>
                          {ex.rest && `${ex.rest} segundos de descanso`}{' '}
                          {ex.description && `- ${ex.description}`}
                          {ex.rest === null &&
                            ex.description === null &&
                            'Sin información adicional.'}
                        </ExtraInfo>
                      </Exercise>
                    </InfoItem>
                  ))
                )
              ) : (
                <NoData>
                  <TextNoData>Sin Información</TextNoData>
                </NoData>
              )}
            </List>
          </RoutineDay>
        </RoutineData>
      )}{' '}
      {viewData && Object.keys(routine).length === 0 && (
        <NoRoutine>Sin Información.</NoRoutine>
      )}
      <Toaster />
    </RoutineContainer>
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

const Exercise = styled.div``

const ExerciseContainer = styled.div`
  display: block;
  border-left: 3px solid ${primaryBlue};
  margin: 1rem;
`

const ExercisePhoto = styled.img`
  border-radius: 5px;
  box-shadow: 0px 0px 3px ${primaryBlue};

  @media screen and (max-width: 480px) {
    width: 150px;
  }
`

const ExtraInfo = styled.p`
  font-style: italic;
`

const Hr = styled.hr``

const InfoItem = styled.li`
  color: rgb(30, 30, 30);
  display: flex;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
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
    }

    @media screen and (max-width: 1000px) {
      transform: translate(-90%, -150%);
      border-radius: 15px 15px 0 15px;
      font-size: 0.6rem;
    }

    @media screen and (max-width: 480px) {
      transform: translate(-95%, -140%);
      width: max-content;
    }
  }

  :hover .tooltip {
    visibility: visible;
  }
`

const Mount = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 0.5rem;
  color: ${secondaryBlue};

  @media screen and (max-width: 1380px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`

const MountAndPhotoContainer = styled.div``

const NoData = styled.div`
  text-align: center;
  color: rgb(30, 30, 30);
  font-style: italic;
`

const NoRoutine = styled.p`
  font-size: 2rem;
  margin-top: -2vw;
  padding-bottom: 2vw;

  @media screen and (max-width: 480px) {
    font-size: 1.4rem;
  }
`

const RoutineContainer = styled.div`
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

const RoutineData = styled.div`
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

const RoutineDay = styled.div`
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

const TextDiv = styled.div``

const TextNoData = styled.p`
  font-size: 1.5rem;
  font-weight: 500;

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

const TypeExercise = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${secondaryBlue};

  @media screen and (max-width: 1380px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`
