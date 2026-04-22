import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

console.log("Building service worker via package script...");

const npmCli = process.env.npm_execpath;

const result = npmCli
  ? spawnSync(process.execPath, [npmCli, "run", "build:workbox"], {
      stdio: "inherit",
    })
  : spawnSync("npm", ["run", "build:workbox"], {
      shell: process.platform === "win32",
      stdio: "inherit",
    });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const indexPath = resolve(process.cwd(), "index.html");
const swInitTag =
  '<script type="module" src="service-worker/init.mjs"></script>';

const indexHtml = readFileSync(indexPath, "utf8");

if (!indexHtml.includes(swInitTag)) {
  const closingBodyToken = "\n  </body>";
  const closingBodyIndex = indexHtml.lastIndexOf(closingBodyToken);

  if (closingBodyIndex === -1) {
    throw new Error("Could not find expected closing </body> in index.html");
  }

  const updatedHtml =
    `${indexHtml.slice(0, closingBodyIndex)}\n    ${swInitTag}${indexHtml.slice(closingBodyIndex)}`;

  writeFileSync(indexPath, updatedHtml, "utf8");
  console.log("Added service worker init module to index.html.");
} else {
  console.log("Service worker init module already present in index.html.");
}
