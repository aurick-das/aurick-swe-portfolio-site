import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const isCi = Boolean(process.env.CI);
const hasRestoredBuild = existsSync(".next/BUILD_ID");

if (isCi && hasRestoredBuild) {
  console.log(
    "Skipping `next build`: CI=true and .next/BUILD_ID exists (using restored build cache)."
  );
} else {
  execSync("npm run build", { stdio: "inherit" });
}

execSync("npm run test:lighthouse:desktop", { stdio: "inherit" });
execSync("npm run test:lighthouse:mobile", { stdio: "inherit" });
