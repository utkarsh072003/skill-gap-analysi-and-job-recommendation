import { useState } from "react";
import "./job.css";

const JobRecommendation = () => {
  const [skills, setSkills] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [date, setDate] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const response = await fetch("https://skill-gap-analysi-and-job-recommendation.onrender.com/recommend_jobs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              skills: skills,
              min_salary_lpa: minSalary,
              date: date,
            }),
            mode: "cors", 
          });
          

      if (!response.ok) {
        throw new Error("Failed to fetch job recommendations.");
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-recommendation-container">
      <h2>Find Your Perfect Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (comma-separated)"
          required
        />

        <label>Minimum Salary (LPA):</label>
        <input
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          placeholder="Enter minimum salary"
          required
        />

        <label>Job Posted After:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-green">
          Get Job Recommendations
        </button>
      </form>

      {loading && <p>Loading recommendations...</p>}
      {error && <p className="error">{error}</p>}

      {recommendations.length > 0 && (
        <div className="recommendation-list">
          <h3>Recommended Jobs</h3>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Skills Required</th>
                <th>Salary Range</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date Posted</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((job, index) => (
                <tr key={index}>
                  <td>{job.Job_Title}</td>
                  <td>{job.Company_Name}</td>
                  <td>{job.Skills_Required}</td>
                  <td>{job.Salary_Range}</td>
                  <td>{job.Job_Type}</td>
                  <td>{job.Location}</td>
                  <td>{job.Date_Posted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobRecommendation;

