import { test } from "@playwright/test";

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

for (const vp of viewports) {
  test(`screenshot home ${vp.name}`, async ({ browser }) => {
    const context = await browser.newContext();
    await context.addInitScript((value) => {
      localStorage.setItem("sprinttech-consent", value);
    }, CONSENT);
    const page = await context.newPage();

    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await page.waitForSelector(".hero-twin-section", { timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `screenshots/home-${vp.name}.png`,
      fullPage: false,
    });
    await context.close();
  });
}
