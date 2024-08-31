import styled from 'styled-components';
import ContentAreaHeaderTitle from './ContentAreaHeaderTitle/ContentAreaHeaderTitle';

interface IStyleProps {
  isFooter?: boolean;
}
interface IAttrProps {
  ref: string;
}

const Container = styled.div.attrs<IAttrProps>(({ ref }) => ({
  ref,
}))<IStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: ${(props) =>
    props.isFooter ? 'var(--secondary-color)' : 'var(--primary-color)'};
  color: ${(props) =>
    props.isFooter ? 'var(--primary-color)' : 'var(--secondary-color)'};

  @media (max-width: 925px) {
    gap: 20px;
  }
`;

interface IProps {
  title: string;
  isFooter?: boolean;
  children: React.ReactNode;
  ref: string;
}

const ContentArea = ({ title, children, isFooter, ref }: IProps) => {
  return (
    <Container ref={ref} isFooter={isFooter}>
      <ContentAreaHeaderTitle title={title} isFooter={isFooter} />
      {children}
    </Container>
  );
};

export default ContentArea;
