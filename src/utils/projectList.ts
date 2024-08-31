import i18next from 'i18next';
import { IProject } from '../models/interfaces/IProject';
import Portfolio from '../../public/screenshots/portflolio.png';

export const projectList: IProject[] = [
  {
    title: 'Site Portfolio',
    get description() {
      return i18next.t('projects.site_portfolio').toString();
    },
    projectImageUrl: Portfolio,
    tags: ['react', 'typescript', 'styled-components', 'i18n'],
    show: true,
    sourceProjectUrl: 'https://github.com/projEduardoValencio/site-portfolio',
    applicationAppUrl: 'https://github.com',
  },
];
