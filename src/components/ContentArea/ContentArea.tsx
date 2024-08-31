import styled from 'styled-components';
import ContentAreaHeaderTitle from './ContentAreaHeaderTitle/ContentAreaHeaderTitle';

interface IStyleProps {
  isFooter?: boolean;
}

const Container = styled.div<IStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: ${(props) => props.isFooter ? 'var(--secondary-color)' : 'var(--primary-color)'};
  color: ${(props) => props.isFooter ? 'var(--primary-color)' : 'var(--secondary-color)'};

  @media (max-width: 925px) {
    gap: 20px;
  }
`;

interface IProps {
  title: string;
  isFooter?: boolean;
  children: React.ReactNode;
}

const ContentArea = ({ title, children, isFooter }: IProps) => {
  return (
    <Container isFooter={isFooter}>
      <ContentAreaHeaderTitle title={title} isFooter={isFooter} />
      {children}
    </Container>
  );
};

export default ContentArea;
