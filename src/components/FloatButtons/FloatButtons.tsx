import styled from 'styled-components';
import ToggleThemeButton from './ToggleThemeButton/ToggleTemeButton';
import ToggleLocaleButtons from './ToggleLocaleButton/ToggleLocaleButton';

const FloatButtonsContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: auto;
  gap: 10px;
  bottom: 20px;
  right: 20px;
`;

const FloatButtons = () => {
  return (
    <FloatButtonsContainer>
      <ToggleLocaleButtons />
      <ToggleThemeButton />
    </FloatButtonsContainer>
  );
};

export default FloatButtons;
