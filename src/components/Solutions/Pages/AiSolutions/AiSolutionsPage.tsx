import "./AiSolutionsPage.scss";
import { AiSolutionsHero } from "./Hero/AiSolutionsHero";
import { AiSolutionsOfferings } from "./Offerings/AiSolutionsOfferings";
import { AiSolutionsHire } from "./Hire/AiSolutionsHire";
import { AiSolutionsStrengths } from "./Strengths/AiSolutionsStrengths";
import { AiSolutionsStack } from "./Stack/AiSolutionsStack";
import { AiSolutionsProcess } from "./Process/AiSolutionsProcess";
import { AiSolutionsConsultation } from "./Consultation/AiSolutionsConsultation";

export function AiSolutionsPage() {
  return (
    <main className="ai-solutions-page">
      <AiSolutionsHero />
      <AiSolutionsOfferings />
      <AiSolutionsHire />
      <AiSolutionsStrengths />
      <AiSolutionsProcess />
      <AiSolutionsConsultation />
      <AiSolutionsStack />
    </main>
  );
}
 