import { useEffect, useState } from 'react';
import ButtonType from '../../models/types/ButtonType';
import ButtonProps from './ButtonProps';
import './ButtonComponent.css';

const ButtonComponent = ({ text, type, width, height }: ButtonProps) => {
  const [buttonText, setButtonText] = useState<string>(text);
  const [buttonType] = useState<ButtonType>(type);
  const [buttonWidth] = useState<number>(width ?? 144);
  const [buttonHeight] = useState<number>(height ?? 42);

  useEffect(() => {
    setButtonText(text);
  }, [text]);

  return (
    <button
      className={`center ${buttonType}`}
      style={{ width: buttonWidth, height: buttonHeight, borderRadius: '5px' }}
    >
      {buttonText}
    </button>
  );
};

export default ButtonComponent;
