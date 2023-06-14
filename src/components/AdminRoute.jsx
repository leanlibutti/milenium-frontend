import { Outlet } from 'react-router-dom'
import { Home } from './Home'
import { SesionPage } from './SesionPage'

const AdminRoute = ({ admin, login, email, months }) => {
  if (login) {
    return admin ? <Outlet /> : <Home email={email} months={months} />
  }

  return <SesionPage />
}

export default AdminRoute
