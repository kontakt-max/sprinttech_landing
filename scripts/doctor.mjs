import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createConnection } from "node:net";

const root = resolve(process.cwd());

const requiredFiles = [
  "package.json",
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/components/home/ThreatPulseHero.tsx",
  "src/components/home/HomePageClient.tsx",
  "src/app/api/threat-pulse/route.ts",
  "src/app/api/health/route.ts",
];

function envStatus(name) {
  const value = process.env[name];
  if (!value || value.trim() === "") return "missing";
  return "configured";
}

function optionalFlag(name, enabledWhenTrue = true) {
  const value = process.env[name];
  if (value === undefined || value === "") return "disabled";
  if (enabledWhenTrue) return value === "true" ? "enabled" : "disabled";
  return value === "false" ? "disabled" : "enabled";
}

async function checkPort(port) {
  return new Promise((resolvePromise) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.end();
      resolvePromise("in_use");
    });
    socket.once("error", () => resolvePromise("free"));
  });
}

console.log("=== SprintTech doctor ===");
console.log(`node: ${process.version}`);
console.log(`cwd: ${root}`);
console.log(`package.json: ${existsSync(resolve(root, "package.json")) ? "ok" : "missing"}`);
console.log(`node_modules: ${existsSync(resolve(root, "node_modules")) ? "ok" : "missing"}`);
console.log(`.env.local: ${existsSync(resolve(root, ".env.local")) ? "present" : "missing"}`);

console.log("\n-- required app files --");
for (const file of requiredFiles) {
  console.log(`${existsSync(resolve(root, file)) ? "ok" : "MISSING"} ${file}`);
}

console.log("\n-- public env --");
console.log(`NEXT_PUBLIC_SITE_URL: ${envStatus("NEXT_PUBLIC_SITE_URL")}`);
console.log(`NEXT_PUBLIC_SITE_NAME: ${envStatus("NEXT_PUBLIC_SITE_NAME")}`);

console.log("\n-- optional integrations (no secret values) --");
console.log(`THREAT_PULSE_ENABLED: ${optionalFlag("THREAT_PULSE_ENABLED")}`);
console.log(`NVD_API_KEY: ${envStatus("NVD_API_KEY")}`);
console.log(`GOOGLE_SERVICE_ACCOUNT_EMAIL: ${envStatus("GOOGLE_SERVICE_ACCOUNT_EMAIL")}`);
console.log(`GOOGLE_SHEETS_SPREADSHEET_ID: ${envStatus("GOOGLE_SHEETS_SPREADSHEET_ID")}`);
console.log(`SORO_WEBHOOK_ENABLED: ${optionalFlag("SORO_WEBHOOK_ENABLED")}`);
console.log(`SORO_WEBHOOK_API_KEY: ${envStatus("SORO_WEBHOOK_API_KEY")}`);
console.log(`LINKEDIN_INSIGHT_TAG: ${optionalFlag("NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG_ENABLED")}`);
console.log(`SHADOWSERVER: ${optionalFlag("SHADOWSERVER_INTEGRATION_ENABLED")}`);
console.log(`ANALYTICS: ${optionalFlag("NEXT_PUBLIC_ANALYTICS_ENABLED")}`);

const portStatus = await checkPort(3000);
console.log(`\nport 3000: ${portStatus}`);
console.log("\n[doctor] done");
