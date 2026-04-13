package com.portfolio.portfolio.service;

import com.portfolio.portfolio.model.EducationEntry;
import com.portfolio.portfolio.model.ExperienceEntry;
import com.portfolio.portfolio.model.SkillCategory;
import com.portfolio.portfolio.model.SkillItem;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 * Central place for resume-backed portfolio data. Replace the lists below with your own content
 * or later load from a database or YAML file.
 */
@Repository
public class PortfolioDataRepository {

  public List<SkillCategory> findAllSkillCategories() {
    return List.of(
        new SkillCategory(
            "Programming Languages",
            List.of(
                skill("Java", 98),
                skill("JavaScript", 85),
                skill("Python", 82),
                skill("PL/SQL", 88),
                skill("SQL", 90),
                skill("Shell Scripting", 80),
                skill("Unix", 78))),
        new SkillCategory(
            "Cloud & DevOps",
            List.of(
                skill("Docker", 92),
                skill("Kubernetes", 90),
                skill("AWS", 80),
                skill("Jenkins / CI/CD", 88),
                skill("REST APIs", 95),
                skill("SOAP Services", 85),
                skill("Kafka", 82),
                skill("Microservices", 95))),
        new SkillCategory(
            "Backend Frameworks",
            List.of(
                skill("Spring Boot", 98),
                skill("Spring MVC", 88),
                skill("Hibernate", 90),
                skill("JSF", 75),
                skill("Spring Microservices", 95),
                skill("Struts", 70))),
        new SkillCategory(
            "Databases",
            List.of(skill("VoltDB", 75), skill("Oracle", 90), skill("MySQL", 85))),
        new SkillCategory(
            "Testing & QA",
            List.of(
                skill("Karate", 88),
                skill("Cucumber", 85),
                skill("JMeter", 82),
                skill("Regression & API test automation", 88))),
        new SkillCategory(
            "Practices & Domains",
            List.of(
                skill("Agile / Scrum", 92),
                skill("SDLC & design patterns", 90),
                skill("Distributed & HA systems", 88),
                skill("Telecom (4G/5G)", 92),
                skill("Insurance", 85),
                skill("Manufacturing & logistics", 78))),
        new SkillCategory(
            "Observability",
            List.of(skill("Kibana", 85), skill("Grafana", 82), skill("Prometheus", 80))),
        new SkillCategory(
            "GenAI tooling",
            List.of(
                skill("Cursor", 90),
                skill("GitHub Copilot", 88),
                skill("Claude / Gemini", 80),
                skill("Notebook LLM / Gamma", 75))));
  }

  public List<ExperienceEntry> findAllExperience() {
    return List.of(
        new ExperienceEntry(
            "Amdocs Malaysia",
            "Senior Software Specialist",
            "Jun 2023 – Present",
            "Kuala Lumpur, Malaysia",
            List.of(
                "Use GenAI tools (Cursor, Copilot) in development with strong data-security practices.",
                "Built GenAI-assisted tools such as CDR analyzer, PCAP analyzer, and log flow generators for faster root-cause analysis.",
                "Ran data-analytics surveys to find time-heavy workflows and automated them with GenAI.",
                "Technical lead on backend initiatives: architecture, standards, and mentoring engineers.",
                "Partnered with product, frontend, QA, and DevOps to ship reliable features on schedule.",
                "Resolved critical customer escalations with JMeter, SOAP, Karate, curl, and deep product knowledge.",
                "Elastic Stack for KPIs, monitoring, and alerting; Docker/Kubernetes for deploy and rollback.",
                "Cross-functional initiatives between support and other teams to improve product understanding.")),
        new ExperienceEntry(
            "Openet Malaysia",
            "Senior Software Engineer",
            "Dec 2019 – Jun 2023",
            "Malaysia",
            List.of(
                "Designed scalable distributed microservices with REST for high-traffic, business-critical workloads.",
                "Event-driven backends with Kafka-style messaging for reliable service communication.",
                "Production engineering: bug fixes across products and diverse customer environments.",
                "CI/CD with Jenkins, GitHub, or AWS CodePipeline; IAM for access management.",
                "4G/5G network configuration reviews aligned with 3GPP; performance tuning and thread synchronization.",
                "5G usage monitoring via Java microservices in containers; Cucumber/Karate QA; Jenkins pipelines.")),
        new ExperienceEntry(
            "KGISL Malaysia",
            "Senior Associate",
            "Jul 2019 – Nov 2019",
            "Malaysia (Client: Allianz Insurance)",
            List.of(
                "Agile delivery across full-stack Oracle ADF development for Allianz Malaysia.",
                "Built auto-renewal in Oracle ADF, replacing manual renewal for users.",
                "Performance tuning for PL/SQL batches and the application layer.",
                "Bug-free deliveries for new product lines across two modules.")),
        new ExperienceEntry(
            "Majesco Malaysia",
            "Senior Software Engineer",
            "Aug 2017 – Jul 2019",
            "Malaysia (Client: PruBSN Takaful)",
            List.of(
                "Led migration of the Alpha project from Informix legacy to Java (Spring Boot, Hibernate).",
                "Delivered enhancements for the Anugerah product line and an investigation project for fraudulent claims.",
                "Drools and Jasper Reports for claims calculations and correspondence.",
                "Technical team lead: requirements, delivery oversight, peer reviews, and stakeholder communication.",
                "Recognized by the client for on-time delivery and clear communication.")),
        new ExperienceEntry(
            "Cognizant Technology Solutions",
            "Associate",
            "Dec 2013 – Jun 2017",
            "Chennai, India",
            List.of(
                "Pricing and quotation modules for gas and power; bulk upload for automated meter reads.",
                "L2/L3 support for pricing, billing, and SCM for Total Gas & Power.",
                "Java (JSF, Spring MVC), JCAPS integrations, UNIX batches, SQL/PL/SQL maintenance.")));
  }

  public List<EducationEntry> findAllEducation() {
    return List.of(
        new EducationEntry(
            "Master of Business Administration (Data Science)",
            "Manipal Academy of Higher Education, Bangalore",
            "Oct 2025 – Oct 2027 (in progress)",
            List.of("Focus on data science alongside leadership and analytical decision-making.")),
        new EducationEntry(
            "Bachelor of Engineering (Electrical & Electronics Engineering)",
            "Sri Shakthi Institute of Engineering & Technology, Coimbatore",
            "Aug 2009 – May 2013",
            List.of("CGPA: 8.24")),
        new EducationEntry(
            "Professional development & certifications",
            "Various",
            "Ongoing",
            List.of(
                "Google Data Analyst certificate.",
                "LinkedIn-certified Kubernetes and Docker (with production experience).",
                "Python for data analytics; Oracle ADF training.",
                "GenAI training: Cursor, Copilot, Gemini, Claude with secure usage patterns.",
                "Leadership, mentoring, and business-analyst style stakeholder engagement.")));
  }

  private static SkillItem skill(String name, int proficiency) {
    return new SkillItem(name, proficiency);
  }
}
