import { Container, Line, Title } from './ContentAreaHeaderTitleStyle';

interface IProps {
  title: string;
  isFooter?: boolean;
}

const ContentAreaHeaderTitle = ({ title, isFooter }: IProps) => {
  return (
    <Container>
      <Line isFooter={isFooter} />
      <Title isFooter={isFooter}>{title}</Title>
      <Line isFooter={isFooter} />
    </Container>
  );
};

export default ContentAreaHeaderTitle;
