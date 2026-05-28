import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ExternalLink, Linkedin } from "lucide-react";
import {
  profileData as fallbackProfileData,
  publications as fallbackPublications,
  type ProfileData,
  type Publication,
} from "@shared/profile-data";
import { useEffect, useMemo, useRef, useState } from "react";
import heroWaterImage from "../assets/mywork.png";

const institutionDomains = [
  { pattern: "asian development bank", domain: "adb.org" },
  { pattern: "durham university", domain: "durham.ac.uk" },
  { pattern: "jami university", domain: "jami.edu.af" },
  { pattern: "kabul polytechnic university", domain: "kpu.edu.af" },
  { pattern: "kabul university", domain: "ku.edu.af" },
  { pattern: "kazakh-german university", domain: "dku.kz" },
  { pattern: "national water affairs regulation authority", domain: "nwara.gov.af" },
  { pattern: "nwara", domain: "nwara.gov.af" },
  { pattern: "nazarbayev university", domain: "nu.edu.kz" },
  { pattern: "regional environmental centre for central asia", domain: "carececo.org" },
  { pattern: "royal academy of engineering", domain: "raeng.org.uk" },
  { pattern: "stockholm international peace research institute", domain: "sipri.org" },
  { pattern: "comparative morocco-afghanistan water management study", domain: "unesco.org" },
  { pattern: "unesco chair on water management in central asia", domain: "unesco.org" },
  { pattern: "university of central asia", domain: "ucentralasia.org" },
  { pattern: "usaid", domain: "usaid.gov" },
];

