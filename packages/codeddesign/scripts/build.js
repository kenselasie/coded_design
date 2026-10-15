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
  "",
  ":root {",
  "  --font-nunito: \"Nunito\", sans-serif;",
  "  --font-fredoka: \"Fredoka\", sans-serif;",
  "}",
  "",
].join("\n");

fs.writeFileSync(path.join(outRoot, "styles.css"), `${fonts}${componentCss}\n`);

const sourcePackage = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
const published = {
  name: "@kenselasie/codeddesign",
  version: sourcePackage.version,
  description:
    "Cartoon React design system with StyleX tokens, Fredoka + Nunito, and light/dark palettes.",
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
  },
  peerDependencies: sourcePackage.peerDependencies,
  dependencies: sourcePackage.dependencies,
};
fs.writeFileSync(path.join(outRoot, "package.json"), `${JSON.stringify(published, null, 2)}\n`);
fs.copyFileSync(path.join(packageRoot, "README.md"), path.join(outRoot, "README.md"));
fs.copyFileSync(path.join(packageRoot, "LICENSE"), path.join(outRoot, "LICENSE"));

if (!componentCss.includes("--codeddesign")) {
  throw new Error("Compiled CSS is missing design tokens");
}

console.log(`Built @kenselasie/codeddesign (${rules.length} style rules)`);
