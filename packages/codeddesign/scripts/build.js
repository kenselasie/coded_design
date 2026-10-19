const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const stylex = require("@stylexjs/babel-plugin");

const packageRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(packageRoot, "src");
const outRoot = path.join(packageRoot, "dist");

const stylexOptions = {
  dev: false,
  runtimeInjection: false,
  enableInlinedConditionalMerge: true,
  treeshakeCompensation: true,
  classNamePrefix: "codeddesign",
  unstable_moduleResolution: {
    type: "commonJS",
    rootDir: packageRoot,
  },
};

function stripUnreferencedImports() {
  return {
    name: "strip-unreferenced-imports",
    visitor: {
      Program(programPath) {
        for (const statement of programPath.get("body")) {
          if (!statement.isImportDeclaration()) continue;
          const source = statement.node.source.value;
          const stylexImport =
            source === "@stylexjs/stylex" || source.includes(".stylex");
          if (!stylexImport) continue;
          const unused = statement.node.specifiers.every((specifier) => {
            const binding = statement.scope.getBinding(specifier.local.name);
            return binding && binding.referencePaths.length === 0;
          });
          if (unused) statement.remove();
        }
      },
    },
  };
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

function compile(file) {
  const result = babel.transformFileSync(file, {
    filename: file,
    babelrc: false,
    configFile: false,
    presets: [
      ["@babel/preset-react", { runtime: "automatic" }],
      ["@babel/preset-typescript", { isTSX: file.endsWith("x"), allExtensions: true }],
    ],
    plugins: [[stylex, stylexOptions], stripUnreferencedImports],
  });
  if (!result?.code) throw new Error(`StyleX build produced no code for ${file}`);
  return { code: result.code, rules: result.metadata?.stylex ?? [] };
}

fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

const rules = [];
for (const file of walk(srcRoot)) {
  const { code, rules: fileRules } = compile(file);
  rules.push(...fileRules);
  const relative = path.relative(srcRoot, file).replace(/\.tsx?$/, ".js");
  const target = path.join(outRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, code);
}

const componentCss = stylex.processStylexRules(rules, { useLayers: false });
const fonts = [
  "@import \"@fontsource/nunito/latin-400.css\";",
  "@import \"@fontsource/nunito/latin-500.css\";",
  "@import \"@fontsource/nunito/latin-600.css\";",
  "@import \"@fontsource/nunito/latin-700.css\";",
  "@import \"@fontsource/nunito/latin-800.css\";",
  "@import \"@fontsource/fredoka/latin-500.css\";",
  "@import \"@fontsource/fredoka/latin-600.css\";",
  "@import \"@fontsource/fredoka/latin-700.css\";",
  "@import \"@fontsource/archivo/latin-400.css\";",
  "@import \"@fontsource/archivo/latin-500.css\";",
  "@import \"@fontsource/archivo/latin-600.css\";",
  "@import \"@fontsource/archivo/latin-700.css\";",
  "@import \"@fontsource/archivo/latin-800.css\";",
  "@import \"@fontsource/archivo/latin-900.css\";",
  "@import \"@fontsource/fraunces/latin-400.css\";",
  "@import \"@fontsource/fraunces/latin-500.css\";",
  "@import \"@fontsource/fraunces/latin-600.css\";",
  "@import \"@fontsource/fraunces/latin-700.css\";",
  "@import \"@fontsource/fraunces/latin-400-italic.css\";",
  "@import \"@fontsource/fraunces/latin-600-italic.css\";",
  "@import \"@fontsource/fraunces/latin-700-italic.css\";",
  "@import \"@fontsource/inter/latin-400.css\";",
  "@import \"@fontsource/inter/latin-500.css\";",
  "@import \"@fontsource/inter/latin-600.css\";",
  "@import \"@fontsource/inter/latin-700.css\";",
  "@import \"@fontsource/montserrat/latin-700.css\";",
  "@import \"@fontsource/jetbrains-mono/latin-400.css\";",
  "@import \"@fontsource/jetbrains-mono/latin-500.css\";",
  "",
  "@font-face {",
  "  font-family: \"Garet\";",
  "  font-style: normal;",
  "  font-weight: 800;",
  "  font-display: swap;",
  "  src: url(\"./fonts/Garet-Heavy.woff2\") format(\"woff2\"), url(\"./fonts/Garet-Heavy.woff\") format(\"woff\");",
  "}",
  "",
  ":root {",
  "  --font-nunito: \"Nunito\", sans-serif;",
  "  --font-fredoka: \"Fredoka\", sans-serif;",
  "  --font-archivo: \"Archivo\", sans-serif;",
  "  --font-fraunces: \"Fraunces\", \"Times New Roman\", serif;",
  "  --font-inter: \"Inter\", system-ui, sans-serif;",
  "  --font-montserrat: \"Montserrat\", Helvetica Neue, Arial, sans-serif;",
  "  --font-garet: \"Garet\", system-ui, sans-serif;",
  "  --font-jetbrains-mono: \"JetBrains Mono\", ui-monospace, monospace;",
  "}",
  "",
].join("\n");

fs.writeFileSync(path.join(outRoot, "styles.css"), `${fonts}${componentCss}\n`);
fs.mkdirSync(path.join(outRoot, "fonts"), { recursive: true });
fs.copyFileSync(
  path.join(packageRoot, "fonts", "Garet-Heavy.woff2"),
  path.join(outRoot, "fonts", "Garet-Heavy.woff2"),
);
fs.copyFileSync(
  path.join(packageRoot, "fonts", "Garet-Heavy.woff"),
  path.join(outRoot, "fonts", "Garet-Heavy.woff"),
);

const sourcePackage = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
const published = {
  name: "@kenselasie/codeddesign",
  version: sourcePackage.version,
  description:
    "Build your apps with a unique-looking design system from CodedGuy.",
  license: "MIT",
  keywords: [
    "react",
    "design-system",
    "ui",
    "components",
    "stylex",
    "theme",
    "cartoon",
  ],
  homepage: "https://github.com/kenselasie/coded_design",
  repository: {
    type: "git",
    url: "git+https://github.com/kenselasie/coded_design.git",
  },
  bugs: {
    url: "https://github.com/kenselasie/coded_design/issues",
  },
  publishConfig: {
    registry: "https://registry.npmjs.org",
    access: "public",
  },
  sideEffects: ["**/*.css"],
  exports: {
    ".": {
      types: "./index.d.ts",
      default: "./index.js",
    },
    "./styles.css": "./styles.css",
    "./theme": {
      types: "./theme/index.d.ts",
      default: "./theme/index.js",
    },
    "./agent": {
      types: "./agent.d.ts",
      default: "./agent.js",
    },
    "./llms.txt": "./llms.txt",
    "./SYSTEM.md": "./SYSTEM.md",
    "./SKILL.md": "./SKILL.md",
  },
  peerDependencies: sourcePackage.peerDependencies,
  dependencies: sourcePackage.dependencies,
  files: [
    "**/*.js",
    "**/*.d.ts",
    "styles.css",
    "fonts/**",
    "llms.txt",
    "SYSTEM.md",
    "SKILL.md",
    "logo.svg",
    "README.md",
    "LICENSE",
  ],
};
fs.writeFileSync(path.join(outRoot, "package.json"), `${JSON.stringify(published, null, 2)}\n`);
fs.copyFileSync(path.join(packageRoot, "README.md"), path.join(outRoot, "README.md"));
fs.copyFileSync(path.join(packageRoot, "LICENSE"), path.join(outRoot, "LICENSE"));
fs.copyFileSync(path.join(packageRoot, "logo.svg"), path.join(outRoot, "logo.svg"));
fs.copyFileSync(path.join(packageRoot, "llms.txt"), path.join(outRoot, "llms.txt"));
fs.copyFileSync(path.join(packageRoot, "SKILL.md"), path.join(outRoot, "SKILL.md"));
fs.copyFileSync(path.join(packageRoot, "SYSTEM.md"), path.join(outRoot, "SYSTEM.md"));

if (!componentCss.includes("--codeddesign")) {
  throw new Error("Compiled CSS is missing design tokens");
}

const required = [
  "index.js",
  "agent.js",
  "theme/index.js",
  "styles.css",
  "fonts/Garet-Heavy.woff2",
  "llms.txt",
  "SYSTEM.md",
  "SKILL.md",
  "package.json",
  "README.md",
  "LICENSE",
];
for (const file of required) {
  if (!fs.existsSync(path.join(outRoot, file))) {
    throw new Error(`Publish build missing ${file}`);
  }
}

console.log(`Built @kenselasie/codeddesign@${sourcePackage.version} (${rules.length} style rules)`);
