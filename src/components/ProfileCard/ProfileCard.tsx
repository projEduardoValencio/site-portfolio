import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="profile-container">
      <div className="title-div">
        <h1>
          Hi, I'm <span>Eduardo Valencio</span>
        </h1>

        <h2>Web Developer Full-Stack</h2>
      </div>

      <div className="img-container center">
        <img src="/images/Profile_Eduardo_Valencio.jpeg" />
      </div>

      <p>
        I am a passionate Software Developer 🚀 from Egypt 🇪🇬. with more than 5
        years experience delivering tech solutions, avid programmer and fast
        learner, obsessed with details and quality, always trying to improve
        development process and code quality, I love simple and elegant
        solutions for every problem.
      </p>
    </div>
  );
};

export default ProfileCard;
