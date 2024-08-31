import ContentArea from '../../components/ContentArea/ContentArea';
import HeaderComponent from '../../components/Header/HeaderComponent';
import IconList from '../../components/IconsList/IconList';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProjectCardList from '../../components/ProjectCardList/ProjectCardList';
import { projectList } from '../../utils/projectList';
import {
  mainStackIconList,
  previousExperienceIconList,
} from '../../utils/staticIconList';
import './Home.css';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ToggleThemeButton from '../../components/ToggleThemeButton/ToggleTemeButton';
import { enthusiasticList } from '../../utils/enthusiasticList';

const HomeComponent = () => {
  return (
    <ThemeProvider>
      <HeaderComponent />
      <main className="main-content-padding">
        <ProfileCard />

        <div className="show-area">
          <ContentArea title="MAIN STACK">
            <IconList iconUrlList={mainStackIconList} />
          </ContentArea>

          <ContentArea title="PREVIOUS EXPERIENCE">
            <IconList iconUrlList={previousExperienceIconList} />
          </ContentArea>

          <ContentArea title="POJECTS">
            <ProjectCardList projects={projectList} />
          </ContentArea>

          <ContentArea title="ENTHUSIASTIC">
            <ProjectCardList projects={enthusiasticList} />
          </ContentArea>

        </div>
      </main>

      <footer className='footer-padding'>
        <ContentArea isFooter title="CONTACT">
          <p>
          Get in touch or shoot me an email directly on <b>eduardo.valencio.santos@gmail.com</b>
          </p>

          <span>Design & Developed by Eduardo Valencio</span>
        </ContentArea>
      </footer>

      <ToggleThemeButton />
    </ThemeProvider>
  );
};

export default HomeComponent;
