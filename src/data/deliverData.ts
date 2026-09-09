export interface DeliveryStep{
    n : string;
    time : string;
    title : string;
    desc : string;
    owner : string;
    tint : string;
}

export interface EngagementModel{
    tag : string;
    title : string;
    tint : string;
    desc : string;
    points : string[];
    fit : string;
}

export const DELIVERY_STEPS : DeliveryStep[] = [
    {
        n : "01",
        time : "Week 1",
        title : "Discovery",
        desc : "We map your current process, data and volumes, then agree the scope in writing.",
        owner : "Implementation lead",
        tint : "#1F31E8"
    },
    {
        n : "02",
        time : "Week 2",
        title : "Configure",
        desc : "Roles, branches, tax rules and workflows set up on your own workspace.",
        owner : "Product specialist",
        tint : "#1e9e5a",
    },
    {
        n : "03",
        time : "Week 3",
        title : "Migrate & integrate",
        desc : "Historic data imported and your existing tools connected through APIs.",
        owner : "Integration engineer",
        tint : "#e8a21f"
    },
    {
        n : "04",
        time : "Week 4",
        title : "Train & launch",
        desc : "Team training, parallel run, then go-live with a named point of contact.",
        owner : "Delivery manager",
        tint : "#8b3fe8",
    },
    {
        n : "05",
        time : "Week 5",
        title : "Support & scale",
        desc : "SLA-backed support, quarterly reviews and new modules as you grow.",
        owner : "Account team",
        tint : "#0c0c0d",
    },
]

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    tag: "Start here",
    title: "Single product",
    tint: "#1F31E8",
    desc: "Pick one platform, run it on your own workspace, and connect the rest later.",
    points: [
      "Live in 4–6 weeks",
      "Per-user monthly billing",
      "Standard integrations included",
    ],
    fit: "Best for one team or branch",
  },
  {
    tag: "Most adopted",
    title: "Connected suite",
    tint: "#1E9E5A",
    desc: "Two or more products sharing identity, billing and one reporting layer.",
    points: [
      "Cross-product analytics",
      "Single sign-on and roles",
      "Consolidated invoicing",
    ],
    fit: "Best for multi-team operations",
  },
  {
    tag: "Enterprise",
    title: "Custom build",
    tint: "#8B3FE8",
    desc: "Your workflows built on our platform core, deployed in your cloud if required.",
    points: [
      "Dedicated delivery squad",
      "Private or on-prem deployment",
      "Custom SLAs and audits",
    ],
    fit: "Best for regulated or national rollouts",
  },
];
