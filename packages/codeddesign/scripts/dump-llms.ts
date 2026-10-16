import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { toLlmsTxt } from "../src/agent";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
writeFileSync(join(root, "llms.txt"), `${toLlmsTxt()}\n`);
console.log("Wrote llms.txt");
