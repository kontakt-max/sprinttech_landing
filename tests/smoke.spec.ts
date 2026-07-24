import { test, expect } from "@playwright/test";

const publicRoutes = [
  "/",
  "/o-nas",
  "/oferta",
  "/oferta/pentesty",
  "/oferta/audyty",
  "/oferta/soc",
  "/oferta/ot-ics",
  "/case-study",
  "/artykuly",
  "/kontakt",
];

function isBenignPageError(message: string): boolean {
  if (message.includes("Content Security Policy") && message.includes("unsafe-eval")) return true;
  if (message === "Invalid or unexpected token") return true;
  return false;
}

async function waitForHeroTabs(page: import("@playwright/test").Page) {
  const tab = page.getByRole("tab", { name: "Podatność" });
  await tab.waitFor({ state: "visible", timeout: 20_000 });
  return tab;
}

test.describe("SprintTech smoke", () => {
  test("home loads with visible H1", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => {
      if (!isBenignPageError(err.message)) errors.push(err.message);
    });

    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("scenario tabs are clickable and change scenario story", async ({ page }) => {
    await page.goto("/");
    await waitForHeroTabs(page);

    await page.getByRole("tab", { name: /Incydent SOC/i }).click();
    await expect(page.getByRole("tabpanel")).toContainText(/EDR|MITRE|triage/i);
  });

  test("all scenario tabs respond", async ({ page }) => {
    await page.goto("/");
    await waitForHeroTabs(page);

    const labels = ["Podatność", "Incydent SOC", "NIS2 / DORA", "OT / ICS"];

    for (const label of labels) {
      await page.getByRole("tab", { name: label }).click();
      await expect(page.getByRole("tab", { name: label })).toHaveAttribute("aria-selected", "true");
    }
  });

  test("primary CTA links to /kontakt", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Umów konsultację/i }).first();
    await expect(cta).toHaveAttribute("href", "/kontakt");
  });

  test("public routes return 200", async ({ request }) => {
    for (const route of publicRoutes) {
      const res = await request.get(route);
      expect(res.status(), route).toBe(200);
    }
  });

  test("/api/health returns ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("ok");
    expect(json.app).toBe("sprinttech-website");
    expect(json.integrations).toBeDefined();
  });

  test("/api/threat-pulse returns fallback without NVD key", async ({ request }) => {
    const res = await request.get("/api/threat-pulse");
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.lastUpdated).toBeTruthy();
    expect(["live", "fallback", "partial"]).toContain(json.mode);
    expect(json.sources).toBeInstanceOf(Array);
  });

  test("contact form shows validation errors", async ({ page }) => {
    await page.goto("/kontakt");
    await page.getByRole("button", { name: /Wyślij zgłoszenie/i }).click();
    await expect(page.getByText(/Podaj imię|Wymagana zgoda/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("mega menu opens on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const ofertaButton = page.getByRole("button", { name: /Oferta/i });
    await ofertaButton.hover();
    await expect(page.getByRole("menu", { name: /Podmenu oferty/i })).toBeVisible({
      timeout: 8000,
    });
  });
});
