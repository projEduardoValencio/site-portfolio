import ContentAreaHeaderTitle from './ContentAreaHeaderTitle/ContentAreaHeaderTitle';

interface IProps {
  title: string;
  isFooter?: boolean;
  children: React.ReactNode;
}

const ContentArea = ({ title, children, isFooter }: IProps) => {
  return (
    <>
      <ContentAreaHeaderTitle title={title} isFooter={isFooter} />
      {children}
    </>
  );
};

export default ContentArea;
