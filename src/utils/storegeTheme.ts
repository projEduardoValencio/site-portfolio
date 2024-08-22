import { ITheme } from '../models/interfaces/ITheme';

export const saveThemOnLocalStorage = (theme: ITheme) => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

export const loadThemeFromLocalStorage = async (): Promise<ITheme | null> => {
  const theme = localStorage.getItem('theme');
  return theme ? JSON.parse(theme) : null;
};
