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

const ProfileCard = () => {
  const [showSubTitle, setShowSubTitle] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShowSubTitle(true), 2000);
  }, []);

  return (
    <Container>
      <TitleContainer>
        <MainTitle>
          Hi, I'm
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
                'Web Developer Full-Stack',
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
        I am a passionate Software Developer 🚀 from Egypt 🇪🇬. with more than 5
        years experience delivering tech solutions, avid programmer and fast
        learner, obsessed with details and quality, always trying to improve
        development process and code quality, I love simple and elegant
        solutions for every problem.
      </Biography>
    </Container>
  );
};

export default ProfileCard;
