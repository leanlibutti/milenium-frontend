import { Outlet } from 'react-router-dom'

import { Home } from './Home'
import { SesionPage } from './SesionPage'
import { Toaster } from 'react-hot-toast'

const RecoverAccount = ({ email, login, months }) => {
  if (!login) {
    return <Outlet />
  } else {
    return (
      <>
        <Home email={email} months={months} />
        <Toaster />
      </>
    )
  }

  return <SesionPage />
}

export default RecoverAccount
