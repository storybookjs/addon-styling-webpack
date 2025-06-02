import { defineConfig } from "tsup";

export default defineConfig((options) => [
  {
    entry: ["src/index.ts", "src/preset.ts"],
    outDir: "./dist",
    splitting: false,
    minify: !options.watch,
    format: ["cjs", "esm"],
    dts: {
      resolve: true,
    },
    treeshake: true,
    sourcemap: false,
    clean: true,
    platform: "browser",
    esbuildOptions(options) {
      options.conditions = ["module"];
    },
  },
  {
    entry: ["src/postinstall.ts"],
    outDir: "./bin",
    splitting: false,
    minify: !options.watch,
    format: ["cjs"],
    treeshake: true,
    target: "node20",
    clean: true,
    platform: "node",
    esbuildOptions(options) {
      options.conditions = ["module"];
    },
  },
]);
