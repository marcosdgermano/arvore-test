import React from "react";
import styled from "styled-components";

const Loading = (): JSX.Element => {
  const Spinner = () => (<SpinnerRing><div></div><div></div><div></div><div></div></SpinnerRing>);
  return(
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div`
  display: block;
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  top: 0;
  opacity: 0.5;
  z-index: 100;
`;

const SpinnerRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
