import { Card } from '../styled-components/CardStyle';
import { Slide, SliderWrapper } from './IconListStyle';

interface IProps {
  iconUrlList: string[];
}
const IconList = ({ iconUrlList }: IProps) => {
  const icons = [...iconUrlList, ...iconUrlList, ...iconUrlList];

  return (
    <Card
      style={{
        padding: '5% 40px 5% 10px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <SliderWrapper>
        <Slide>
          {icons.map((icon, index) => (
            <img key={index} src={icon}/>
          ))}
        </Slide>
      </SliderWrapper>
    </Card>
  );
};

export default IconList;
