"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  IconUser,
  IconBriefcase,
  IconLayers,
  IconServer,
  IconDatabase,
  IconFileSpreadsheet,
  IconBot,
  IconSparkles,
  IconBuilding,
  IconClock,
  IconGraduationCap,
  IconAward,
  IconMail,
  IconPhone,
  IconMessageCircle,
  IconLinkedin,
  IconMapPin,
  IconCopy,
  IconCheck,
  IconExternalLink,
  IconArrowUp,
  IconChevronRight,
  IconTrendingUp,
  IconShield,
  IconRocket,
  IconGlobe,
  IconSearch,
  IconFileText,
  IconActivity,
  IconX,
} from "@/components/Icons";
import { MobileSwiper } from "@/components/MobileSwiper";
import { CardSwiper } from "@/components/CardSwiper";
import AOS from "aos";

interface SkillItem {
  name: string;
  category: "infra" | "data" | "ai" | "pmo" | "strategy";
  level: string;
  proficiency: number;
  description: string;
  icon: React.ReactNode;
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  type: "it" | "operations" | "business";
  summary: string;
  highlights: string[];
  skills: string[];
  icon: React.ReactNode;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [skillCategory, setSkillCategory] = useState<string>("all");
  const [skillSearch, setSkillSearch] = useState<string>("");
  const [experienceTab, setExperienceTab] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const skillsData: SkillItem[] = [
    {
      name: "IT Infrastructure Coordination",
      category: "infra",
      level: "Core Expert",
      proficiency: 95,
      icon: <IconServer size={22} />,
      description: "End-to-end IT operational support, hardware/network ticket tracking, asset allocation, and system uptime coordination.",
    },
    {
      name: "Vendor Management",
      category: "infra",
      level: "Advanced",
      proficiency: 92,
      icon: <IconShield size={22} />,
      description: "Service-level agreement (SLA) governance, procurement follow-ups, hardware maintenance contracts, and third-party vendor coordination.",
    },
    {
      name: "Advanced Microsoft Excel",
      category: "data",
      level: "Specialist",
      proficiency: 98,
      icon: <IconFileSpreadsheet size={22} />,
      description: "Mastery of complex nested logic, XLOOKUP, INDEX/MATCH, dynamic Pivot Tables, data validation, conditional modeling, and automated workbooks.",
    },
    {
      name: "Management Information Systems (MIS)",
      category: "data",
      level: "Specialist",
      proficiency: 96,
      icon: <IconDatabase size={22} />,
      description: "Designing structured operational MIS reports, KPI trackers, executive dashboards, and weekly/monthly performance summaries for leadership.",
    },
    {
      name: "Data & Operational Analysis",
      category: "data",
      level: "Advanced",
      proficiency: 90,
      icon: <IconTrendingUp size={22} />,
      description: "Extracting actionable insights from process logs, identifying operational bottlenecks, error trend analysis, and process optimization.",
    },
    {
      name: "Prompt Engineering & GenAI",
      category: "ai",
      level: "Advanced Practitioner",
      proficiency: 94,
      icon: <IconBot size={22} />,
      description: "Crafting structured multi-turn prompts for process automation, root-cause syntheses, technical ticket drafting, and intelligent data extraction.",
    },
    {
      name: "Microsoft Copilot & AI Productivity",
      category: "ai",
      level: "Advanced",
      proficiency: 92,
      icon: <IconSparkles size={22} />,
      description: "Leveraging Copilot across Excel, Word, and enterprise communication channels to multiply administrative and operational velocity.",
    },
    {
      name: "Project Management",
      category: "pmo",
      level: "Proficient",
      proficiency: 90,
      icon: <IconLayers size={22} />,
      description: "Project scope tracking, milestone governance, task scheduling, cross-functional delivery, and risk mitigation.",
    },
    {
      name: "PMO / Project Portfolio Management",
      category: "pmo",
      level: "Proficient",
      proficiency: 88,
      icon: <IconLayers size={22} />,
      description: "Aligning cross-functional deliverables, status governance, milestone reporting, and operational execution standards across departments.",
    },
    {
      name: "Process Operations",
      category: "pmo",
      level: "Specialist",
      proficiency: 95,
      icon: <IconActivity size={22} />,
      description: "Managing high-volume knowledge-process workflows, standardized operating procedures (SOPs), quality auditing, and SLA turnaround.",
    },
    {
      name: "Customer Relationship Management (CRM)",
      category: "strategy",
      level: "Experienced",
      proficiency: 86,
      icon: <IconUser size={22} />,
      description: "Client lifecycle management, relationship nurturing, customer retention strategies, and business development communications.",
    },
    {
      name: "Business Development",
      category: "strategy",
      level: "Experienced",
      proficiency: 88,
      icon: <IconBriefcase size={22} />,
      description: "Customer acquisition, strategic market outreach, account relationship management, and commercial business expansion.",
    },
    {
      name: "Strategic Thinking",
      category: "strategy",
      level: "Advanced",
      proficiency: 91,
      icon: <IconShield size={22} />,
      description: "Data-driven problem solving, operational process mapping, resource planning, and long-term organizational efficiency.",
    },
    {
      name: "Corporate Communication",
      category: "strategy",
      level: "Advanced",
      proficiency: 90,
      icon: <IconGlobe size={22} />,
      description: "Bridging technical infrastructure teams with non-technical business leaders, executive reporting, and structured negotiation.",
    },
    {
      name: "Microsoft Word",
      category: "pmo",
      level: "Expert",
      proficiency: 94,
      icon: <IconFileText size={22} />,
      description: "Authoring comprehensive standard operating procedures (SOPs), incident reports, vendor briefs, and operational compliance documents.",
    },
  ];

