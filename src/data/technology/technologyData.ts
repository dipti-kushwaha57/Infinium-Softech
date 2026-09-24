export interface IndividualTechItem {
  id: string;
  category: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface CategoryHeader {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  color: string;
}

export interface HeroIndexItem {
  num: string;
  title: string;
  color: string;
  href: string;
}

export const TECHNOLOGY_HERO_INDEX_ITEMS: HeroIndexItem[] = [
  { num: "01", title: "Frontend Tech", color: "#2AA8C4", href: "#frontend" },
  { num: "02", title: "Backend Tech", color: "#1F31E8", href: "#backend" },
  { num: "03", title: "Mobile Tech", color: "#1E9E5A", href: "#mobile" },
  { num: "04", title: "Database Systems", color: "#0F8F87", href: "#database" },
  { num: "05", title: "CMS Solutions", color: "#8B3FE8", href: "#cms" },
  { num: "06", title: "Cloud & DevOps", color: "#E8A21F", href: "#cloud-devops" },
  { num: "07", title: "Design Tools", color: "#E0452F", href: "#design-tools" },
];

export const CATEGORY_HEADERS: Record<string, CategoryHeader> = {
  frontend: {
    id: "frontend",
    num: "01",
    title: "Frontend Tech",
    subtitle: "Frontend Frameworks & Modern Web Interfaces",
    color: "#2AA8C4",
  },
  backend: {
    id: "backend",
    num: "02",
    title: "Backend Tech",
    subtitle: "Scalable Server Architectures & Microservices",
    color: "#1F31E8",
  },
  mobile: {
    id: "mobile",
    num: "03",
    title: "Mobile Tech",
    subtitle: "Native & Cross-Platform Mobile Applications",
    color: "#1E9E5A",
  },
  database: {
    id: "database",
    num: "04",
    title: "Database Systems",
    subtitle: "High-Availability Data & Storage Engines",
    color: "#0F8F87",
  },
  cms: {
    id: "cms",
    num: "05",
    title: "CMS Solutions",
    subtitle: "Content Management & E-Commerce Platforms",
    color: "#8B3FE8",
  },
  "cloud-devops": {
    id: "cloud-devops",
    num: "06",
    title: "Cloud & DevOps",
    subtitle: "Cloud Infrastructure, Containers & Orchestration",
    color: "#E8A21F",
  },
  "design-tools": {
    id: "design-tools",
    num: "07",
    title: "Design Tools",
    subtitle: "UX/UI Design, Wireframing & Prototyping",
    color: "#E0452F",
  },
};

export const INDIVIDUAL_TECH_ITEMS: IndividualTechItem[] = [
  // FRONTEND TECH
  {
    id: "angularjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Angular.js",
    description:
      "Angular.js is a powerful JavaScript framework developed by Google for building dynamic, single-page web applications. It extends HTML with additional attributes and binds data using a two-way data binding approach. With features like dependency injection, reusable components, and built-in routing, Angular.js simplifies complex front-end development.",
    image: "/technology/angularjs-service.png",
    color: "#2AA8C4",
  },
  {
    id: "reactjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "React.js",
    description:
      "React.js is a fast, flexible JavaScript library developed by Facebook for building interactive user interfaces. It uses a component-based architecture and virtual DOM, allowing developers to create scalable and high-performing web applications.",
    image: "/technology/reactjs.png",
    color: "#2AA8C4",
  },
  {
    id: "vuejs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Vue.js",
    description:
      "Vue.js is a progressive JavaScript framework used for building user interfaces and single-page applications. Known for its gentle learning curve, reactive data binding, and modular ecosystem.",
    image: "/technology/vue.png",
    color: "#2AA8C4",
  },
  {
    id: "javascript",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "JavaScript (ES6+)",
    description:
      "JavaScript is the core scripting language of the modern web, enabling interactive web elements, async event handling, API calls, and complex frontend application logic.",
    image: "/technology/JS.png",
    color: "#2AA8C4",
  },
  {
    id: "html5",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "HTML5",
    description:
      "HTML5 is the standard markup language for structuring web pages, providing semantic elements, media embeds, canvas graphics, and accessibility standards.",
    image: "/technology/HTML5.png",
    color: "#2AA8C4",
  },
  {
    id: "css3",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "CSS3",
    description:
      "CSS3 is the latest evolution of Cascading Style Sheets, used to style and format HTML elements with animations, media queries, flexbox, and CSS grid layouts.",
    image: "/technology/css3.png",
    color: "#2AA8C4",
  },
  {
    id: "tailwindcss",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Tailwind CSS",
    description:
      "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build custom user interfaces directly in your markup rapidly.",
    image: "/technology/Tailwind-CSS.png",
    color: "#2AA8C4",
  },
  {
    id: "bootstrap",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Bootstrap",
    description:
      "Bootstrap is a popular frontend toolkit for developing responsive, mobile-first websites with pre-built components and flexible grid systems.",
    image: "/technology/Bootstrap.png",
    color: "#2AA8C4",
  },
  {
    id: "nextjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Next.js",
    description:
      "Next.js is a React framework for building fast, scalable web applications with server-side rendering (SSR), static site generation (SSG), and API routes.",
    image: "/technology/nextjs.png",
    color: "#2AA8C4",
  },
  {
    id: "typescript",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "TypeScript",
    description:
      "TypeScript is a strongly typed superset of JavaScript developed by Microsoft. It adds static typing and advanced tooling for scalable enterprise web applications.",
    image: "/technology/typescript.png",
    color: "#2AA8C4",
  },
  {
    id: "jquery",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "jQuery",
    description:
      "jQuery is a lightweight, fast JavaScript library designed to simplify HTML DOM manipulation, event handling, animations, and Ajax interactions.",
    image: "/technology/jquery.png",
    color: "#2AA8C4",
  },

  // BACKEND TECH
  {
    id: "nodejs",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Node.js",
    description:
      "Node.js is an open-source JavaScript runtime built on Chrome's V8 engine, designed for building fast, scalable server-side applications and microservices.",
    image: "/technology/nodejs.png",
    color: "#1F31E8",
  },
  {
    id: "python",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Python",
    description:
      "Python is a versatile backend language powering web APIs, machine learning algorithms, data processing pipelines, and enterprise automation.",
    image: "/technology/Python.png",
    color: "#1F31E8",
  },
  {
    id: "java",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Java",
    description:
      "Java is a secure, object-oriented programming language known for cross-platform stability, enterprise backend microservices, and multithreading.",
    image: "/technology/java.png",
    color: "#1F31E8",
  },
  {
    id: "php",
    category: "backend",
    categoryName: "Backend Tech",
    title: "PHP & Laravel",
    description:
      "PHP is a widely-used server-side language designed for web development. Combined with Laravel, it provides elegant routing, ORM, and secure authentication.",
    image: "/technology/php.png",
    color: "#1F31E8",
  },
  {
    id: "nestjs",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Nest.js",
    description:
      "Nest.js is a progressive TypeScript backend framework built on Node.js, designed for developing efficient, reliable, and scalable server-side applications.",
    image: "/technology/nodejs.png",
    color: "#1F31E8",
  },

  // MOBILE TECH
  {
    id: "android",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Android Native",
    description:
      "Android native app development using Java and Kotlin with Android Studio and Jetpack libraries for high-performance mobile experiences.",
    image: "/technology/android.png",
    color: "#1E9E5A",
  },
  {
    id: "ios",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "iOS & Swift",
    description:
      "iOS native app development using Swift, SwiftUI, and Apple SDKs to craft smooth, secure, and intuitive applications across iPhones and iPads.",
    image: "/technology/IOS.png",
    color: "#1E9E5A",
  },
  {
    id: "kotlin",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Kotlin",
    description:
      "Kotlin is Apple and Google's preferred concise, type-safe programming language for modern Android and cross-platform mobile development.",
    image: "/technology/Kotlin.png",
    color: "#1E9E5A",
  },
  {
    id: "flutter",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Flutter",
    description:
      "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Dart.",
    image: "/technology/Flutter.png",
    color: "#1E9E5A",
  },
  {
    id: "react-native",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "React Native",
    description:
      "React Native lets developers build native iOS and Android apps using React, sharing component logic while rendering native platform controls.",
    image: "/technology/React-Native.png",
    color: "#1E9E5A",
  },
  {
    id: "ionic",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Ionic Framework",
    description:
      "Ionic is an open-source mobile UI toolkit for developing high-quality cross-platform apps for iOS, Android, and Web using standard web technologies.",
    image: "/technology/android.png",
    color: "#1E9E5A",
  },

  // DATABASE SYSTEMS
  {
    id: "mongodb",
    category: "database",
    categoryName: "Database Systems",
    title: "MongoDB",
    description:
      "MongoDB is a leading NoSQL document database providing high performance, JSON-like flexible schemas, automatic sharding, and scale-out architecture.",
    image: "/technology/MongoDB.png",
    color: "#0F8F87",
  },
  {
    id: "mysql",
    category: "database",
    categoryName: "Database Systems",
    title: "MySQL",
    description:
      "MySQL is an open-source relational database management system trusted worldwide for speed, reliability, ACID transactions, and structured query handling.",
    image: "/technology/mysql.png",
    color: "#0F8F87",
  },
  {
    id: "mssql",
    category: "database",
    categoryName: "Database Systems",
    title: "MS SQL Server",
    description:
      "MS SQL Server is Microsoft's enterprise-grade relational database management system featuring high security, T-SQL scripting, and data warehousing.",
    image: "/technology/mssql.png",
    color: "#0F8F87",
  },
  {
    id: "postgresql",
    category: "database",
    categoryName: "Database Systems",
    title: "PostgreSQL",
    description:
      "PostgreSQL is a powerful open-source object-relational database system known for reliability, feature robustness, and performance with complex queries.",
    image: "/technology/Postgre-SQL.png",
    color: "#0F8F87",
  },
  {
    id: "oracle",
    category: "database",
    categoryName: "Database Systems",
    title: "Oracle Database",
    description:
      "Oracle Database is a multi-model database management system designed for enterprise data processing, high availability, and mission-critical workloads.",
    image: "/technology/Oracle.png",
    color: "#0F8F87",
  },

  // CMS SOLUTIONS
  {
    id: "wordpress",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "WordPress",
    description:
      "WordPress is the world's most popular content management system, powering customizable websites, blogs, portal engines, and enterprise publishing.",
    image: "/technology/WordPress.png",
    color: "#8B3FE8",
  },
  {
    id: "woocommerce",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "WooCommerce",
    description:
      "WooCommerce turns WordPress sites into fully functional eCommerce stores with customizable product listings, payment gateways, and inventory control.",
    image: "/technology/wordpress.png",
    color: "#8B3FE8",
  },
  {
    id: "shopify",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Shopify",
    description:
      "Shopify is an all-in-one commerce platform powering online stores with integrated checkout, inventory management, merchant analytics, and app ecosystems.",
    image: "/technology/Shopify.png",
    color: "#8B3FE8",
  },
  {
    id: "magento",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Magento (Adobe Commerce)",
    description:
      "Magento is an open-source enterprise eCommerce platform delivering customizable shopping carts, multi-store management, and B2B merchant features.",
    image: "/technology/Magento.png",
    color: "#8B3FE8",
  },
  {
    id: "drupal",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Drupal",
    description:
      "Drupal is an open-source CMS tailored for building complex, secure, enterprise websites with fine-grained permissions and multilingual architecture.",
    image: "/technology/drupal.png",
    color: "#8B3FE8",
  },
  {
    id: "strapi",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Strapi Headless CMS",
    description:
      "Strapi is an open-source headless CMS enabling developers to build customizable REST & GraphQL APIs to deliver content across React and Next.js frontends.",
    image: "/technology/Squarespace-.png",
    color: "#8B3FE8",
  },

  // CLOUD & DEVOPS
  {
    id: "aws",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "AWS (Amazon Web Services)",
    description:
      "AWS provides cloud computing infrastructure including EC2, S3, RDS, Lambda, and CloudFront for global availability and scalable cloud deployments.",
    image: "/technology/AWS.png",
    color: "#E8A21F",
  },
  {
    id: "azure",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Microsoft Azure",
    description:
      "Microsoft Azure is a comprehensive cloud computing service for building, testing, deploying, and managing applications across global datacenters.",
    image: "/technology/Azure.png",
    color: "#E8A21F",
  },
  {
    id: "gcp",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Google Cloud Platform",
    description:
      "Google Cloud Platform offers scalable cloud infrastructure, BigQuery analytics, Firebase realtime databases, and Kubernetes container management.",
    image: "/technology/gcp.png",
    color: "#E8A21F",
  },
  {
    id: "docker",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Docker",
    description:
      "Docker packages code and dependencies into lightweight containers to ensure applications run consistently across development and production environments.",
    image: "/technology/docker.png",
    color: "#E8A21F",
  },
  {
    id: "kubernetes",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Kubernetes",
    description:
      "Kubernetes automates deployment, scaling, load balancing, and self-healing of containerized applications across hybrid and multi-cloud infrastructure.",
    image: "/technology/kubernetes.png",
    color: "#E8A21F",
  },
  {
    id: "openshift",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Red Hat OpenShift",
    description:
      "OpenShift is Red Hat's enterprise Kubernetes container platform providing developer automation, security policies, and multi-cloud management.",
    image: "/technology/OpenShift.png",
    color: "#E8A21F",
  },
  {
    id: "terraform",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Terraform",
    description:
      "Terraform by HashiCorp is an Infrastructure as Code (IaC) tool for provisioning multi-cloud infrastructure automatically with declarative scripts.",
    image: "/technology/terraform.png",
    color: "#E8A21F",
  },

  // DESIGN TOOLS
  {
    id: "figma",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Figma",
    description:
      "Figma is the collaborative web-based design tool for vector graphics editing, interactive UI/UX prototyping, and design system creation in real time.",
    image: "/technology/Figma.png",
    color: "#E0452F",
  },
  {
    id: "sketch",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Sketch",
    description:
      "Sketch is a digital design platform for macOS focused on vector editing, symbol components, and user interface design for web and mobile platforms.",
    image: "/technology/Sketch.png",
    color: "#E0452F",
  },
  {
    id: "canva",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Canva",
    description:
      "Canva is a versatile graphic design platform empowering visual branding, marketing collateral creation, presentation design, and social assets.",
    image: "/technology/Canva.png",
    color: "#E0452F",
  },
  {
    id: "illustrator",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Adobe Illustrator & Photoshop",
    description:
      "Adobe Creative Cloud suite tools for vector illustration, brand identity creation, photo editing, digital art, and visual asset production.",
    image: "/technology/Adobe-Illustrator.png",
    color: "#E0452F",
  },
];
