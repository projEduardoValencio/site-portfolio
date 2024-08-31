import { useContext } from 'react';
import { Container, ProfileButton } from './ProfileButtonsStyle';
import { ThemeContext } from '../../contexts/ThemeContext';

interface IProps {
  $isFooter?: boolean;
}
const ProfileButtons = ({ $isFooter }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container $isFooter={$isFooter} theme={theme}>
      <ProfileButton href="https://github.com/projEduardoValencio">
        <img src="/icons/github.png" alt="GitHub" />
      </ProfileButton>

      <ProfileButton href="https://www.linkedin.com/in/eduardo-valencio-santos/">
        <img src="/icons/linkedin.png" alt="Linkedin" />
      </ProfileButton>

      <ProfileButton href="https://api.whatsapp.com/send?phone=5514998170552&text=Ol%C3%A1%20Eduardo%2C%20vim%20pelo%20seu%20site%20portif%C3%B3lio%0A%0A">
        <img src="/icons/whatsapp.png" alt="WhatsApp" />
      </ProfileButton>

      <ProfileButton href="mailto:eduardo.valencio.santos@gmail.com?subject=Proposta&body=Ol%C3%A1%20Eduardo%2C%20vim%20pelo%20seu%20site%20portif%C3%B3lio">
        <img src="/icons/email.png" alt="Email" />
      </ProfileButton>
    </Container>
  );
};

export default ProfileButtons;
