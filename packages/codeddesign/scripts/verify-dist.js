const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "../dist");
const required = ["index.d.ts", "agent.d.ts", "theme/index.d.ts"];

for (const file of required) {
  if (!fs.existsSync(path.join(dist, file))) {
    console.error(`Publish build missing ${file}`);
    process.exit(1);
  }
}
