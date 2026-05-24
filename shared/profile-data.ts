export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string;
  journal: string;
  volume?: string;
  pages?: string;
  url?: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  summary: string;
  contactEmail: string;
  social: {
    linkedin: string;
    github: string;
    orcid: string;
    googleScholar: string;
  };
}

export const profileData: ProfileData = {
  name: "Daud Hamidi",
  headline: "Water Management & Development Consultant",
  summary:
    "Client-focused consultant with 8+ years of experience supporting donor-funded water and development programmes through project coordination, stakeholder engagement, reporting, and applied research. Focused on evidence-based policy support in water governance, WASH, hydrogeology, and climate-resilient solutions across fragile and developing contexts.",
  contactEmail: "daud.hamidi@yahoo.com",
  social: {
    linkedin: "https://www.linkedin.com/in/daudhamidi/",
    github: "https://github.com/DaudHamidi",
    orcid: "https://orcid.org/0000-0001-8382-4504",
    googleScholar: "https://scholar.google.com/citations?user=MIxU1Y8AAAAJ&hl=en",
  },
};

export const publications: Publication[] = [
  {
    id: "pub-14",
    year: 2024,
    title: "Exploring the determinants of household water treatment in Kabul: A COM-B model perspective in a low-income context",
    authors: "Hamidi, M. D., Haenssgen, M. J., & Greenwell, H.",
    journal: "World Development",
    volume: "188",
    pages: "106902",
    url: "https://doi.org/10.1016/j.worlddev.2024.106902",
  },
  {
    id: "pub-13",
    year: 2024,
    title: "The nature and determining factors of inter-household water transfers in Kabul, Afghanistan: a qualitative study",
    authors: "Hamidi, M.D., Haenssgen, M.J., Vasiljevic, M., & Greenwell, H. C.",
    journal: "Environmental Development & Sustainability",
    volume: "26",
    url: "https://doi.org/10.1007/s10668-024-05560-y",
  },
  {
    id: "pub-12",
    year: 2024,
    title: "Between a rock and a hard place: A geosocial approach to water insecurity in Kabul",
    authors: "Hamidi, M. D., Haenssgen, M. J., Vasiljevic, M., Greenwell, H. C., & Stevenson, E. G. J.",
    journal: "Water Security",
    volume: "22",
    pages: "100177",
    url: "https://doi.org/10.1016/j.wasec.2024.100177",
  },
  {
    id: "pub-11",
    year: 2024,
    title: "The Shared Heritage of Water Management and Allocation along the Silk Roads",
    authors: "Hamidi, M. D., & Bachikh, A.",
    journal: "Silk Roads Papers",
    volume: "1st ed.",
    pages: "67–87",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000389776",
  },
  {
    id: "pub-10",
    year: 2024,
    title: "Evaluation of the antibacterial properties of commonly used clays from deposits in Central and Southern Asia",
    authors:
      "Abdullayev, E., Paterson, J. R., Kuszynski, E., Hamidi, M. D., Nahar, P., Greenwell, H. C., Neumann, A., Sharples, G. J.",
    journal: "Clays and Clay Minerals",
    volume: "72",
    pages: "e9",
    url: "https://doi.org/10.1017/cmn.2024.7",
  },
  {
    id: "pub-9",
    year: 2023,
    title: "Low-cost household water treatment: A techno-behavioural intervention for local sustainable development in Afghanistan",
    authors: "Hamidi, M. D.",
    journal: "Durham University Doctoral Thesis",
    url: "https://etheses.dur.ac.uk/15043/",
  },
  {
    id: "pub-8",
    year: 2023,
    title: "Determinants of Household Safe Drinking Water Practices in Kabul, Afghanistan: New Insights From Behavioural Survey Data",
    authors: "Hamidi, M. D., Haenssgen, M. J., and Greenwell, H. C.",
    journal: "Water Research",
    volume: "244",
    pages: "120521",
    url: "https://doi.org/10.1016/j.watres.2023.120521",
  },
  {
    id: "pub-7",
    year: 2023,
    title: "Investigating groundwater recharge using hydrogen and oxygen stable isotopes in Kabul city, a semi-arid region",
    authors: "Hamidi, M. D., Gr\u00f6cke, D. R., Joshi, S. K., and Greenwell H.C.",
    journal: "Journal of Hydrology",
    volume: "626",
    pages: "130187",
    url: "https://doi.org/10.1016/j.jhydrol.2023.130187",
  },
  {
    id: "pub-6",
    year: 2023,
    title:
      "Spatial estimation of groundwater quality, hydrogeochemical investigation, and health impacts of shallow groundwater in Kabul city, Afghanistan",
    authors: "Hamidi, M. D., Kissane, S., Bogush, A.A. et al.",
    journal: "Sustainable Water Resources Management",
    volume: "9",
    pages: "20",
    url: "https://doi.org/10.1007/s40899-022-00808-9",
  },
  {
    id: "pub-5",
    year: 2021,
    title:
      "Security implications of climate development in conflict-affected states: Implications of local-level effects of rural hydropower development on farmers in Herat",
    authors: "Krampe, F., Smith, E. S., & Hamidi, M. D.",
    journal: "Political Geography",
    volume: "90",
    pages: "102454",
    url: "https://doi.org/10.1016/J.POLGEO.2021.102454",
  },
  {
    id: "pub-4",
    year: 2021,
    title:
      "Evaluation of Paired Watershed Runoff Relationships since Recovery from a Major Hurricane on a Coastal Forest-A Basis for Examining Effects of Pinus Palustris Restoration on Water Yield",
    authors: "Amatya, D. M., Herbert, S., Trettin, C. C., & Hamidi, M. D.",
    journal: "Water",
    volume: "13(21)",
    pages: "3121",
    url: "https://doi.org/10.3390/W13213121",
  },
  {
    id: "pub-3",
    year: 2020,
    title: "Simulating hydrology of current stands and post-longleaf pine restoration on a coastal watershed, South Carolina",
    authors: "Amatya, D. M., Hamidi, M. D., Trettin, C. C., & Dai, Z.",
    journal: "Enhancing Landscapes for Sustainable Intensification and Watershed Resiliency",
    pages: "169",
  },
  {
    id: "pub-2",
    year: 2019,
    title: "Integrated modelling of ground and surface water using MIKE SHE/MIKE 11 in a poor data region, Kabul City",
    authors: "Hamidi, M. D.",
    journal: "Kazakh-German University Master's Thesis",
  },
  {
    id: "pub-1",
    year: 2019,
    title: "Spatial and temporal variabilities of maximum snow depth in the Northern and Central Kazakhstan",
    authors: "Moldakhmetov, M., Makhmudova, L., Zhanabayeva, Z., Kumeiko, A., Hamidi, M. D., & Sagin, J.",
    journal: "Arabian Journal of Geosciences",
    volume: "12(11)",
    pages: "1-8",
    url: "https://doi.org/10.1007/S12517-019-4505-Y",
  },
];
