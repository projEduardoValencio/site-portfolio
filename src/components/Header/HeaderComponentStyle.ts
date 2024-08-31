import styled, { keyframes } from 'styled-components';

interface IStyleOptionsNavProps {
  selected?: boolean;
}

export const Container = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  height: 75px;
  width: 100%;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  filter: drop-shadow(5px 5px 10px #00000018);

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const LogoText = styled.h2`
  letter-spacing: 1px;
  font-size: 32px;
  font-weight: bold;
  line-height: 0;
  margin: 0;
`;

export const ContainerLogo = styled.div`
  height: 42px;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  width: 144px;
`;

export const OptionsNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 600px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Option = styled.span<IStyleOptionsNavProps>`
  font-size: ${(props) => (props.selected ? '1.2em' : '1.1em')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  width: 100%;
`;

interface IStyleOptionsMenuProps {
  visible?: boolean;
}
const fadeIn = keyframes`
  from {
    transform: translateY(-100px);
    opacity: 0;
    display: flex;
  }
  to {
    transform: translateY(0);
    opacity: 1;
    display: flex;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
    display: flex;
  }
  to {
    transform: translateY(-100px);
    opacity: 0;
    display: none;
  }
`;

export const OptionsMenu = styled.div<IStyleOptionsMenuProps>`
  z-index: 9;
  position: fixed;
  left: 0;
  top: 75px;
  /* display: ${(props) => (props.visible ? 'flex' : 'none')}; */
  display: flex;
  flex-direction: column;
  gap: 30px;
  backdrop-filter: blur(10px);
  background-color: var(--primary-color);
  width: 100%;
  text-align: center;
  padding: 50px;
  transition: visibility 0.5s linear, opacity 0.5s linear;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};

  @media (min-width: 768px) {
    display: none;
  }

  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.5s;
`;
