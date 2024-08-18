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

const HeaderComponent = () => {
  const [selection, setSelected] = useState<number>(0);
  const options = ['Home', 'About', 'Projects', 'Contact'];

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
          <ButtonComponent text="Download CV" type={ButtonType.Fill} />
        </div>
      </Container>
    </>
  );
};

export default HeaderComponent;
