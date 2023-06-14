import styled from 'styled-components'

const Loader = () => {
  return (
    <Div className="lds-ring">
      <Div></Div>
      <Div></Div>
      <Div></Div>
      <Div></Div>
    </Div>
  )
}

export default Loader

const Div = styled.div``
