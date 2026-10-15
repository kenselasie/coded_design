import path from "node:path";
import { transformAsync } from "@babel/core";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

function stylex(): Plugin {
  return {
    name: "stylex",
    enforce: "pre",
    async transform(code, id) {
      const normalized = id.split("?")[0];
      const isLibrary = normalized.includes("/packages/codeddesign/");
      if (!/\.[cm]?[jt]sx?$/.test(normalized) || (normalized.includes("node_modules") && !isLibrary)) {
        return null;
      }
      if (!code.includes("@stylexjs/stylex")) return null;

      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [
          [
            "@stylexjs/babel-plugin",
            {
              dev: true,
              runtimeInjection: true,
              enableInlinedConditionalMerge: true,
              treeshakeCompensation: true,
              aliases: {
                "@/*": [path.join(__dirname, "src/*")],
                "codeddesign/tokens/*": [path.join(__dirname, "packages/codeddesign/src/tokens/*")],
                "codeddesign/theme": [path.join(__dirname, "packages/codeddesign/src/theme/index.ts")],
                "codeddesign": [path.join(__dirname, "packages/codeddesign/src/index.ts")],
              },
              unstable_moduleResolution: {
                type: "commonJS",
                rootDir: __dirname,
              },
            },
          ],
        ],
      });

      if (!result?.code) return null;
      return { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
  plugins: [stylex(), react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "codeddesign/tokens",
        replacement: path.resolve(__dirname, "packages/codeddesign/src/tokens"),
      },
      {
        find: "codeddesign/theme",
        replacement: path.resolve(__dirname, "packages/codeddesign/src/theme/index.ts"),
      },
      {
        find: "codeddesign",
        replacement: path.resolve(__dirname, "packages/codeddesign/src/index.ts"),
      },
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
