import styled from 'styled-components';

interface IStyleOptionsNavProps {
  selected?: boolean;
}

export const Container = styled.div`
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
