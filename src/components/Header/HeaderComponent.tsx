import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import ButtonType from '../../models/types/ButtonType';
import ButtonComponent from '../Button/ButtonComponent';
import {
  Container,
  ContainerLogo,
  LogoText,
  Option,
  OptionsMenu,
  OptionsNav,
} from './HeaderComponentStyle';
import { useTranslation } from 'react-i18next';

interface IProps {
  sectionRefs: {
    main: React.RefObject<HTMLElement>;
    stack: React.RefObject<HTMLElement>;
    previousExp: React.RefObject<HTMLElement>;
    projects: React.RefObject<HTMLElement>;
    enthusiastic: React.RefObject<HTMLElement>;
    contact: React.RefObject<HTMLElement>;
  };
}
const HeaderComponent = ({ sectionRefs }: IProps) => {
  const [selection, setSelected] = useState<RefObject<HTMLElement>>(
    sectionRefs.main
  );
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const options = useMemo(
    () => [
      {
        ref: sectionRefs.main,
        text: t('header.home'),
      },
      {
        ref: sectionRefs.stack,
        text: t('header.stack'),
      },
      {
        ref: sectionRefs.projects,
        text: t('header.projects'),
      },
      {
        ref: sectionRefs.contact,
        text: t('header.contact'),
      },
    ],
    [sectionRefs]
  );

  const handleClick = useCallback(
    ({ ref }: { ref: RefObject<HTMLElement>; text: string }) => {
      const offset = 100; // Define the desired offset value
      window.scrollTo({
        top: ref.current!.offsetTop - offset || 0,
        behavior: 'smooth',
      });
      setSelected(ref);
    },
    []
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let visibleSection: RefObject<HTMLElement> | null = null;
    let previousSection: RefObject<HTMLElement> | null = null;

    Object.values(sectionRefs).forEach((section, index) => {
      if (
        section.current &&
        section.current.offsetTop <= scrollPosition &&
        section.current.offsetTop + section.current.offsetHeight >
          scrollPosition
      ) {
        if (options.find((opt) => opt.ref === section)) {
          visibleSection = section;
        } else if (index === 0) {
          visibleSection = sectionRefs.main;
        } else if (index === Object.values(sectionRefs).length - 1) {
          visibleSection = sectionRefs.contact;
        } else {
          visibleSection = previousSection;
        }
      }
      previousSection = section;
    });

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      visibleSection = sectionRefs.contact;
    }

    if (visibleSection) {
      setSelected(visibleSection);
    }
  }, [sectionRefs, options]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <Container className="main-content-padding">
        <ContainerLogo
          onClick={() => {
            setVisible((v) => !v);
          }}
        >
          <LogoText>[DevEd]</LogoText>
        </ContainerLogo>

        <OptionsNav>
          {options.map((section, index) => (
            <Option
              onClick={() => handleClick(section)}
              selected={selection === section.ref}
              key={index + section.text}
            >
              {section.text}
            </Option>
          ))}
        </OptionsNav>

        <OptionsMenu $visible={visible}>
          {options.map((section, index) => (
            <Option
              onClick={() => handleClick(section)}
              selected={selection === section.ref}
              key={index + section.text}
            >
              {section.text}
            </Option>
          ))}
        </OptionsMenu>

        <div className="center">
          <ButtonComponent text={t('download_cv')} type={ButtonType.Fill} />
        </div>
      </Container>
    </>
  );
};

export default HeaderComponent;
