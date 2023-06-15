import styled from 'styled-components'

import uploadImage from '../assets/upload-image.png'

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
const Img = styled.img`
  width: 20vw;
  height: 20vw;
  margin: 5vw;
`
