import Image from "next/image";
import "./AiSolutionsStack.scss";

const technologyStack = [
  { name: "Python", logo: "/technology/Python.png" },
  { name: "AI / ML", logo: "/technology/ai-ml.svg" },
  { name: "AWS", logo: "/technology/AWS.png" },
  { name: "Azure", logo: "/technology/Azure.png" },
  { name: "Docker", logo: "/technology/docker.png" },
  { name: "Kubernetes", logo: "/technology/kubernetes.png" },
  { name: "MongoDB", logo: "/technology/MongoDB.png" },
  { name: "PostgreSQL", logo: "/technology/Postgre-SQL.png" },
  { name: "MySQL", logo: "/technology/mysql.png" },
  { name: "Node.js", logo: "/technology/nodejs.png" },
  { name: "OpenShift", logo: "/technology/OpenShift.png" },
];

export function AiSolutionsStack() {
  const marqueeItems = [...technologyStack, ...technologyStack];

  return (
    <section className="ai-solutions-stack" aria-label="AI tools and systems">
      <div className="ai-solutions-container">
        <div className="ai-solutions-stack-header">
          <span className="ai-solutions-stack-eyebrow">Tools & systems</span>
          <h2 className="ai-solutions-stack-title">
            Proven tools for
            <br />
            practical AI.
          </h2>
          <p className="ai-solutions-stack-description">
            We choose dependable technologies to build, integrate, and scale AI around your
            products and workflows.
          </p>
        </div>

        <div className="ai-solutions-stack-marquee-viewport">
          <div className="ai-solutions-stack-marquee" aria-label="Technology logos">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="ai-solutions-stack-pill"
                aria-hidden={index >= technologyStack.length ? "true" : undefined}
              >
                <Image
                  src={item.logo}
                  alt={index < technologyStack.length ? item.name : ""}
                  width={28}
                  height={28}
                  unoptimized
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
