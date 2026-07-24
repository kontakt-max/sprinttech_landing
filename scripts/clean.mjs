import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const safeTargets = [".next", "out", "coverage"];

for (const target of safeTargets) {
  const fullPath = resolve(root, target);
  if (!fullPath.startsWith(root)) {
    console.warn(`[clean] skipped unsafe path: ${target}`);
    continue;
  }
  if (existsSync(fullPath)) {
    rmSync(fullPath, { recursive: true, force: true });
    console.log(`[clean] removed ${target}`);
  } else {
    console.log(`[clean] skip ${target} (not found)`);
  }
}

console.log("[clean] done");
