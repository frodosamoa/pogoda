import { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0px, 30px, 0px);
  }
  10% {
    opacity: 0;
    transform: translate3d(0px, 30px, 0px);
  }
  100% {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;
