import { useEffect, useState } from "react";
import { profile } from "./config/profile.js";
import { fetchEducation, fetchExperience, fetchSkills } from "./api/client.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import EducationSection from "./components/EducationSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import ShareQrSection from "./components/ShareQrSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [s, e, ed] = await Promise.all([
          fetchSkills(),
          fetchExperience(),
          fetchEducation(),
        ]);
        if (!cancelled) {
          setSkills(s);
          setExperience(e);
          setEducation(ed);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            "Unable to reach the portfolio API. Start the API gateway (8080), portfolio-service (8081), and contact-service (8082), then refresh.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <SkillsSection
          categories={skills}
          softSkills={profile.softSkills}
          loading={loading}
          error={error}
        />
        <ExperienceSection entries={experience} loading={loading} error={error} />
        <EducationSection entries={education} loading={loading} error={error} />
        <ContactSection profile={profile} />
        <ShareQrSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
