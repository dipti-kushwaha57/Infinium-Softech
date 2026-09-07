export type ProductItem = {
  n: string;
  name: string;
  mark: string;
  tag: string;
  tint: string;
  desc: string;
  shot: string;
  wash: string;
};

export type GenericMenuItem = {
  name: string;
  desc: string;
  tint: string;
  product: string;
};

export type MenuDef = {
  key: string;
  label: string;
  eyebrow: string;
  isProducts?: boolean;
  productItems?: ProductItem[];
  items?: GenericMenuItem[];
};

export const ECOSYSTEM_PRODUCTS: ProductItem[] = [
  {
    n: "01",
    name: "AppointGem",
    mark: "AG",
    tag: "BOOKINGS",
    tint: "#1F31E8",
    desc: "Business booking and management platform for appointment-led teams.",
    shot: "/shots/welzokart.jpg",
    wash: "rgba(31, 49, 232, 0.16)",
  },
  {
    n: "02",
    name: "WelzoKart",
    mark: "WK",
    tag: "QUICK COMMERCE",
    tint: "#1E9E5A",
    desc: "Quick commerce marketplace combining grocery and restaurant delivery.",
    shot: "/shots/welzokart.jpg",
    wash: "rgba(30, 158, 90, 0.16)",
  },
  {
    n: "03",
    name: "MapMyPay",
    mark: "MP",
    tag: "HEALTHCARE",
    tint: "#8B3FE8",
    desc: "Healthcare and nursing recruitment platform with shift-based payouts.",
    shot: "/shots/mapmypay.jpg",
    wash: "rgba(139, 63, 232, 0.16)",
  },
  {
    n: "04",
    name: "Truck Guru",
    mark: "TG",
    tag: "LOGISTICS",
    tint: "#E8A21F",
    desc: "Transport and truck booking ecosystem across long-haul and regional lanes.",
    shot: "/shots/truckguru.jpg",
    wash: "rgba(232, 162, 31, 0.16)",
  },
  {
    n: "05",
    name: "MindFul Menu",
    mark: "MM",
    tag: "KITCHEN AI",
    tint: "#0F8F87",
    desc: "AI-powered cooking and menu instruction platform for multi-outlet kitchens.",
    shot: "/shots/localeeclean.jpg",
    wash: "rgba(15, 143, 135, 0.16)",
  },
  {
    n: "06",
    name: "Trekvano",
    mark: "TV",
    tag: "EDUCATION",
    tint: "#2AA8C4",
    desc: "School van and student tracking system with live parent notifications.",
    shot: "/shots/trekvano.jpg",
    wash: "rgba(42, 168, 196, 0.16)",
  },
  {
    n: "07",
    name: "Needly",
    mark: "ND",
    tag: "MARKETPLACE",
    tint: "#E0452F",
    desc: "Daily needs buy and sell marketplace with verified neighbourhood listings.",
    shot: "/shots/textgem.jpg",
    wash: "rgba(224, 69, 47, 0.16)",
  },
  {
    n: "08",
    name: "Locale E Clean",
    mark: "LE",
    tag: "HOME SERVICES",
    tint: "#4338CA",
    desc: "Cleaning and home service booking platform with route-optimised crews.",
    shot: "/shots/localeeclean.jpg",
    wash: "rgba(67, 56, 202, 0.16)",
  },
  {
    n: "09",
    name: "TextGem",
    mark: "TX",
    tag: "COMMUNICATION",
    tint: "#0C0C0D",
    desc: "Bulk SMS and business communication platform with delivery analytics.",
    shot: "/shots/textgem.jpg",
    wash: "rgba(241, 240, 236, 0.08)",
  },
];

