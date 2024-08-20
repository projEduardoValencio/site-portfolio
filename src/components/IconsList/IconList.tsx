import { Card } from '../styled-components/CardStyle';

const IconList = () => {
    const mock = [
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    ];

    return (
        <Card style={{padding: '5% 40px 5% 10px', overflow: 'auto'}}>
            <ul style={{display: 'flex', flexDirection: 'row', gap: '100px', flexWrap: 'nowrap'}}>
                {mock.map((icon, index) => (<img key={index} src={icon} height={'100px'}/>))}
            </ul>
        </Card>
    );
};

export default IconList;