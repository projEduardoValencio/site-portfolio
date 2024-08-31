import styled from 'styled-components';
import { ITheme } from '../../models/interfaces/ITheme';
import { Themes } from '../../utils/themeConfig';

interface IStyleProps {
  $isFooter?: boolean;
  theme: ITheme;
}

export const Container = styled.div<IStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $isFooter }) => ($isFooter ? 'center' : 'start')};
  gap: 25px;

  img {
    filter: ${({ $isFooter, theme }) => {
      if ($isFooter && theme === Themes.dark) {
        return '';
      } else if (
        $isFooter &&
        theme.primaryColor === Themes.light.primaryColor
      ) {
        return 'invert(1) brightness(2)';
      } else if (
        !$isFooter &&
        theme.primaryColor === Themes.dark.primaryColor
      ) {
        return 'invert(1) brightness(2)';
      } else if (
        !$isFooter &&
        theme.primaryColor === Themes.light.primaryColor
      ) {
        return '';
      }
    }};
  }

  @media (max-width: 770px) {
    width: 100%;
    justify-content: center;
  }
`;

interface IProfileButtonStyleProps {
  href: string;
}

export const ProfileButton = styled.a.attrs<IProfileButtonStyleProps>(
  (props) => ({
    target: '_blank',
    href: props.href,
  })
)`
  height: 40px;
  width: 40px;
  cursor: pointer;

  transition: all 0.1s ease-in-out;

  &:hover > img {
    position: relative;
    transform: scale(1.03) translateY(-5px);
  }

  img {
    transition: transform 0.3s;
  }
`;
