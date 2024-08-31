import { IProject } from '../models/interfaces/IProject';
import Flutter_Gifs from '../../public/screenshots/gif_client_dart.png';
import i18next from 'i18next';

export const enthusiasticList: IProject[] = [
  {
    title: 'Flutter Gif Client',
    get description() {
      return i18next.t('enthusiastic.dart_gif_client').toString();
    },
    projectImageUrl: Flutter_Gifs,
    tags: ['flutter', 'dart', 'api_client', 'fun'],
    show: true,
    sourceProjectUrl: 'https://github.com/projEduardoValencio/gifs_api',
    not_cover: true,
  },
];
