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
import { enthusiasticList } from '../../utils/enthusiasticList';
import ProfileButtons from '../../components/ProfileButtons/ProfileButtons';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef } from 'react';
import FloatButtons from '../../components/FloatButtons/FloatButtons';

const HomeComponent = () => {
  const { t } = useTranslation();

  const sectionsId = useMemo(
    () => ({
      main: 'section-main',
      stack: 'section-stack',
      previousExp: 'section-previous-exp',
      projects: 'section-projects',
      enthusiastic: 'section-enthusiastic',
      contact: 'section-contact',
    }),
    []
  );

  const sectionsRefs = {
    main: useRef<HTMLElement | null>(null),
    stack: useRef<HTMLElement | null>(null),
    previousExp: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    enthusiastic: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  useEffect(() => {
    sectionsRefs.main.current = document.getElementById(sectionsId.main);
    sectionsRefs.stack.current = document.getElementById(sectionsId.stack);
    sectionsRefs.previousExp.current = document.getElementById(
      sectionsId.previousExp
    );
    sectionsRefs.projects.current = document.getElementById(
      sectionsId.projects
    );
    sectionsRefs.enthusiastic.current = document.getElementById(
      sectionsId.enthusiastic
    );
    sectionsRefs.contact.current = document.getElementById(sectionsId.contact);
  }, [sectionsId]);

  return (
    <ThemeProvider>
      <HeaderComponent sectionRefs={sectionsRefs} />
      <main className="main-content-padding">
        <ProfileCard id={sectionsId.main} />

        <div className="show-area">
          <ContentArea id={sectionsId.stack} title={t('content.main_stack')}>
            <IconList iconUrlList={mainStackIconList} />
          </ContentArea>

          <ContentArea
            id={sectionsId.previousExp}
            title={t('content.previous_experience')}
          >
            <IconList iconUrlList={previousExperienceIconList} />
          </ContentArea>

          <ContentArea id={sectionsId.projects} title={t('content.projects')}>
            <ProjectCardList projects={projectList} />
          </ContentArea>

          <ContentArea
            id={sectionsId.enthusiastic}
            title={t('content.enthusiastic')}
          >
            <ProjectCardList projects={enthusiasticList} />
          </ContentArea>
        </div>
      </main>

      <footer className="footer-padding">
        <ContentArea
          id={sectionsId.contact}
          $isFooter
          title={t('content.contact')}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
          >
            <p>
              {t('footer.get_in_touch')}{' '}
              <b>eduardo.valencio.santos@gmail.com</b>
            </p>

            <ProfileButtons $isFooter />

            <span>Design & Developed by Eduardo Valencio</span>
          </div>
        </ContentArea>
      </footer>

      <FloatButtons />
    </ThemeProvider>
  );
};

export default HomeComponent;
