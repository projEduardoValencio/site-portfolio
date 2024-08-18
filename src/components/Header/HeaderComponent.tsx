import { useCallback, useState } from 'react';
import ButtonType from '../../models/types/ButtonType';
import ButtonComponent from '../Button/ButtonComponent';
import './HeaderComponent.css';

const HeaderComponent = () => {
  const [selected, setSelected] = useState<number>(0);
  const options = ['Home', 'About', 'Projects', 'Contact'];

  const handleMouseOver = useCallback((index: number) => {
    setSelected(index);
  }, []);

  return (
    <>
      <div className="header-container">
        <div className="content-header">
          <h2>[DevEd]</h2>
        </div>

        <div className="center options">
          {options.map((el, index) => (
            <span
              onMouseOver={() => handleMouseOver(index)}
              className={index === selected ? 'selected' : ''}
              key={index + el}
            >
              {el}
            </span>
          ))}
        </div>

        <div className="center">
          <ButtonComponent text="Download CV" type={ButtonType.Fill} />
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
