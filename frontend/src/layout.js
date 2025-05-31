import { Outlet, Link } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SkillAnalyzer</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      {/* Dynamic Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2>About Us</h2>
            <p>We empower individuals by helping them bridge skill gaps and find the right career paths.</p>
          </div>
          <div className="footer-section">
            <h2>Resources</h2>
            <ul>
              <li><Link to="#">Learning Hub</Link></li>
              <li><Link to="#">Career Tips</Link></li>
              <li><Link to="#">Interview Preparation</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Employers & Career Growth</h2>
            <ul>
              <li><Link to="#">Post a Job</Link></li>
              <li><Link to="#">Find Candidates</Link></li>
              <li><Link to="#">Industry Insights</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Legal & Policies</h2>
            <ul>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Use</Link></li>
              <li><Link to="#">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SkillAnalyzer. All Rights Reserved.</p>
          <span className="language-selector">🌍 English</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

