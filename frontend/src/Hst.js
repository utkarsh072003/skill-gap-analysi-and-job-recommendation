import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home-container">
      {/* Main Content */}
      <header className="main-content">
        <h1>Bridging the Gap Between Skills and Careers</h1>
        <p>
          Our platform helps you analyze your skill gaps and recommends suitable job roles to accelerate your career growth.
        </p>
        <div className="buttons">
        <button className="btn btn-blue" onClick={() => navigate("/skill-gap")}>Skill Gap Analysis</button>
          <button className="btn btn-green" onClick={() => navigate("/jobs")}>Job Recommendation</button>
        </div>
      </header>

      {/* Bottom Section */}
      <section className="bottom-section">
        <h2>Why Skill Gap Analysis & Job Recommendation Matter?</h2>
        <p>
          Many professionals struggle to align their skills with job market demands. Our platform provides personalized insights to help you take the right steps in your career.
        </p>
        <div className="info-grid">
          <div className="info-box blue">
            <h3>Understand Your Skill Gaps</h3>
            <p>Identify the missing skills required for your desired job roles.</p>
          </div>
          <div className="info-box green">
            <h3>Get the Right Job Recommendations</h3>
            <p>Find jobs that match your existing skills and career aspirations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


