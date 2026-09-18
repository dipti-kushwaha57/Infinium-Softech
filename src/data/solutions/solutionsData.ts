export interface SolutionItem {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  color: string;
  checklist: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  statusLabel: string;
  productsTag: string;
  tintClass: string;
  reverse?: boolean;
}

export interface HeroIndexItem {
  num: string;
  title: string;
  color: string;
  href: string;
}

export interface CtaStepItem {
  badgeColor: string;
  title: string;
  description: string;
}

export const HERO_INDEX_ITEMS: HeroIndexItem[] = [
  { num: "01", title: "Mobile Applications", color: "#2AA8C4", href: "#mobile-applications" },
  { num: "02", title: "Web Applications", color: "#1F31E8", href: "#web-applications" },
  { num: "03", title: "Custom Software", color: "#1E9E5A", href: "#custom-software" },
  { num: "04", title: "AI Solutions", color: "#0F8F87", href: "#ai-solutions" },
  { num: "05", title: "Enterprise Systems", color: "#8B3FE8", href: "#enterprise-systems" },
  { num: "06", title: "Cloud Infrastructure", color: "#E8A21F", href: "#cloud-infrastructure" },
];

export const SOLUTIONS_LIST_DATA: SolutionItem[] = [
  {
    id: "mobile-applications",
    num: "01",
    category: "Mobile",
    title: "Apps the crew keeps open all shift.",
    description:
      "Native-feel iOS and Android apps for customer, rider, crew and field roles. They share the component system and APIs of the web products, so one release ships to both.",
    color: "#2AA8C4",
    checklist: [
      "Offline-tolerant workflows for field and depot use",
      "Live location, route and status tracking",
      "Push and SMS notification journeys",
      "Separate app shells per role: crew, rider, customer",
      "Store submissions and staged rollout managed for you",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/products",
    image: "/solutions/mobile-app-full.png",
    imageAlt: "Strivedge Mobile App Development & Portfolio UI",
    statusLabel: "In production",
    productsTag: "Trekvano · Truck Guru",
    tintClass: "cyan-tint",
    reverse: false,
  },
  {
    id: "web-applications",
    num: "02",
    category: "Web",
    title: "Dashboards on one component system.",
    description:
      "Operations consoles, admin panels and customer portals drawn from a single design system. A pattern proven in one product arrives in the next without a redesign.",
    color: "#1F31E8",
    checklist: [
      "Multi-tenant admin consoles with branch scoping",
      "Role-aware dashboards and scheduled reporting",
      "Bulk actions, saved filters and audit views",
      "Accessible components with performance budgets",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/products",
    image: "/solutions/web-app-full.jpg",
    imageAlt: "Strivedge Web Application & Healthcare Platform Console",
    statusLabel: "In production",
    productsTag: "AppointGem · MapMyPay",
    tintClass: "blue-tint",
    reverse: true,
  },
  {
    id: "custom-software",
    num: "03",
    category: "Custom",
    title: "Workflows shaped to your operation.",
    description:
      "When the process is the differentiator, we model it directly: your states, approvals and exceptions, with the platform layer handling identity, billing and reporting underneath.",
    color: "#1E9E5A",
    checklist: [
      "Process and data modelling with your team",
      "Custom state machines and approval chains",
      "Migration off spreadsheets and legacy tools",
      "Integrations with existing ERP and accounting",
      "Handover with documentation and team training",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/contact",
    image: "/solutions/custom-software-full.jpg",
    imageAlt: "Strivedge Custom Software Workflow Interface",
    statusLabel: "In production",
    productsTag: "WelzoKart · Needly",
    tintClass: "green-tint",
    reverse: false,
  },
  {
    id: "ai-solutions",
    num: "04",
    category: "Intelligence",
    title: "Models where they change the outcome.",
    description:
      "Forecasting, routing and instruction models sit inside the workflow rather than beside it. Every prediction is written back to the record it affects, with a human able to override.",
    color: "#0F8F87",
    checklist: [
      "Demand and utilisation forecasting",
      "Route, roster and schedule optimisation",
      "Instruction and content generation for staff",
      "Review and override paths on every suggestion",
      "Monitoring for accuracy and model drift",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/products",
    image: "/solutions/ai-solutions-full.jpg",
    imageAlt: "Strivedge AI Solutions & Intelligence Dashboard",
    statusLabel: "In production",
    productsTag: "MindFul Menu · Truck Guru",
    tintClass: "teal-tint",
    reverse: true,
  },
  {
    id: "enterprise-systems",
    num: "05",
    category: "Enterprise",
    title: "SSO, roles, audit trails, compliance.",
    description:
      "The platform layer every product inherits: single sign-on, granular roles, full audit history and encryption in transit and at rest, configured per entity and per branch.",
    color: "#8B3FE8",
    checklist: [
      "SSO with SAML and OIDC providers",
      "Role and permission matrices per branch",
      "Immutable audit trails on every record",
      "Data residency and retention controls",
      "SLA-backed support with quarterly reviews",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/contact",
    image: "/solutions/enterprise-systems.jpg",
    imageAlt: "Strivedge Enterprise Systems & Security Management",
    statusLabel: "In production",
    productsTag: "MapMyPay · AppointGem",
    tintClass: "purple-tint",
    reverse: false,
  },
  {
    id: "cloud-infrastructure",
    num: "06",
    category: "Cloud",
    title: "Multi-region AWS with autoscaling.",
    description:
      "Every product runs on the same infrastructure: managed backups, blue-green deploys and observability wired in from the first commit. Scale becomes a configuration change.",
    color: "#E8A21F",
    checklist: [
      "Multi-region deployment with autoscaling",
      "Managed backups with point-in-time restore",
      "Blue-green and canary release pipelines",
      "Metrics, tracing, alerting and capacity reviews",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/contact",
    image: "/solutions/cloud-infrastructure-full.jpg",
    imageAlt: "Strivedge Cloud Infrastructure & AWS Architecture",
    statusLabel: "In production",
    productsTag: "All nine products",
    tintClass: "amber-tint",
    reverse: true,
  },
];

export const CTA_STEP_ITEMS: CtaStepItem[] = [
  {
    badgeColor: "#1F31E8",
    title: "Scoping call",
    description: "Thirty minutes on your process, volumes and current tools.",
  },
  {
    badgeColor: "#1E9E5A",
    title: "Fixed-scope pilot",
    description: "One team or branch live in four to six weeks.",
  },
  {
    badgeColor: "#8B3FE8",
    title: "Full rollout",
    description: "Multi-branch migration, training and SLA-backed support.",
  },
];
