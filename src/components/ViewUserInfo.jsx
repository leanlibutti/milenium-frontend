import styled from 'styled-components'

import { UserViewInfo } from './UserViewInfo'

export const ViewUserInfo = ({ user }) => {
  return (
    <InfoUser>
      <InfoContainer>
        <UserViewInfo user={user} />
      </InfoContainer>
    </InfoUser>
  )
}

const InfoContainer = styled.div``

const InfoUser = styled.div``
