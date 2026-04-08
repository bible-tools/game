import { spawnSync } from "node:child_process";

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
