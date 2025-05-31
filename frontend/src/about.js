
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Empowering Careers with Data-Driven Insights</h1>
        <p>
          At <strong>SkillAnalyzer</strong>, we bridge the gap between job market demands and individual skills.
          Our platform provides cutting-edge <strong>Skill Gap Analysis</strong> and <strong>AI-powered Job Recommendations</strong> 
          to help individuals take the right steps in their careers.
        </p>

        <h2>Why Skill Gap Analysis & Job Recommendations Matter?</h2>
        <p>
          Many professionals struggle to align their skills with market needs. 
          Industries like <strong>AI, Data Science, Cybersecurity, and Cloud Computing</strong> are evolving rapidly, creating skill gaps.
          Our platform helps users analyze missing skills and discover career opportunities that match their expertise.
        </p>

        <h2>Insights from the Job Market</h2>
        <div className="info-grid">
          <div className="info-box blue">
            <h3>Rising Demand for AI & Data Science</h3>
            <p>AI and ML roles have grown by <strong>74%</strong> annually, with companies actively hiring skilled professionals.</p>
          </div>
          <div className="info-box green">
            <h3>Job Market Shift & Automation</h3>
            <p>By 2025, automation will disrupt <strong>85 million jobs</strong>, but <strong>97 million new roles</strong> will emerge requiring digital expertise.</p>
          </div>
          <div className="info-box blue">
            <h3>Remote Work & Global Opportunities</h3>
            <p>Since 2019, remote work has increased by <strong>140%</strong>, opening new doors for skilled professionals worldwide.</p>
          </div>
        </div>

        <h2>Our Mission</h2>
        <p>
          We believe in empowering individuals with the right tools to make informed career decisions. 
          Whether you're a student, professional, or career switcher, our platform helps you:
        </p>
        <ul>
          <li>Identify skill gaps and get actionable learning recommendations.</li>
          <li>Receive AI-powered job recommendations based on your skills.</li>
          <li>Stay updated with industry trends and emerging career opportunities.</li>
        </ul>

        <h2>Start Your Journey with SkillAnalyzer</h2>
        <p>
          Take control of your career today! Analyze your skills, explore job opportunities, 
          and upskill for a future-ready career. Your next big opportunity starts here.
        </p>
      </div>
    </div>
  );
};

export default About;

