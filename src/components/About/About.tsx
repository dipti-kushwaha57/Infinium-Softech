import { AboutHero } from "./AboutHero/AboutHero";
import { AboutBuilt } from "./AboutBuilt/AboutBuilt";
import { AboutBeliefs } from "./AboutBeliefs/AboutBeliefs";
import { AboutPlatforms } from "./AboutPlatforms/AboutPlatforms";
import { AboutProcess } from "./AboutProcess/AboutProcess";
import { AboutOperators } from "./AboutOperators/AboutOperators";
import { AboutEngagements } from "./AboutEngagements/AboutEngagements";

export function About() {
  return (
    <div className="about-page">
      <AboutHero />
      <AboutBuilt />
      <AboutBeliefs />
      <AboutPlatforms />
      <AboutProcess />
      <AboutOperators />
      <AboutEngagements />
    </div>
  );
}
