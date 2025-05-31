import { useState } from "react";
import "./skillgap.css";

const SkillGapAnalysis = () => {
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const skillArray = skills.split(",").map((skill) => skill.trim().toLowerCase());

    try {
      // Assuming you have a backend API that will handle this request
      const response = await fetch("http://localhost:5000/skill-gap-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            skills: skillArray.join(","), // Convert array to space-separated string
          }),
          
        mode: "cors", // Handle CORS if necessary
      });

      if (!response.ok) {
        throw new Error("Failed to fetch skill gap data.");
      }

      const data = await response.json();
      setResult(data); // Set the result from the response
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="skill-gap-container">
      <h2>Skill Gap Analysis</h2>

      <form onSubmit={handleSubmit}>
        <label>Your Skills (comma-separated):</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (comma-separated)"
          required
        />

        <button type="submit" className="btn btn-green">
          Analyze Skill Gaps
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-container">
          <h3>Top Role Recommendations with Skill Gaps</h3>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Missing Skills</th>
              </tr>
            </thead>
            <tbody>
              {result.Recommendations.map((role, index) => (
                <tr key={index}>
                  <td>{role.Role}</td>
                  <td>
                  {role.Missing_Skills.map(skill => 
    skill.charAt(0).toUpperCase() + skill.slice(1)
  ).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis;


