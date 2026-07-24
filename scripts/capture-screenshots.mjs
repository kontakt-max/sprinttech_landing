import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

const CONSENT = JSON.stringify({
  version: "1",
  consent: { necessary: true, analytics: true, marketing: true, thirdParty: true },
});

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext();
await context.addInitScript((value) => {
  localStorage.setItem("sprinttech-consent", value);
}, CONSENT);

const page = await context.newPage();

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto("http://127.0.0.1:3000/");
  await page.waitForSelector(".hero-twin-section", { timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `screenshots/home-${vp.name}.png` });
  console.log(`saved screenshots/home-${vp.name}.png`);
}

await browser.close();
