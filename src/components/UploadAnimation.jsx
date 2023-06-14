import styled from 'styled-components'

import uploadImage from '../assets/upload-image.jpg'

export const UploadAnimation = ({ uploadFiles }) => {
  return (
    <AnimationContainer onClick={uploadFiles}>
      <Img src={uploadImage} alt="upload-image" />
    </AnimationContainer>
  )
}

const AnimationContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`
const Img = styled.img``
