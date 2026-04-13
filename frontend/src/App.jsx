import { useEffect, useState } from "react";
import { profile } from "./config/profile.js";
import { fetchEducation, fetchExperience, fetchSkills } from "./api/client.js";
import portfolioFallback from "./data/portfolioFallback.json";
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
  /** True when live API failed and bundled JSON is shown (e.g. GitHub Pages). */
  const [usingOfflineData, setUsingOfflineData] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      setUsingOfflineData(false);
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
      } catch {
        if (!cancelled) {
          setSkills(portfolioFallback.skills);
          setExperience(portfolioFallback.experience);
          setEducation(portfolioFallback.education);
          setUsingOfflineData(true);
          setError("");
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
      {usingOfflineData && (
        <div className="border-b border-teal-200 bg-teal-50 px-6 py-2 text-center text-xs text-teal-950 md:text-sm">
          Showing bundled resume data (no Java API on this host). When you run the gateway locally or set{" "}
          <code className="rounded bg-white/80 px-1">VITE_API_BASE_URL</code> for a hosted API, the live service
          is used instead.
        </div>
      )}
      <main>
        <Hero profile={profile} />
        <SkillsSection
          categories={skills}
          softSkills={profile.softSkills}
          loading={loading}
          error={error}
          usingOfflineData={usingOfflineData}
        />
        <ExperienceSection entries={experience} loading={loading} error={error} />
        <EducationSection entries={education} loading={loading} error={error} />
        <ContactSection profile={profile} useMailtoFallback={usingOfflineData} />
        <ShareQrSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
