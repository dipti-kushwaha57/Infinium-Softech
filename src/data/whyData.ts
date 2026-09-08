export interface WhyStat {
  raw: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  display: string;
}

export interface WhyCapability {
  name: string;
  desc: string;
  tint: string;
}

export const WHY_STATS: WhyStat[] = [
  { raw: 9, decimals: 0, prefix: "", suffix: "", label: "Proprietary products", display: "9" },
  { raw: 9, decimals: 0, prefix: "", suffix: "", label: "Industries served", display: "9" },
  { raw: 24860, decimals: 0, prefix: "", suffix: "", label: "Businesses onboarded", display: "24,860" },
  { raw: 99.9, decimals: 1, prefix: "", suffix: "%", label: "Platform uptime", display: "99.9%" },
];

export const WHY_CAPABILITIES: WhyCapability[] = [
  {
    name: "Web applications",
    desc: "Responsive dashboards built on one component system across all nine products.",
    tint: "#1F31E8",
  },
  {
    name: "Mobile applications",
    desc: "Native-feel iOS and Android apps for field, rider, crew and customer roles.",
    tint: "#1E9E5A",
  },
  {
    name: "Cloud infrastructure",
    desc: "Multi-region AWS deployment with autoscaling and managed backups.",
    tint: "#E8A21F",
  },
  {
    name: "Enterprise security",
    desc: "SSO, role-based access, audit trails and encryption at rest and in transit.",
    tint: "#8B3FE8",
  },
  {
    name: "AI integrations",
    desc: "Forecasting, routing and instruction models embedded where they change outcomes.",
    tint: "#0F8F87",
  },
  {
    name: "Scalable architecture",
    desc: "Service-based backends that hold up from a single outlet to national rollouts.",
    tint: "#2AA8C4",
  },
  {
    name: "Unified analytics",
    desc: "One reporting layer, so cross-product metrics reconcile without exports.",
    tint: "#4338CA",
  },
  {
    name: "Implementation support",
    desc: "Migration, training and rollout led by the team that builds the products.",
    tint: "#0C0C0D",
  },
];
