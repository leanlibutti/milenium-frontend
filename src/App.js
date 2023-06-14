import './App.css'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast'

import { SesionPage } from './components/SesionPage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Bill } from './components/Bill'
import { UserProfile } from './components/UserProfile'
import { AdminPage } from './components/AdminPage'
import { Error404 } from './components/Error404'
import LoginRoute from './components/LoginRoute'
import AdminRoute from './components/AdminRoute'
import { ResetPassword } from './components/ResetPassword'
import { ChangePassword } from './components/ChangePassword'
import RecoverAccount from './components/RecoverAccount'
import dbLocal from './static/db_local.json'
import { FetchGetData } from './helpers/FetchGetData'

const initialData = {
  email: null,
  username: null,
  surname: null,
  admin: false,
  weight: null,
  height: null
}

function App() {
  const [user, setUser] = useState(initialData)
  const [login, setLogin] = useState(false)
  const res = useRef(null)

  useEffect(() => {
    FetchGetData(process.env.REACT_APP_CURRENT_USER)
      .then((response) => response.json())
      .then((data) => {
        res.current = data
        setUser(res.current)
      })
      .catch((e) => {
        if (
          e.message !==
          `Unexpected token 'Y', "You need t"... is not valid JSON`
        ) {
          toast.error(e.message, {
            position: 'top-right',
            duration: 6000,
            style: {
              background: 'rgba(250, 215, 215)',
              fontSize: '1rem',
              fontWeight: '500'
            }
          })
        }
      })
  }, [])

  useEffect(() => {
    if (user.email !== null) {
      setLogin(true)
    } else {
      // localStorage.removeItem("token");
      setLogin(false)
    }

    if (user.username === undefined) {
      window.location.reload()
    }
  }, [user])

  return (
    <Container>
      {user !== null && user.username !== undefined && (
        <Router>
          {login && (
            <Header username={user.username} login={login} admin={user.admin} />
          )}
          <Routes>
            {!login && (
              <Route
                exact
                path="/"
                element={<SesionPage setUser={setUser} />}
              />
            )}
            <Route element={<LoginRoute login={login} />}>
              <Route
                exact
                path="/"
                element={
                  <Home
                    months={dbLocal.months}
                    exercises={dbLocal.exercises}
                    weight={user.weight}
                    height={user.height}
                  />
                }
              />
              <Route
                exact
                path="/mis-pagos"
                element={<Bill user={user} months={dbLocal.months} />}
              />
              <Route
                exact
                path={`/usuario/${user.username}`}
                element={<UserProfile email={user.email} />}
              />
              <Route
                exact
                path="/change-password"
                element={
                  <ChangePassword username={user.username} email={user.email} />
                }
              />
            </Route>
            <Route
              element={
                <AdminRoute
                  admin={user.admin}
                  login={login}
                  email={user.email}
                  months={dbLocal.months}
                />
              }
            >
              <Route
                exact
                path="/admin"
                element={<AdminPage dbLocal={dbLocal} />}
              />
            </Route>
            <Route
              element={
                <RecoverAccount
                  email={user.email}
                  login={login}
                  months={dbLocal.months}
                />
              }
            >
              <Route path="/recover/edit" element={<ResetPassword />} />
            </Route>
            <Route
              exact
              path="*"
              element={<Error404 login={login} admin={user.admin} />}
            />
          </Routes>
        </Router>
      )}
      {login && <Footer />}
      <Toaster />
    </Container>
  )
}

const Container = styled.div`
  display: block;
  justify-content: center;
`

export default App
