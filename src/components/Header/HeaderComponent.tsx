import { useCallback, useState } from 'react';
import ButtonType from '../../models/types/ButtonType';
import ButtonComponent from '../Button/ButtonComponent';
import {
  Container,
  ContainerLogo,
  LogoText,
  Option,
  OptionsNav,
} from './HeaderComponentStyle';
import { useTranslation } from 'react-i18next';

const HeaderComponent = () => {
  const [selection, setSelected] = useState<number>(0);
  const { t } = useTranslation();
  const options = [
    t('header.home'),
    t('header.stack'),
    t('header.projects'),
    t('header.contact'),
  ];

  const handleMouseOver = useCallback((index: number) => {
    setSelected(index);
  }, []);

  return (
    <>
      <Container className="main-content-padding">
        <ContainerLogo>
          <LogoText>[DevEd]</LogoText>
        </ContainerLogo>

        <OptionsNav>
          {options.map((text, index) => (
            <Option
              onMouseOver={() => handleMouseOver(index)}
              selected={selection === index}
              key={index + text}
            >
              {text}
            </Option>
          ))}
        </OptionsNav>

        <div className="center">
          <ButtonComponent text={t('download_cv')} type={ButtonType.Fill} />
        </div>
      </Container>
    </>
  );
};

export default HeaderComponent;
