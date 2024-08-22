import ContentArea from '../../components/ContentArea/ContentArea';
import HeaderComponent from '../../components/Header/HeaderComponent';
import IconList from '../../components/IconsList/IconList';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './Home.css';

const HomeComponent = () => {
  return (
    <>
      <HeaderComponent />
      <main className="main-content-padding">
        <ProfileCard />

        <ContentArea title="STACK PRINCIPAL">
          <IconList />
        </ContentArea>
      </main>
    </>
  );
};

export default HomeComponent;