export const MENU_DEFS: Record<string, MenuDef> = {
  products: {
    key: "products",
    label: "Products",
    eyebrow: "Nine products, one platform",
    isProducts: true,
    productItems: ECOSYSTEM_PRODUCTS,
  },
  industries: {
    key: "industries",
    label: "Industries",
    eyebrow: "Built for how these sectors operate",
    items: [
      { name: "Healthcare", desc: "Nursing workforce, credentials, payouts", tint: "#8B3FE8", product: "MapMyPay" },
      { name: "Logistics", desc: "Loads, fleet tracking, freight settlement", tint: "#E8A21F", product: "Truck Guru" },
      { name: "Retail & Commerce", desc: "Grocery, restaurant and quick commerce", tint: "#1E9E5A", product: "WelzoKart" },
      { name: "Education", desc: "Student transport and parent visibility", tint: "#2AA8C4", product: "Trekvano" },
      { name: "Home Services", desc: "Crew dispatch and recurring contracts", tint: "#4338CA", product: "Locale E Clean" },
      { name: "Communication", desc: "Campaigns, OTP and delivery analytics", tint: "#0C0C0D", product: "TextGem" },
    ],
  },
  solutions: {
    key: "solutions",
    label: "Solutions",
    eyebrow: "How we build and ship",
    items: [
      { name: "Mobile Apps", desc: "Customer, rider, crew and field apps", tint: "#2AA8C4", product: "Trekvano" },
      { name: "Web Applications", desc: "Dashboards on one component system", tint: "#1F31E8", product: "AppointGem" },
      { name: "Custom Software", desc: "Workflows shaped to your operation", tint: "#1E9E5A", product: "WelzoKart" },
      { name: "AI Solutions", desc: "Forecasting, routing and instructions", tint: "#0F8F87", product: "MindFul Menu" },
      { name: "Enterprise Systems", desc: "SSO, roles, audit trails, compliance", tint: "#8B3FE8", product: "MapMyPay" },
      { name: "Cloud Infrastructure", desc: "Multi-region AWS with autoscaling", tint: "#E8A21F", product: "Truck Guru" },
    ],
  },
  technology: {
    key: "technology",
    label: "Technology",
    eyebrow: "One toolchain across all nine products",
    items: [
      { name: "React", desc: "Component system for every dashboard", tint: "#1F31E8", product: "AppointGem" },
      { name: "Next.js", desc: "Marketing and portal surfaces", tint: "#0C0C0D", product: "TextGem" },
      { name: "Flutter", desc: "Shared iOS and Android codebase", tint: "#2AA8C4", product: "Trekvano" },
      { name: "Node.js", desc: "Realtime services and APIs", tint: "#1E9E5A", product: "WelzoKart" },
      { name: "Laravel", desc: "Billing, admin and back office", tint: "#E0452F", product: "Needly" },
      { name: "AWS", desc: "Infrastructure as code, staged rollouts", tint: "#E8A21F", product: "Truck Guru" },
      { name: "Security & Scalability", desc: "Encryption, RBAC, load testing", tint: "#8B3FE8", product: "MapMyPay" },
    ],
  },
  company: {
    key: "company",
    label: "Company",
    eyebrow: "The team behind the ecosystem",
    items: [
      { name: "About Us", desc: "Why we build products, not projects", tint: "#1F31E8", product: "AppointGem" },
      { name: "Careers", desc: "Engineering, design and delivery roles", tint: "#1E9E5A", product: "WelzoKart" },
      { name: "Partners", desc: "Resellers and implementation partners", tint: "#E8A21F", product: "Truck Guru" },
      { name: "Contact Us", desc: "Talk to sales or support", tint: "#8B3FE8", product: "MapMyPay" },
    ],
  },
  demo: {
    key: "demo",
    label: "Demo Center",
    eyebrow: "See any product running live",
    items: [
      { name: "Live Product Demos", desc: "Sandboxes with seeded data", tint: "#1F31E8", product: "AppointGem" },
      { name: "Interactive Walkthroughs", desc: "Click-through core flows", tint: "#0F8F87", product: "MindFul Menu" },
      { name: "Schedule Consultation", desc: "30 minutes with an implementation lead", tint: "#4338CA", product: "Locale E Clean" },
      { name: "Request Demo", desc: "Tell us the operation, we bring the products", tint: "#1E9E5A", product: "WelzoKart" },
    ],
  },
};

export const MENU_KEYS = ["products", "industries", "solutions", "technology", "company", "demo"] as const;