function logoSourcesForInstitution(label: string) {
  const normalizedLabel = label.toLowerCase();
  const matched = institutionDomains.find((item) => normalizedLabel.includes(item.pattern));
  if (!matched) {
    return [];
  }

  return [
    `https://logo.clearbit.com/${matched.domain}?size=256`,
    `https://www.google.com/s2/favicons?domain=${matched.domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${matched.domain}.ico`,
  ];
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function InstitutionLogo({ label }: { label: string }) {
  const sources = useMemo(() => logoSourcesForInstitution(label), [label]);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(sources.length === 0);

  if (showFallback) {
    return (
      <div className="w-5 h-5 rounded-full border border-border bg-background/70 text-[9px] font-bold text-primary flex items-center justify-center flex-shrink-0">
        {initialsFromName(label)}
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={`${label} logo`}
      loading="lazy"
      className="w-5 h-5 rounded-full border border-border bg-background/70 p-0.5 object-contain flex-shrink-0"
      onError={() => {
        const nextIndex = sourceIndex + 1;
        if (nextIndex < sources.length) {
          setSourceIndex(nextIndex);
          return;
        }
        setShowFallback(true);
      }}
    />
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"experience" | "publications" | "skills">("experience");
  const [profile, setProfile] = useState<ProfileData>(fallbackProfileData);
  const [publicationList, setPublicationList] = useState<Publication[]>(fallbackPublications);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadApiData = async () => {
      try {
        const [profileRes, publicationsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/publications"),
        ]);

        if (!profileRes.ok || !publicationsRes.ok) {
          throw new Error("API unavailable");
        }

        const [profileJson, publicationsJson] = await Promise.all([
          profileRes.json() as Promise<ProfileData>,
          publicationsRes.json() as Promise<Publication[]>,
        ]);

        if (!cancelled) {
          setProfile(profileJson);
          setPublicationList(publicationsJson);
        }
      } catch {
        if (!cancelled) {
          setProfile(fallbackProfileData);
          setPublicationList(fallbackPublications);
        }
      }
    };

    loadApiData();
    return () => {
      cancelled = true;
    };
  }, []);

  const fullPublicationList = useMemo(() => [...publicationList].sort((a, b) => b.year - a.year), [publicationList]);
  const hasDuplicateIdentity =
    profile.name.trim().length > 0 &&
    profile.name.trim().toLowerCase() === profile.headline.trim().toLowerCase();
  const showNavName = !hasDuplicateIdentity || !isHeroVisible;
  const emailHref = `mailto:${profile.contactEmail}`;
  const xProfileUrl = "https://x.com/daudhamidi";
  const sectionClass = "py-14 lg:py-20";
  const sectionContainerClass = "container space-y-12";
  const compactSectionClass = "py-10 lg:py-14";

  useEffect(() => {
    const heroElement = heroSectionRef.current;
    if (!heroElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        // Offset for sticky nav height so the name appears slightly before hero fully leaves view.
        rootMargin: "-64px 0px 0px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(heroElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className={`container flex items-center h-16 ${showNavName ? "justify-between" : "justify-end"}`}>
          {showNavName && <div className="text-xl font-bold gradient-text">{profile.name}</div>}
          <div className="flex gap-6">
            <a href="#expertise" className="text-sm font-medium hover:text-primary transition-colors">Expertise</a>
            <a
              href="#experience"
              onClick={() => setActiveTab("experience")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Experience
            </a>
            <a
              href="#experience"
              onClick={() => setActiveTab("publications")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Publications
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main>

      {/* Hero Section */}
      <section ref={heroSectionRef} className={`relative ${sectionClass} overflow-hidden`}>
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {profile.headline}
              </h1>
              <p className="text-xl text-muted-foreground">
                {profile.summary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">14</div>
                <p className="text-sm text-muted-foreground">Publications</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">8+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold gradient-text">Multiple</div>
                <p className="text-sm text-muted-foreground">Grants Secured</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="fade-in" style={{ animationDelay: "100ms" }}>
            <img 
              src={heroWaterImage}
              alt="Water Management Systems"
              className="w-full h-auto rounded-2xl soft-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className={`${sectionClass} bg-gradient-accent`}>
        <div className={sectionContainerClass}>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Areas of Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Water Resource Management", desc: "IWRM frameworks, basin planning, transboundary water governance, and implementation support for donor-funded water and development programmes." },
              { title: "Water Quality & Hydrogeology", desc: "Hydrogeochemical analysis, groundwater monitoring, contamination studies, drinking-water safety, WASH, and groundwater security assessments." },
              { title: "Climate Resilience & Adaptation", desc: "Climate-resilient water systems, climate risk analysis, and adaptation-oriented planning for resilient service delivery." },
              { title: "Hydrological Modeling", desc: "MIKE SHE/11, SWAT, HEC-HMS, and watershed simulation for basin planning, water-resource assessment, and decision support." },
              { title: "Water Governance & Policy Support", desc: "Water security policy, governance frameworks, institutional analysis, stakeholder coordination, and evidence-based policy support." },
              { title: "Research, Evaluation & Evidence Translation", desc: "Mixed-method research, peer-reviewed publications, grant-supported studies, technical reporting, and evidence-to-policy communication." },
            ].map((item, idx) => (
              <Card key={idx} className="isometric-card p-6 stagger-item bg-white">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Publications Tabs */}
      <section id="experience" className={sectionClass}>
        <div className={sectionContainerClass}>
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab("experience")}
              className={`pb-4 font-semibold transition-colors ${
                activeTab === "experience"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Professional Experience
            </button>
            <button
              onClick={() => setActiveTab("publications")}
              className={`pb-4 font-semibold transition-colors ${
                activeTab === "publications"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Publications
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`pb-4 font-semibold transition-colors ${
                activeTab === "skills"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Methods & Tools
            </button>
          </div>

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              {[
                {
                  role: "Non-resident Research Fellow",
                  org: "University of Central Asia",
                  location: "",
                  period: "07/2024 – 12/2025",
                },
                {
                  role: "Postdoctoral Research Fellow",
                  org: "Durham University",
                  location: "Durham, UK",
                  period: "08/2023 – 07/2024",
                },
                {
                  role: "Research Assistant",
                  org: "Durham University",
                  location: "Durham, UK",
                  period: "12/2022 – 07/2023",
                },
                {
                  role: "Postgraduate Researcher (PhD)",
                  org: "Durham University",
                  location: "Durham, UK",
                  period: "06/2019 – 12/2022",
                },
                {
                  role: "Project Officer",
                  org: "Regional Environmental Centre for Central Asia - USAID-funded Smart Waters project",
                  location: "Kabul, Afghanistan",
                  period: "10/2018 – 06/2019",
                },
                {
                  role: "Consultant",
                  org: "Nazarbayev University Research and Innovation Center",
                  location: "Remote",
                  period: "09/2017 – 07/2019",
                },
                {
                  role: "Consultant",
                  org: "Stockholm International Peace Research Institute",
                  location: "Herat, Afghanistan",
                  period: "06/2018 – 09/2018",
                },
                {
                  role: "Intern",
                  org: "Asian Development Bank (ADB)",
                  location: "Almaty, Kazakhstan",
                  period: "01/2018 – 04/2018",
                },
                {
                  role: "Consultant",
                  org: "UNESCO Chair on Water Management in Central Asia",
                  location: "Almaty, Kazakhstan",
                  period: "10/2016 – 06/2019",
                },
              ].map((exp, idx) => (
                <Card key={idx} className="isometric-card p-8 stagger-item bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-semibold flex items-center gap-2">
                        <InstitutionLogo label={exp.org} />
                        <span>{exp.org}</span>
                      </p>
                      {exp.location && <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>}
                    </div>
                    <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">{exp.period}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Publications Tab */}
          {activeTab === "publications" && (
            <div className="space-y-6">
              <div className="bg-gradient-accent p-6 rounded-xl">
                <p className="text-base text-muted-foreground mb-4">
                  Published in leading journals including World Development, Water Research, Journal of Hydrology, and Environmental Development & Sustainability.
                </p>
              </div>
              <div className="space-y-4">
                {fullPublicationList.map((pub) => (
                  <Card key={pub.id} className="isometric-card p-6 stagger-item bg-white">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-base leading-snug">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{pub.authors}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary flex-shrink-0">{pub.year}</span>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-primary">{pub.journal}</p>
                        {(pub.volume || pub.pages) && (
                          <p className="text-sm text-muted-foreground">
                            {pub.volume && `Vol. ${pub.volume}`}
                            {pub.volume && pub.pages && ", "}
                            {pub.pages && `pp. ${pub.pages}`}
                          </p>
                        )}
                      </div>

                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                        >
                          View Publication <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  "Python & Stata (Quantitative analysis)",
                  "QGIS & ArcGIS (GIS Analysis)",
                  "SWAT, HEC-HMS, WEAP (Watershed Simulation)",
                  "MIKE SHE/11 (Hydrological Modeling)",
                  "NVivo (Qualitative Analysis)",
                  "AutoCAD & Civil 3D (Design)",
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education & Achievements */}
      <section className={`${sectionClass} bg-gradient-accent`}>
        <div className="container grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="space-y-4">
              {[
                { degree: "Ph.D. from Earth Sciences Department", school: "Durham University, UK", year: "2019–2023" },
                { degree: "Master of Economics in Integrated Water Resources Management", school: "Kazakh-German University, Kazakhstan", year: "2017–2019" },
                { degree: "B.Sc. in Civil Engineering", school: "Jami University, Afghanistan", year: "2011–2015" },
              ].map((edu, idx) => (
                <Card key={idx} className="isometric-card p-4 stagger-item bg-white">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm text-primary font-semibold flex items-center gap-2">
                    <InstitutionLogo label={edu.school} />
                    <span>{edu.school}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{edu.year}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Awards & Grants</h2>
            <div className="space-y-4">
              {[
                { title: "PI - Grant", org: "University of Central Asia - Afghanistan Water Governance", year: "2024" },
                { title: "Co-PI and Implementation Lead", org: "Royal Academy of Engineering - Household Water Treatment", year: "2021–2022" },
                { title: "UNESCO Silk Roads Youth Research Grant", org: "Comparative Morocco-Afghanistan Water Management Study", year: "2021–2022" },
                { title: "Award of Excellence for Contribution in Water Resource Development", org: "NWARA, Afghanistan", year: "2019" },
              ].map((award, idx) => (
                <Card key={idx} className="isometric-card p-4 stagger-item bg-white">
                  <h3 className="font-bold text-sm">{award.title}</h3>
                  <p className="text-xs text-primary font-semibold flex items-center gap-2">
                    <InstitutionLogo label={award.org} />
                    <span>{award.org}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{award.year}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Activities */}
      <section className={compactSectionClass}>
        <div className={sectionContainerClass}>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Professional Engagement</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Editorial Roles & Peer Review", items: ["Associate Editor, Journal of Hydrology (until Dec 2025)", "Editorial Board, Journal of Sustainable Geosciences (present)", "Reviewer, Sustainable Development", "Reviewer, Environment, Development & Sustainability", "Reviewer, Royal Academy of Engineering (Frontiers)"] },
              { title: "Memberships", items: ["International Water Resources Association (IWRA)", "Mid-Latitude Region Network"] },
              { title: "Youth Water Leadership", items: ["Led 10+ youth-focused water workshops and outreach activities"] },
              { title: "Outreach", items: ["Organized GIS Day events at Jami University and Kazakh-German University", "Supported IWRM Olympiad activities at Kabul Polytechnic University (2017, 2018, and 2019)", "Represented partner organizations in inter-agency technical meetings"] },
            ].map((section, idx) => (
              <Card key={idx} className="isometric-card p-6 stagger-item bg-white">
                <h3 className="font-bold text-lg mb-4 text-primary">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${compactSectionClass} bg-gradient-accent`}>
        <div className="container max-w-2xl text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Let's Connect</h2>
            <p className="text-lg text-muted-foreground">
              For collaboration opportunities, consulting, or research partnerships, please get in touch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              <a href={emailHref} className="inline-flex items-center text-sm lg:text-base font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={xProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm lg:text-base font-medium">
                <img src="https://cdn.simpleicons.org/x/005bbd" alt="X logo" className="w-4 h-4 mr-2" loading="lazy" />
                X
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm lg:text-base font-medium">
                <Linkedin className="w-4 h-4 mr-2 text-primary" />
                LinkedIn
              </a>
            </Button>
          </div>

        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center text-sm text-muted-foreground">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.social.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 hover:bg-muted transition-colors"
                aria-label="Open ORCID profile"
              >
                <img src="https://cdn.simpleicons.org/orcid/005bbd" alt="ORCID logo" className="w-4 h-4" loading="lazy" />
                <span className="font-medium text-sm text-foreground">ORCID</span>
              </a>
              <a
                href={profile.social.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 hover:bg-muted transition-colors"
                aria-label="Open Google Scholar profile"
              >
                <img src="https://cdn.simpleicons.org/googlescholar/005bbd" alt="Google Scholar logo" className="w-4 h-4" loading="lazy" />
                <span className="font-medium text-sm text-foreground">Google Scholar</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
