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

const ProfileCard = () => {
  const [showSubTitle, setShowSubTitle] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShowSubTitle(true), 2000);
  }, []);

  return (
    <Container>
      <TitleContainer>
        <MainTitle>
          Olá, eu sou
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
        Sou um desenvolvedor Full-Stack e DevOps com experiência em uma
        variedade de tecnologias, desde C# e TypeScript até Python e Java.
        Especializado em criar aplicações web escaláveis e seguras, eu gosto de
        unir front-end e back-end com uma arquitetura limpa, enquanto gerencio
        pipelines CI/CD e infraestrutura em nuvem. Sempre em busca de novos
        desafios e aprendizados, estou animado para explorar áreas como
        Segurança da Informação, IoT, ML e Mobile.
        <br /> <i>Vamos fazer algo incrível juntos!</i>
      </Biography>

      <ProfileButtons />
    </Container>
  );
};

export default ProfileCard;
