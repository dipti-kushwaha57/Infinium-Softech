import fs from "node:fs";
import path from "node:path";

const appDir = path.resolve(process.cwd(), "src/app");
const seoFile = path.resolve(process.cwd(), "src/content/seo.json");

if (!fs.existsSync(seoFile)) {
  console.error("❌ Error: src/content/seo.json does not exist.");
  process.exit(1);
}

const seoData = JSON.parse(fs.readFileSync(seoFile, "utf-8"));
const definedRoutes = Object.keys(seoData.routes || {});

function getAppRoutes(dir, baseRoute = "") {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("(") || entry.name.startsWith("@")) {
        routes = routes.concat(getAppRoutes(path.join(dir, entry.name), baseRoute));
      } else {
        const nextRoute = `${baseRoute}/${entry.name}`;
        routes = routes.concat(getAppRoutes(path.join(dir, entry.name), nextRoute));
      }
    } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
      routes.push(baseRoute === "" ? "/" : baseRoute);
    }
  }
  return routes;
}

const existingRoutes = getAppRoutes(appDir);
let missing = 0;

for (const route of existingRoutes) {
  if (!definedRoutes.includes(route)) {
    console.error(`❌ Missing SEO metadata in seo.json for route: "${route}"`);
    missing++;
  }
}

if (missing > 0) {
  console.error(`\nFound ${missing} route(s) without SEO data. Build aborted.`);
  process.exit(1);
}

console.log("✅ All routes have valid SEO definitions in seo.json.");
