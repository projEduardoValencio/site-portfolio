import { TypeAnimation } from 'react-type-animation';
import {
  Biography,
  Container,
  MainTitle,
  ProfileImage,
  ProfileImageContainer,
  SubTitle,
  TitleContainer,
} from './ProfileCardStyle';
import { useEffect, useState } from 'react';
import ProfileButtons from '../ProfileButtons/ProfileButtons';
import { useTranslation } from 'react-i18next';

interface IProps {
  id: string;
}
const ProfileCard = ({ id }: IProps) => {
  const [showSubTitle, setShowSubTitle] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setShowSubTitle(true), 2000);
  }, []);

  return (
    <Container id={id}>
      <TitleContainer>
        <MainTitle>
          {t('profile.hello')}
          <TypeAnimation
            className="name-animation"
            sequence={[' Eduardo Valencio']}
            cursor={false}
            speed={20}
          />
        </MainTitle>

        {showSubTitle ? (
          <SubTitle>
            <TypeAnimation
              className="name-animation"
              sequence={[
                t('developer'),
                3000,
                '.NET | ReactJS | Angular',
                2000,
                'AWS | VueJS | Spring Boot',
                2000,
                'DevOps',
                1000,
              ]}
              cursor={true}
              repeat={Infinity}
              wrapper="span"
              speed={60}
            />
          </SubTitle>
        ) : (
          <SubTitle />
        )}
      </TitleContainer>
      <ProfileImageContainer className="center">
        <ProfileImage src="/images/Profile_Eduardo_Valencio.jpeg" />
      </ProfileImageContainer>

      <Biography>
        {t('profile.introduction_content')}
        <br /> <i>{t('profile.introduction_end')}</i>
      </Biography>

      <ProfileButtons />
    </Container>
  );
};

export default ProfileCard;
