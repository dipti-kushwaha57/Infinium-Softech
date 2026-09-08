export interface StackItem {
  name: string;
  role: string;
  tint: string;
}

export interface StackLayer {
  n: string;
  kicker: string;
  title: string;
  desc: string;
  direction: "normal" | "reverse";
  duration: number; // in seconds
  items: StackItem[];
}

export const STACK_LAYERS: StackLayer[] = [
  {
    n: "01",
    kicker: "Surface",
    title: "Client surfaces",
    desc: "One component system across every dashboard, portal and app screen.",
    direction: "normal",
    duration: 26,
    items: [
      { name: "React", role: "Product dashboards", tint: "#1F31E8" },
      { name: "Next.js", role: "Portals & marketing", tint: "#0C0C0D" },
      { name: "Flutter", role: "iOS & Android apps", tint: "#2AA8C4" },
      { name: "TypeScript", role: "Type-safe contracts", tint: "#3178C6" },
      { name: "Tailwind / SCSS", role: "Design tokens", tint: "#1E9E5A" },
    ],
  },
  {
    n: "02",
    kicker: "Services",
    title: "Services & data",
    desc: "Realtime services, billing and reporting on a shared data core.",
    direction: "reverse",
    duration: 30,
    items: [
      { name: "Node.js", role: "Realtime APIs", tint: "#1E9E5A" },
      { name: "Laravel", role: "Billing & back office", tint: "#E0452F" },
      { name: "PostgreSQL", role: "Transactional store", tint: "#4338CA" },
      { name: "MongoDB", role: "Events & documents", tint: "#0F8F87" },
      { name: "Redis", role: "Caching & pub/sub", tint: "#E8A21F" },
    ],
  },
  {
    n: "03",
    kicker: "Platform",
    title: "Cloud & intelligence",
    desc: "Multi-region infrastructure with security and models built in.",
    direction: "normal",
    duration: 28,
    items: [
      { name: "AWS", role: "Infra as code", tint: "#E8A21F" },
      { name: "AI APIs", role: "Forecast & routing", tint: "#8B3FE8" },
      { name: "Docker & K8s", role: "Container orchestration", tint: "#2AA8C4" },
      {
        name: "Security & Scale",
        role: "RBAC, audits, load tests",
        tint: "#1F31E8",
      },
    ],
  },
];

export const STACK_NOTES: string[] = [
  "One component system across web and mobile surfaces",
  "Shared auth, billing and analytics services",
  "Infrastructure as code with staged rollouts",
];
