import styled, { keyframes } from 'styled-components';

const inifiniteScroll = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-33.5%);
  }
`;

export const SliderWrapper = styled.div`
  padding: 0;
  display: inline-flex;

  &::before,
  &::after {
    content: '';
    background: linear-gradient(
      90deg,
      rgba(var(--acent-color-rgb), 0.486) 0%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0) 80%,
      rgba(var(--acent-color-rgb), 0.486) 100%
    );
    height: 100%;
    position: absolute;
    width: 101%;
    z-index: 2;
  }

  &::after {
    right: 0px;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }
`;

export const Slide = styled.ul`
  display: inline-flex;
  animation: 20s ${inifiniteScroll} infinite linear;
  gap: 50px;
`;
