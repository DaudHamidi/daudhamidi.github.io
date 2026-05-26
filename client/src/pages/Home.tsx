import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ExternalLink, Github, Linkedin } from "lucide-react";
import {
  profileData as fallbackProfileData,
  publications as fallbackPublications,
  type ProfileData,
  type Publication,
} from "@shared/profile-data";
import { useEffect, useMemo, useRef, useState } from "react";

const affiliations = [
  { name: "Durham University", domain: "durham.ac.uk" },
  { name: "University of Central Asia", domain: "ucentralasia.org" },
  { name: "Stockholm International Peace Research Institute", domain: "sipri.org" },
  { name: "Asian Development Bank", domain: "adb.org" },
  { name: "Regional Environmental Centre for Central Asia", domain: "carececo.org" },
  { name: "USAID", domain: "usaid.gov" },
  { name: "UNESCO Chair on Water Management in Central Asia", domain: "unesco.org" },
  { name: "Nazarbayev University", domain: "nu.edu.kz" },
  { name: "National Water Affairs Regulation Authority", domain: "nwara.gov.af" },
  { name: "International Water Resources Association", domain: "iwra.org" },
  { name: "Royal Academy of Engineering", domain: "raeng.org.uk" },
  { name: "Jami University", domain: "jami.edu.af" },
  { name: "Kazakh-German University", domain: "dku.kz" },
  { name: "Kabul Polytechnic University", domain: "kpu.edu.af" },
];

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
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
  const sectionClass = "py-20 lg:py-28";
  const sectionContainerClass = "container space-y-12";

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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663687308171/gnCtk8moCPPddaSaMLuGU5/hero-water-systems-4zmwy3mrBARBwYjxYiFGPe.webp"
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
                      <p className="text-primary font-semibold">{exp.org}</p>
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
                { degree: "Ph.D. from Earth Sciences", school: "Durham University, UK", year: "2019–2023" },
                { degree: "Master of Economics in Integrated Water Resources Management", school: "Kazakh-German University, Kazakhstan", year: "2017–2019" },
                { degree: "B.Sc. in Civil Engineering", school: "Jami University, Afghanistan", year: "2011–2015" },
              ].map((edu, idx) => (
                <Card key={idx} className="isometric-card p-4 stagger-item bg-white">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm text-primary font-semibold">{edu.school}</p>
                  <p className="text-xs text-muted-foreground">{edu.year}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Awards & Grants</h2>
            <div className="space-y-4">
              {[
                { title: "Award of Excellence for Contribution in Water Resource Development", org: "NWARA, Afghanistan", year: "2019" },
                { title: "PI - Grant", org: "University of Central Asia - Afghanistan Water Governance", year: "2024" },
                { title: "Co-PI and Implementation Lead", org: "Royal Academy of Engineering - Household Water Treatment", year: "2021–2022" },
                { title: "UNESCO Silk Roads Youth Research Grant", org: "Comparative Morocco-Afghanistan Water Management Study", year: "2021–2022" },
              ].map((award, idx) => (
                <Card key={idx} className="isometric-card p-4 stagger-item bg-white">
                  <h3 className="font-bold text-sm">{award.title}</h3>
                  <p className="text-xs text-primary font-semibold">{award.org}</p>
                  <p className="text-xs text-muted-foreground mt-1">{award.year}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Activities */}
      <section className={sectionClass}>
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

      {/* Affiliations */}
      <section className={`${sectionClass} bg-gradient-accent`}>
        <div className={sectionContainerClass}>
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">Affiliations & Institutions</h2>
          </div>

          <div className="affiliations-marquee" aria-label="Affiliated institutions">
            <div className="affiliations-track">
              {[...affiliations, ...affiliations].map((item, idx) => (
                <Card key={`${item.name}-${idx}`} className="affiliations-card isometric-card bg-white">
                  <div className="relative w-16 h-16 rounded-xl border border-border bg-background/60 overflow-hidden">
                    <img
                      src={`https://logo.clearbit.com/${item.domain}?size=128`}
                      alt={`${item.name} logo`}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-xs font-bold text-primary">
                      {initialsFromName(item.name)}
                    </div>
                  </div>
                  <p className="text-xs font-semibold leading-snug text-center">{item.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${sectionClass} bg-gradient-accent`}>
        <div className="container max-w-2xl text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Let's Connect</h2>
            <p className="text-lg text-muted-foreground">
              For collaboration opportunities, consulting, or research partnerships, please get in touch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              <a href={emailHref}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.social.orcid} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                ORCID
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.social.googleScholar} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Google Scholar
              </a>
            </Button>
          </div>

        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
