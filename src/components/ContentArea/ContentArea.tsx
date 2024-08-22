import styled from 'styled-components';
import ContentAreaHeaderTitle from './ContentAreaHeaderTitle/ContentAreaHeaderTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

interface IProps {
  title: string;
  isFooter?: boolean;
  children: React.ReactNode;
}

const ContentArea = ({ title, children, isFooter }: IProps) => {
  return (
    <Container>
      <ContentAreaHeaderTitle title={title} isFooter={isFooter} />
      {children}
    </Container>
  );
};

export default ContentArea;
