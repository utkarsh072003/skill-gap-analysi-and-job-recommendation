import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./Hst";
import About from "./about";
import Contact from "./contact";
import JobRecommendation from "./ndf";
import SkillGapAnalysis from "./skillgap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/jobs" element={<JobRecommendation />} />
        <Route path="/skill-gap" element={<SkillGapAnalysis />} />
      </Route>
    </Routes>
  );
};

export default App;
