/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["./src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: ["./src/test-setup.ts"],
    pool: "forks",
  },
});
