const path = require("path");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        dev,
        runtimeInjection: false,
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
        classNamePrefix: "codeddesign",
        aliases: {
          "@/*": [path.join(__dirname, "src/*")],
          "codeddesign/tokens/*": [path.join(__dirname, "packages/codeddesign/src/tokens/*")],
          "codeddesign/theme": [path.join(__dirname, "packages/codeddesign/src/theme/darkTheme.ts")],
          "codeddesign": [path.join(__dirname, "packages/codeddesign/src/index.ts")],
        },
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: __dirname,
        },
      },
    ],
  ],
};
