import { Card } from '../styled-components/CardStyle';
import { Slide, SliderWrapper } from './IconListStyle';

const IconList = () => {
    const mock = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg',
    ];

    const icons = [...mock, ...mock, ...mock];

    return (
        <Card style={{padding: '5% 40px 5% 10px', overflow: 'hidden', position: 'relative'}}>
            <SliderWrapper>
                <Slide>
                    {icons.map((icon, index) => (
                        <img key={index} src={icon} height={'100px'} />
                    ))}
                </Slide>
            </SliderWrapper>
        </Card>
    );
};

export default IconList;