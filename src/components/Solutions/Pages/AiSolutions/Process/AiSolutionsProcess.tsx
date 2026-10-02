import "./AiSolutionsProcess.scss";

const process = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We map the operational problem, the decision points, the data available, and the measurable outcome that matters most before we begin design.",
  },
  {
    number: "02",
    title: "Data & workflow review",
    description:
      "We examine the quality, structure, and availability of your data and align AI use with the real workflow context and team responsibilities.",
  },
  {
    number: "03",
    title: "Solution design",
    description:
      "We define the model, automation logic, user interactions, fallback paths, and governance model so the solution remains useful and accountable.",
  },
  {
    number: "04",
    title: "Build & test",
    description:
      "We develop the model and system, validate performance, run user checks, and refine outcomes against the real operational needs of the business.",
  },
  {
    number: "05",
    title: "Integration",
    description:
      "We connect the AI layers into your existing software, data workflows, and operational tooling so adoption is seamless and low-friction.",
  },
  {
    number: "06",
    title: "Monitoring & optimisation",
    description:
      "We track outputs, monitor reliability, and improve the system over time through data feedback, model updates, and operational learning.",
  },
];

export function AiSolutionsProcess() {
  return (
    <section className="ai-solutions-process">
      <div className="ai-solutions-container">
        <div className="section-header section-header-inline">
          <div className="section-header-copy">
            <span className="section-kicker">How we work</span>
            <h2>A delivery model built around measurable outcomes.</h2>
          </div>
          <p>
            We follow a disciplined process from discovery through deployment and optimisation so
            the AI solution remains reliable, valuable and operationally clear.
          </p>
        </div>

        <div className="process-grid">
          {process.map((step) => (
            <article key={step.number} className="process-card">
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
