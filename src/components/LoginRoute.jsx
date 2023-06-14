import { Outlet } from 'react-router-dom'

import { SesionPage } from './SesionPage'

const LoginRoute = ({ login }) => {
  return login ? <Outlet /> : <SesionPage />
}

export default LoginRoute
