import "./AiSolutionsStack.scss";

const technologyStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "RAG",
  "VectorDB",
  "n8n",
  "MLOps",
  "Cloud AI",
  "Data Pipelines",
];

export function AiSolutionsStack() {
  return (
    <section className="ai-solutions-stack">
      <div className="ai-solutions-container">
        <div className="section-header section-header-inline">
          <div className="section-header-copy">
            <span className="section-kicker">Tools & systems</span>
            <h2>Technology choices shaped by performance and practicality.</h2>
          </div>
          <p>
            We select the stack based on your use case, operating model, and delivery constraints—
            balancing speed, security, and maintainability for the real world.
          </p>
        </div>

        <div className="tech-stack-grid">
          {technologyStack.map((item) => (
            <div key={item} className="tech-pill">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
