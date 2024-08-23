import styled from 'styled-components';

export const ThemeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  filter: drop-shadow(5px 5px 10px #00000028);
  box-shadow: inset 0 0 4px #88888823;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05) translateY(-5px);
  }

  object {
    width: 30px;
    height: 30px;

    #ic_fluent_dark_theme_24_regular {
      fill: var(--primary-color);
    }
  }
`;
