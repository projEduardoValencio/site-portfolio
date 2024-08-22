import { createContext, useCallback, useEffect, useState } from 'react';
import { ITheme } from '../models/interfaces/ITheme';
import { Themes } from '../utils/themeConfig';
import { setCoreTheme } from '../utils/toogleTheme';
import {
  loadThemeFromLocalStorage,
  saveThemOnLocalStorage,
} from '../utils/storegeTheme';

interface IThemeContext {
  theme: ITheme | undefined;
  toggleTheme: () => void;
  loadingTheme?: boolean;
}
export const ThemeContext = createContext<IThemeContext>({
  theme: Themes.light,
  toggleTheme: () => {},
});

interface IProps {
  children: React.ReactNode;
}
export const ThemeProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<ITheme>();
  const [loadingTheme, setLoadingTheme] = useState<boolean>(true);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Themes.dark ? Themes.light : Themes.dark;
    setTheme(newTheme);
    setCoreTheme(newTheme);
    saveThemOnLocalStorage(newTheme);
  }, [theme]);

  useEffect(() => {
    loadThemeFromLocalStorage().then((loadedTheme: ITheme | null) => {
      setTheme(loadedTheme ?? Themes.light);
      setLoadingTheme(false);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loadingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
