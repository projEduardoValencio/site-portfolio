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
import ProfileButtons from '../../components/ProfileButtons/ProfileButtons';
import { useTranslation } from 'react-i18next';

const HomeComponent = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <HeaderComponent />
      <main className="main-content-padding">
        <ProfileCard ref="section-main" />

        <div className="show-area">
          <ContentArea ref="section-stack" title={t('content.main_stack')}>
            <IconList iconUrlList={mainStackIconList} />
          </ContentArea>

          <ContentArea
            ref="section-previous-exp"
            title={t('content.previous_experience')}
          >
            <IconList iconUrlList={previousExperienceIconList} />
          </ContentArea>

          <ContentArea ref="section-projects" title={t('content.projects')}>
            <ProjectCardList projects={projectList} />
          </ContentArea>

          <ContentArea
            ref="section-enthusiastic"
            title={t('content.enthusiastic')}
          >
            <ProjectCardList projects={enthusiasticList} />
          </ContentArea>
        </div>
      </main>

      <footer className="footer-padding">
        <ContentArea
          ref="section-contact"
          isFooter
          title={t('content.contact')}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
          >
            <p>
              {t('footer.get_in_touch')}{' '}
              <b>eduardo.valencio.santos@gmail.com</b>
            </p>

            <ProfileButtons isFooter />

            <span>Design & Developed by Eduardo Valencio</span>
          </div>
        </ContentArea>
      </footer>

      <ToggleThemeButton />
    </ThemeProvider>
  );
};

export default HomeComponent;
