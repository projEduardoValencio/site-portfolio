import HeaderComponent from '../components/Header/HeaderComponent';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './Home.css';

const HomeComponent = () => {
  return (
    <>
      <HeaderComponent />
      <main className="main-content-padding">
        <ProfileCard />
      </main>
    </>
  );
};

export default HomeComponent;
