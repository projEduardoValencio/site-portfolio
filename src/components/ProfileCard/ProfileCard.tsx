import {
  Biography,
  Container,
  MainTitle,
  MainTitleName,
  ProfileImage,
  ProfileImageContainer,
  SubTitle,
  TitleContainer,
} from './ProfileCardStyle';

const ProfileCard = () => {
  return (
    <Container>
      <TitleContainer>
        <MainTitle>
          Hi, I'm <MainTitleName>Eduardo Valencio</MainTitleName>
        </MainTitle>

        <SubTitle>Web Developer Full-Stack</SubTitle>
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
