import styled from 'styled-components'
import { Colors } from '../constants/Colors'

const { secondaryBlue } = Colors

export const BurgerButton = (props) => {
  return (
    <Burger>
      <Div
        onClick={props.handleClick}
        className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}
      >
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </Div>
    </Burger>
  )
}

const Burger = styled.div`
  z-index: 2;

  .nav-icon-5 {
    width: 35px;
    height: 30px;
    margin: 10px 10px;
    position: relative;
    cursor: pointer;
    display: inline-block;
  }
  .nav-icon-5 Span {
    background-color: ${secondaryBlue};
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 4px;
    transition-duration: 500ms;
  }
  .nav-icon-5 Span:nth-child(1) {
    top: 0px;
    left: 0px;
  }
  .nav-icon-5 Span:nth-child(2) {
    top: 13px;
    left: 0px;
    opacity: 1;
  }
  .nav-icon-5 Span:nth-child(3) {
    bottom: 0px;
    left: 0px;
  }
  .nav-icon-5:not(.open):hover Span:nth-child(1) {
    transform: rotate(-3deg) scaleY(1.1);
  }
  .nav-icon-5:not(.open):hover Span:nth-child(2) {
    transform: rotate(3deg) scaleY(1.1);
  }
  .nav-icon-5:not(.open):hover Span:nth-child(3) {
    transform: rotate(-4deg) scaleY(1.1);
  }
  .nav-icon-5.open Span:nth-child(1) {
    transform: rotate(45deg);
    top: 13px;
  }
  .nav-icon-5.open Span:nth-child(2) {
    opacity: 0;
  }
  .nav-icon-5.open Span:nth-child(3) {
    transform: rotate(-45deg);
    top: 13px;
  }
`

const Div = styled.div`
  z-index: 2;
  margin: 1vw;

  @media screen and (max-width: 1100px) {
    top: -5vw !important;
  }

  @media screen and (max-width: 900px) {
    top: -8vw !important;
  }
`

const Span = styled.span``
