import { ITheme } from '../models/interfaces/ITheme';

export const setCoreTheme = (theme: ITheme) => {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--secondary-color', theme.secondaryColor);
  root.style.setProperty('--accent-color', theme.accentColor);
  root.style.setProperty('--accent-color-rgb', theme.accentColorRgb);
};