  const experienceData: ExperienceItem[] = [
    {
      id: "advantmed-infra",
      role: "IT Infra Coordinator",
      company: "Advantmed India LLP",
      period: "Jun 2026 – Present",
      isCurrent: true,
      type: "it",
      icon: <IconServer size={22} />,
      summary:
        "Leading operational follow-ups and service integrity across enterprise IT infrastructure, hardware life-cycle management, and multi-vendor coordination.",
      highlights: [
        "Coordinate IT infrastructure-related activities, ensuring timely operational follow-ups and rapid ticket resolution.",
        "Support vendor coordination, contract milestone checks, and service-related communication to preserve SLA compliance.",
        "Use modern AI productivity tools, including Microsoft Copilot and prompt engineering, to accelerate operational efficiency, report generation, and incident logging.",
        "Maintain a process-focused methodology for issue coordination, stakeholder escalation paths, and comprehensive IT operational support.",
      ],
      skills: ["IT Infrastructure", "Vendor Management", "Microsoft Copilot", "Prompt Engineering", "Operational Follow-up", "MIS"],
    },
    {
      id: "advantmed-support",
      role: "Support Executive",
      company: "Advantmed India LLP",
      period: "Aug 2023 – Jun 2026",
      isCurrent: false,
      type: "operations",
      icon: <IconBuilding size={22} />,
      summary:
        "Drove day-to-day operational execution in a fast-paced professional services environment, resolving cross-functional bottlenecks and delivering MIS analytics.",
      highlights: [
        "Supported day-to-day operational workflows across professional services with high accuracy and tight turnaround times.",
        "Worked in direct synchronization with cross-functional stakeholders to coordinate tasks and resolve multifaceted operational requirements.",
        "Applied advanced Microsoft Excel, MIS systems, and analytical methodologies to support executive reporting and process enhancement initiatives.",
        "Formulated standardized tracking mechanisms that decreased recurring operational friction points.",
      ],
      skills: ["Advanced Excel", "MIS Reporting", "Process Operations", "Stakeholder Synergy", "Data Analytics"],
    },
    {
      id: "rentokil",
      role: "Sr. Executive – Operation",
      company: "Rentokil Initial",
      period: "Nov 2022 – Sep 2023",
      isCurrent: false,
      type: "operations",
      icon: <IconActivity size={22} />,
      summary:
        "Handled project portfolio and PMO-related operational execution, managing stakeholder communication and operational delivery across corporate units.",
      highlights: [
        "Directed operational coordination and on-ground execution activities within a globally recognized service enterprise.",
        "Worked closely with project portfolio management (PPM) frameworks and PMO-related operational workflows.",
        "Coordinated cross-departmental tasks and maintained transparent, continuous communication channels across internal and external stakeholders.",
        "Monitored key performance metrics and prepared regular operational status briefings for executive leadership.",
      ],
      skills: ["PMO Coordination", "Project Portfolio", "Operational Execution", "Cross-Functional Sync", "Reporting"],
    },
    {
      id: "ascendum",
      role: "Process Associate",
      company: "ASCENDUM KPS",
      period: "Dec 2021 – Nov 2022",
      isCurrent: false,
      type: "operations",
      icon: <IconFileSpreadsheet size={22} />,
      summary:
        "Specialized in structured knowledge-process outsourcing (KPO) operations with heavy emphasis on Microsoft Excel data processing and audit compliance.",
      highlights: [
        "Executed structured knowledge-process workflows while strictly adhering to rigorous quality standards and client turnaround SLAs.",
        "Harnessed advanced Microsoft Excel formulas, data hygiene, and validation techniques for high-volume operational tasks.",
        "Supported daily and weekly process handoffs, identifying anomalies and recommending procedural refinements.",
      ],
      skills: ["Microsoft Excel", "KPO Operations", "Process Workflows", "Data Verification", "SLA Delivery"],
    },
    {
      id: "lic",
      role: "Life Insurance Specialist",
      company: "Life Insurance Corporation of India (LIC)",
      period: "Mar 2019 – Jan 2022",
      isCurrent: false,
      type: "business",
      icon: <IconBriefcase size={22} />,
      summary:
        "Developed foundational customer relationship management, strategic financial planning, and client business acquisition expertise.",
      highlights: [
        "Conducted customer-centric consulting and strategic life insurance portfolio planning.",
        "Developed deep expertise in client relationship management (CRM), policy retention, and long-term business development.",
        "Maintained accurate customer financial records, renewals tracking, and comprehensive client service support.",
      ],
      skills: ["CRM", "Business Development", "Strategic Planning", "Client Advisory", "Customer Relationship"],
    },
    {
      id: "shree-bhairav",
      role: "Founder",
      company: "Shree Bhairav Traders",
      period: "Apr 2024 – Mar 2025",
      isCurrent: false,
      type: "business",
      icon: <IconRocket size={22} />,
      summary:
        "Spearheaded an entrepreneurial trading initiative, overseeing supply chain logistics, customer acquisition, vendor negotiations, and financial reconciliation.",
      highlights: [
        "Founded and operated a self-employed commercial trading venture, taking full ownership of P&L, inventory, and logistics.",
        "Managed end-to-end customer relationships, vendor contract negotiation, marketing outreach, and trade fulfillment.",
        "Handled operational coordination, invoice management, cash flow tracking, and cross-party business communication.",
      ],
      skills: ["Entrepreneurship", "Vendor Negotiation", "Logistics & Supply", "Business Communication", "P&L Management"],
    },
  ];

