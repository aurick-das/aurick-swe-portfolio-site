import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const isCi = Boolean(process.env.CI);

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    // CI: clearer logs (suite + test titles, file paths) and GitHub annotations
    reporters: isCi ? ["verbose", "github-actions"] : ["default"],
    // Avoid interleaved output from parallel test files in Actions logs
    // fileParallelism: !isCi,
    includeTaskLocation: isCi
  }
});