  // Initialize AOS & Scrollspy for active navigation state
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 50,
    });

    const handleScroll = () => {
      const sections = ["about", "skills", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = skillCategory === "all" || skill.category === skillCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
      skill.description.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredExperience = experienceData.filter((exp) => {
    if (experienceTab === "all") return true;
    if (experienceTab === "it") return exp.type === "it";
    if (experienceTab === "operations") return exp.type === "operations";
    if (experienceTab === "business") return exp.type === "business";
    return true;
  });

  return (
    <>
      {/* Top Navbar - Clean: Brand on left, ONLY About, Skills, Experience, Contact on right */}
      <header className="navbar">
        <div className="container">
          <div className="navbar-inner">
            <a href="#hero" className="nav-brand">
              <Image
                src="/rahul-avatar.jfif"
                alt="Rahul Prajapati"
                width={40}
                height={40}
                className="brand-avatar-mini"
                priority
              />
              <span>Rahul Prajapati</span>
            </a>

            <nav className="nav-menu">
              <a
                href="#about"
                className={`nav-link ${activeTab === "about" ? "active" : ""}`}
              >
                <IconUser size={16} />
                <span>About</span>
              </a>
              <a
                href="#skills"
                className={`nav-link ${activeTab === "skills" ? "active" : ""}`}
              >
                <IconLayers size={16} />
                <span>Skills</span>
              </a>
              <a
                href="#experience"
                className={`nav-link ${activeTab === "experience" ? "active" : ""}`}
              >
                <IconBriefcase size={16} />
                <span>Experience</span>
              </a>
              <a
                href="#contact"
                className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
              >
                <IconMail size={16} />
                <span>Contact</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <section className="hero-section" id="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-text-col" data-aos="fade-right">
                <div className="hero-badge-wrap">
                  <div className="status-pill">
                    <span className="pulse-dot"></span>
                    {/* <IconGlobe size={15} color="var(--accent-sky)" className="status-pill-icon" /> */}
                    <span className="status-pill-text">Available for Global Roles • IT Infra & MIS Specialist</span>
                  </div>
                </div>

                <h1 className="hero-title">
                  Hi, I'm <span className="gradient-text">Rahul Prajapati</span>
                </h1>

                <p className="hero-subtitle">
                  IT Infrastructure Coordinator | Data & MIS | Operations | Advanced Excel | AI & Process Automation
                </p>

                <p className="hero-lead">
                  Currently coordinating enterprise IT infrastructure, vendor SLA adherence, and AI-enabled process operations at{" "}
                  <strong style={{ color: "var(--text-heading)" }}>Advantmed India LLP</strong>. Bringing a cross-functional,
                  analytical, and process-focused approach to operational support, reporting, and enterprise systems.
                </p>

                <div className="hero-ctas">
                  <a href="#experience" className="btn btn-primary">
                    <IconBriefcase size={17} />
                    <span>View Experience</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/rahul-prajapati-619b37244"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <IconLinkedin size={17} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Hero Portrait Visual */}
              <div className="hero-visual-col" data-aos="fade-left" data-aos-delay="100">
                <div className="hero-visual-card">
                  <div className="hero-floating-badge floating-badge-top">
                    <div className="floating-badge-icon-box">
                      <IconServer size={18} />
                    </div>
                    <div>
                      <div className="floating-badge-title">Current Role</div>
                      <div className="floating-badge-val">IT Infra Coordinator</div>
                    </div>
                  </div>

                  <div className="hero-img-container">
                    <Image
                      src="/rahul-avatar.jfif"
                      alt="Rahul Prajapati - IT Infrastructure Coordinator"
                      width={500}
                      height={500}
                      className="hero-img"
                      priority
                    />
                  </div>

                  <div className="hero-floating-badge floating-badge-bottom">
                    <div className="floating-badge-icon-box">
                      <IconBot size={18} />
                    </div>
                    <div>
                      <div className="floating-badge-title">AI & Productivity</div>
                      <div className="floating-badge-val">Copilot & Prompt Eng.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick KPI Counters - Responsive Swiper on Mobile / Grid on Desktop */}
            <div data-aos="fade-up" data-aos-delay="200" style={{ marginTop: "40px" }}>
              <MobileSwiper desktopGridClass="kpi-grid" id="kpi-swiper" cardWidthMobile="72vw">
                <div className="kpi-card">
                  <div className="kpi-icon-box">
                    <IconClock size={26} />
                  </div>
                  <div>
                    <div className="kpi-number">7+ Years</div>
                    <div className="kpi-label">Mar 2019 – Present</div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box">
                    <IconBuilding size={26} />
                  </div>
                  <div>
                    <div className="kpi-number">6 Roles</div>
                    <div className="kpi-label">5 Leading Organizations</div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box">
                    <IconLayers size={26} />
                  </div>
                  <div>
                    <div className="kpi-number">15 Skills</div>
                    <div className="kpi-label">Core Technical Competencies</div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box">
                    <IconGlobe size={26} />
                  </div>
                  <div>
                    <div className="kpi-number">Global Ready</div>
                    <div className="kpi-label">Open to International Relocation</div>
                  </div>
                </div>
              </MobileSwiper>
            </div>
          </div>
        </section>

        {/* 1. ABOUT SECTION */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-tag">
                <IconUser size={14} />
                <span>Executive Background</span>
              </span>
              <h2 className="section-title">
                About <span className="gradient-text">Rahul Prajapati</span>
              </h2>
              <p className="section-desc">
                IT and operations professional with experience across IT infrastructure coordination, data/MIS support,
                process operations, project coordination, insurance, and customer-facing business functions. Currently
                working as an IT Infra Coordinator at Advantmed India LLP, with strengths in Excel, MIS, analytical thinking,
                vendor management, prompt engineering and AI productivity tools.
              </p>
            </div>

            {/* 4 Strategic Value Pillars - Responsive Auto Swiper on Desktop, Tablet & Mobile */}
            <div data-aos="fade-up" data-aos-delay="100">
              <CardSwiper id="about-pillars" cardWidthMobile="85vw" autoplay={true} autoplayInterval={3200}>
                <div className="glass-card pillar-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box">
                      <IconServer size={22} />
                    </div>
                    <div>
                      <h3 className="pillar-title">IT Infrastructure & Vendor Synergy</h3>
                    </div>
                  </div>
                  <p>
                    Specialized in tracking infrastructure tickets, hardware allocation, network availability follow-ups, and
                    managing critical third-party vendor SLAs to prevent downtime.
                  </p>
                  <div className="pillar-tags">
                    <span className="pillar-tag">Vendor SLAs</span>
                    <span className="pillar-tag">Asset Tracking</span>
                    <span className="pillar-tag">Operational Follow-up</span>
                  </div>
                </div>

                <div className="glass-card pillar-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box">
                      <IconFileSpreadsheet size={22} />
                    </div>
                    <div>
                      <h3 className="pillar-title">Advanced Excel & MIS Intelligence</h3>
                    </div>
                  </div>
                  <p>
                    Expertise in transforming raw operational logs into high-clarity executive MIS dashboards, automating
                    recurring reports, and delivering actionable operational analytics.
                  </p>
                  <div className="pillar-tags">
                    <span className="pillar-tag">XLOOKUP / Index-Match</span>
                    <span className="pillar-tag">Pivot Dashboards</span>
                    <span className="pillar-tag">Data Hygiene</span>
                  </div>
                </div>

                <div className="glass-card pillar-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box">
                      <IconBot size={22} />
                    </div>
                    <div>
                      <h3 className="pillar-title">AI Productivity & Prompt Engineering</h3>
                    </div>
                  </div>
                  <p>
                    Active user of Microsoft Copilot and advanced prompt engineering to drastically cut administrative overhead,
                    automate ticket briefs, and synthesize complex operational data.
                  </p>
                  <div className="pillar-tags">
                    <span className="pillar-tag">Microsoft Copilot</span>
                    <span className="pillar-tag">Context Prompting</span>
                    <span className="pillar-tag">Workflow Acceleration</span>
                  </div>
                </div>

                <div className="glass-card pillar-card">
                  <div className="pillar-header">
                    <div className="pillar-icon-box">
                      <IconLayers size={22} />
                    </div>
                    <div>
                      <h3 className="pillar-title">PMO & Stakeholder Coordination</h3>
                    </div>
                  </div>
                  <p>
                    Cross-functional background bridging technical teams, operations managers, external vendors, and executive
                    sponsors to ensure projects finish on schedule.
                  </p>
                  <div className="pillar-tags">
                    <span className="pillar-tag">PMO Governance</span>
                    <span className="pillar-tag">Executive Briefings</span>
                    <span className="pillar-tag">Cross-functional Sync</span>
                  </div>
                </div>
              </CardSwiper>
            </div>

            {/* Academic & Mobility Credentials Card */}
            <div className="about-credentials-grid" data-aos="fade-up" data-aos-delay="200">
              <div className="glass-card about-credential-card">
                <div className="pillar-icon-box">
                  <IconGraduationCap size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>
                    Bachelor of Arts (B.A.), Economics
                  </h4>
                  <div style={{ color: "var(--accent-sky)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
                    Gujarat University, Ahmedabad • Mar 2017 – Jul 2020
                  </div>
                  <span className="badge-first-class">
                    <IconAward size={13} />
                    <span>First Class Distinction</span>
                  </span>
                  <p style={{ fontSize: "0.875rem", marginTop: "10px" }}>
                    Deep economic and statistical foundation empowering analytical decision-making and quantitative operational models.
                  </p>
                </div>
              </div>

              <div className="glass-card about-credential-card">
                <div className="pillar-icon-box">
                  <IconGlobe size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>
                    Global Mobility & Relocation Readiness
                  </h4>
                  <div style={{ color: "var(--accent-sky)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "8px" }}>
                    Ready for International Deployments & Onsite Roles
                  </div>
                  <span className="pillar-tag" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                    Open to Relocate
                  </span>
                  <p style={{ fontSize: "0.875rem", marginTop: "10px" }}>
                    Actively open to opportunities across Middle East, Europe, Southeast Asia, North America, and major Indian tech hubs.
                  </p>
                </div>
              </div>
            </div>

            {/* Career Focus from Resume */}
            <div className="glass-card" style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="pillar-icon-box" style={{ width: "42px", height: "42px" }}>
                  <IconShield size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>CAREER FOCUS</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Core areas of specialization & continuous operational value</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span className="pillar-tag">IT Infrastructure Coordination</span>
                <span className="pillar-tag">Data / MIS</span>
                <span className="pillar-tag">Operations</span>
                <span className="pillar-tag">PMO / Project Coordination</span>
                <span className="pillar-tag">Process Support</span>
                <span className="pillar-tag">AI-Enabled Productivity</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SKILLS SECTION */}
        <section className="section" id="skills">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-tag">
                <IconLayers size={14} />
                <span>Core Competencies</span>
              </span>
              <h2 className="section-title">
                Technical & <span className="gradient-text">Operational Skills</span>
              </h2>
              <p className="section-desc">
                Complete 15-skill matrix covering IT systems, data analytics, AI integration, and project governance.
              </p>
            </div>

            <div className="skills-filter-bar" data-aos="fade-up" data-aos-delay="100">
              <div className="skills-pills">
                <button
                  className={`skill-filter-btn ${skillCategory === "all" ? "active" : ""}`}
                  onClick={() => setSkillCategory("all")}
                >
                  <IconSparkles size={15} />
                  <span>All ({skillsData.length})</span>
                </button>
                <button
                  className={`skill-filter-btn ${skillCategory === "infra" ? "active" : ""}`}
                  onClick={() => setSkillCategory("infra")}
                >
                  <IconServer size={15} />
                  <span>IT Infra & Vendors</span>
                </button>
                <button
                  className={`skill-filter-btn ${skillCategory === "data" ? "active" : ""}`}
                  onClick={() => setSkillCategory("data")}
                >
                  <IconDatabase size={15} />
                  <span>Data, MIS & Excel</span>
                </button>
                <button
                  className={`skill-filter-btn ${skillCategory === "ai" ? "active" : ""}`}
                  onClick={() => setSkillCategory("ai")}
                >
                  <IconBot size={15} />
                  <span>AI & Productivity</span>
                </button>
                <button
                  className={`skill-filter-btn ${skillCategory === "pmo" ? "active" : ""}`}
                  onClick={() => setSkillCategory("pmo")}
                >
                  <IconLayers size={15} />
                  <span>PMO & Operations</span>
                </button>
                <button
                  className={`skill-filter-btn ${skillCategory === "strategy" ? "active" : ""}`}
                  onClick={() => setSkillCategory("strategy")}
                >
                  <IconUser size={15} />
                  <span>Strategy & CRM</span>
                </button>
              </div>

            
            </div>

            {/* Responsive Skills Swiper across Desktop, Tablet & Mobile */}
            <div data-aos="fade-up" data-aos-delay="150">
              <CardSwiper id="skills-swiper" cardWidthMobile="82vw" autoplay={true} autoplayInterval={3500}>
                {filteredSkills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-card-top">
                      <div className="skill-name-wrap">
                        <div className="skill-icon-box">{skill.icon}</div>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-level-badge">{skill.level}</span>
                    </div>
                    <p className="skill-desc">{skill.description}</p>
                    <div className="skill-progress-track">
                      <div
                        className="skill-progress-bar"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardSwiper>
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCE SECTION */}
        <section className="section" id="experience">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-tag">
                <IconBriefcase size={14} />
                <span>Career History</span>
              </span>
              <h2 className="section-title">
                Professional <span className="gradient-text">Experience</span>
              </h2>
              <p className="section-desc">
                Demonstrated success across IT infrastructure operations, enterprise PMO environments, KPO organizations,
                and business development.
              </p>
            </div>

            <div className="timeline-tabs" data-aos="fade-up" data-aos-delay="100">
              <button
                className={`timeline-tab-btn ${experienceTab === "all" ? "active" : ""}`}
                onClick={() => setExperienceTab("all")}
              >
                <IconBriefcase size={15} />
                <span>All Roles ({experienceData.length})</span>
              </button>
              <button
                className={`timeline-tab-btn ${experienceTab === "it" ? "active" : ""}`}
                onClick={() => setExperienceTab("it")}
              >
                <IconServer size={15} />
                <span>IT Infrastructure</span>
              </button>
              <button
                className={`timeline-tab-btn ${experienceTab === "operations" ? "active" : ""}`}
                onClick={() => setExperienceTab("operations")}
              >
                <IconActivity size={15} />
                <span>Operations, PMO & KPO</span>
              </button>
              <button
                className={`timeline-tab-btn ${experienceTab === "business" ? "active" : ""}`}
                onClick={() => setExperienceTab("business")}
              >
                <IconRocket size={15} />
                <span>Business & Ventures</span>
              </button>
            </div>

            {/* Desktop Vertical Timeline */}
            <div className="desktop-timeline-only" data-aos="fade-up" data-aos-delay="150">
              <div className="timeline-container">
                {filteredExperience.map((item) => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-marker">{item.icon}</div>

                    <div
                      className="exp-card exp-card-interactive"
                      onClick={() => setSelectedExperience(item)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="exp-header">
                        <div>
                          <h3 className="exp-role-title">{item.role}</h3>
                          <div className="exp-company">
                            <IconBuilding size={16} />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        <div>
                          <span
                            className={`exp-period-badge ${
                              item.isCurrent ? "current" : ""
                            }`}
                          >
                            {item.isCurrent && <span className="pulse-dot"></span>}
                            <IconClock size={14} />
                            <span>{item.period}</span>
                          </span>
                        </div>
                      </div>

                      <p style={{ marginBottom: "14px", color: "var(--text-muted)" }}>
                        {item.summary}
                      </p>

                      {/* Display primary 2 key bullet points in card */}
                      <ul className="exp-bullets">
                        {item.highlights.slice(0, 2).map((bullet, bIndex) => (
                          <li key={bIndex} className="exp-bullet-item">
                            <span className="exp-bullet-icon">
                              <IconChevronRight size={15} />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="exp-footer-row">
                        <div className="exp-tags">
                          {item.skills.slice(0, 4).map((tag, tIndex) => (
                            <span key={tIndex} className="exp-tag">
                              {tag}
                            </span>
                          ))}
                          {item.skills.length > 4 && (
                            <span className="exp-tag exp-tag-more">+{item.skills.length - 4} more</span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="exp-view-details-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedExperience(item);
                          }}
                        >
                          <span>View Details</span>
                          <IconExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Native Card Swiper */}
            <div className="mobile-timeline-swiper-only">
              <MobileSwiper id="mobile-exp-swiper" cardWidthMobile="88vw">
                {filteredExperience.map((item) => (
                  <div
                    key={item.id}
                    className="exp-card exp-card-interactive"
                    onClick={() => setSelectedExperience(item)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="exp-header">
                      <div>
                        <h3 className="exp-role-title">{item.role}</h3>
                        <div className="exp-company">
                          <IconBuilding size={16} />
                          <span>{item.company}</span>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`exp-period-badge ${
                            item.isCurrent ? "current" : ""
                          }`}
                        >
                          {item.isCurrent && <span className="pulse-dot"></span>}
                          <IconClock size={14} />
                          <span>{item.period}</span>
                        </span>
                      </div>
                    </div>

                    <p style={{ marginBottom: "14px", color: "var(--text-muted)" }}>
                      {item.summary}
                    </p>

                    <ul className="exp-bullets">
                      {item.highlights.slice(0, 2).map((bullet, bIndex) => (
                        <li key={bIndex} className="exp-bullet-item">
                          <span className="exp-bullet-icon">
                            <IconChevronRight size={15} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="exp-footer-row">
                      <div className="exp-tags">
                        {item.skills.slice(0, 3).map((tag, tIndex) => (
                          <span key={tIndex} className="exp-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="exp-view-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExperience(item);
                        }}
                      >
                        <span>Details</span>
                        <IconExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </MobileSwiper>
            </div>
          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-tag">
                <IconPhone size={14} />
                <span>Direct Connection</span>
              </span>
              <h2 className="section-title">
                Get In <span className="gradient-text">Touch Directly</span>
              </h2>
              <p className="section-desc">
                Reach out directly via phone, WhatsApp, email, or LinkedIn to discuss IT infrastructure coordination, MIS
                leadership, or operations opportunities.
              </p>
            </div>

            {/* Redesigned Executive Contact Section */}
            <div className="contact-unified-layout" data-aos="fade-up" data-aos-delay="100">
              {/* Primary 4 Direct Channels */}
              <div className="contact-channels-grid">
                {/* Email Card */}
                <div className="contact-channel-card">
                  <div className="channel-icon-pill email">
                    <IconMail size={22} />
                  </div>
                  <div className="channel-info">
                    <div className="channel-label">Direct Email</div>
                    <a href="mailto:rp361133@gmail.com" className="channel-primary-val">
                      rp361133@gmail.com
                    </a>
                    <div className="channel-sub">Send job opportunities, interview requests, or official documentation.</div>
                  </div>
                  <div className="channel-btns">
                    <a href="mailto:rp361133@gmail.com" className="channel-action-btn primary">
                      <IconMail size={15} />
                      <span>Compose</span>
                    </a>
                    <button
                      className="channel-action-btn copy"
                      onClick={() => copyToClipboard("rp361133@gmail.com", "Email")}
                      title="Copy Email"
                    >
                      <IconCopy size={15} />
                    </button>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="contact-channel-card">
                  <div className="channel-icon-pill phone">
                    <IconPhone size={22} />
                  </div>
                  <div className="channel-info">
                    <div className="channel-label">Mobile Phone</div>
                    <a href="tel:+917874691098" className="channel-primary-val">
                      +91 7874691098
                    </a>
                    <div className="channel-sub">Available for phone discussions, recruiter calls, and initial screenings.</div>
                  </div>
                  <div className="channel-btns">
                    <a href="tel:+917874691098" className="channel-action-btn primary">
                      <IconPhone size={15} />
                      <span>Call</span>
                    </a>
                    <button
                      className="channel-action-btn copy"
                      onClick={() => copyToClipboard("7874691098", "Phone")}
                      title="Copy Phone"
                    >
                      <IconCopy size={15} />
                    </button>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="contact-channel-card">
                  <div className="channel-icon-pill whatsapp">
                    <IconMessageCircle size={22} />
                  </div>
                  <div className="channel-info">
                    <div className="channel-label">WhatsApp Messenger</div>
                    <div className="channel-primary-val">+91 7874691098</div>
                    <div className="channel-sub">Immediate text inquiries, quick schedule coordination, or file sharing.</div>
                  </div>
                  <div className="channel-btns">
                    <a
                      href="https://wa.me/917874691098?text=Hi%20Rahul,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20an%20opportunity."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-action-btn whatsapp-btn"
                    >
                      <IconMessageCircle size={15} />
                      <span>Message</span>
                    </a>
                  </div>
                </div>

                {/* LinkedIn Card */}
                <div className="contact-channel-card">
                  <div className="channel-icon-pill linkedin">
                    <IconLinkedin size={22} />
                  </div>
                  <div className="channel-info">
                    <div className="channel-label">LinkedIn Profile</div>
                    <div className="channel-primary-val">rahul-prajapati-619b37244</div>
                    <div className="channel-sub">Recommendations, professional endorsements, and career connection.</div>
                  </div>
                  <div className="channel-btns">
                    <a
                      href="https://linkedin.com/in/rahul-prajapati-619b37244"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-action-btn linkedin-btn"
                    >
                      <IconExternalLink size={15} />
                      <span>Connect</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobility & Relocation Feature Banner */}
              <div className="contact-mobility-banner">
                <div className="mobility-icon-box">
                  <IconMapPin size={24} />
                </div>
                <div className="mobility-text">
                  <div className="mobility-badge">
                    <span className="pulse-dot"></span>
                    <span>GLOBAL MOBILITY READY</span>
                  </div>
                  <h3 className="mobility-heading">
                    Based in Ahmedabad, Gujarat, India • Open to Relocation
                  </h3>
                  <p className="mobility-desc">
                    Prepared for international relocations and onsite deployments across the Middle East (Dubai/UAE, Saudi Arabia, Qatar),
                    Europe, Southeast Asia, North America, and major tech hubs across India.
                  </p>
                </div>
              
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* NATIVE MOBILE APPLICATION BOTTOM NAVIGATION BAR (About, Skills, Experience, Contact) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <a
          href="#about"
          className={`mobile-nav-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <div className="mobile-nav-icon-wrap">
            <IconUser size={19} />
          </div>
          <span>About</span>
        </a>

        <a
          href="#skills"
          className={`mobile-nav-tab ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          <div className="mobile-nav-icon-wrap">
            <IconLayers size={19} />
          </div>
          <span>Skills</span>
        </a>

        <a
          href="#experience"
          className={`mobile-nav-tab ${activeTab === "experience" ? "active" : ""}`}
          onClick={() => setActiveTab("experience")}
        >
          <div className="mobile-nav-icon-wrap">
            <IconBriefcase size={19} />
          </div>
          <span>Experience</span>
        </a>

        <a
          href="#contact"
          className={`mobile-nav-tab ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <div className="mobile-nav-icon-wrap">
            <IconPhone size={19} />
          </div>
          <span>Contact</span>
        </a>
      </nav>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-copy">
              © 2026 Rahul Prajapati • IT Infrastructure Coordinator & MIS Operations Specialist.
              All rights reserved.
            </div>

            <ul className="footer-links">
              <li>
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="footer-link">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="footer-link">
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>

            <button
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <IconArrowUp size={15} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Experience Detail Popup Modal */}
      {selectedExperience && (
        <div
          className="exp-modal-backdrop"
          onClick={() => setSelectedExperience(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="exp-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="exp-modal-close-btn"
              onClick={() => setSelectedExperience(null)}
              aria-label="Close modal"
            >
              <IconX size={20} />
            </button>

            <div className="exp-modal-header">
              <div className="exp-modal-icon-wrap">
                {selectedExperience.icon}
              </div>
              <div className="exp-modal-titles">
                <span className={`exp-period-badge ${selectedExperience.isCurrent ? "current" : ""}`}>
                  {selectedExperience.isCurrent && <span className="pulse-dot"></span>}
                  <IconClock size={14} />
                  <span>{selectedExperience.period}</span>
                </span>
                <h3 className="exp-modal-role">{selectedExperience.role}</h3>
                <div className="exp-modal-company">
                  <IconBuilding size={16} />
                  <span>{selectedExperience.company}</span>
                </div>
              </div>
            </div>

            <div className="exp-modal-body">
              <div className="exp-modal-section">
                <h4 className="exp-modal-section-title">Overview & Impact</h4>
                <p className="exp-modal-summary">{selectedExperience.summary}</p>
              </div>

              <div className="exp-modal-section">
                <h4 className="exp-modal-section-title">Key Responsibilities & Deliverables</h4>
                <ul className="exp-modal-bullets">
                  {selectedExperience.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="exp-modal-bullet-item">
                      <span className="exp-bullet-icon">
                        <IconChevronRight size={16} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="exp-modal-section">
                <h4 className="exp-modal-section-title">Skills & Competencies Demonstrated</h4>
                <div className="exp-modal-tags">
                  {selectedExperience.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="exp-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="exp-modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedExperience(null)}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <IconCheck size={18} color="var(--accent-emerald)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
