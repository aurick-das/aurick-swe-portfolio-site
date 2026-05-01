import { getProfile, getProjects, getSocialLinks } from "@/lib/data";
import { expect, test, type Page } from "@playwright/test";

async function assertCoreSections(page: Page) {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Links" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Tech Stack" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toBeVisible();
}

async function assertCTAAndLinks(page: Page) {
  const { primaryCta } = getProfile();
  await expect(page.getByRole("link", { name: primaryCta.label })).toBeVisible();

  const socialLinks = getSocialLinks();
  for (const { label } of socialLinks) {
    await expect(page.getByRole("link", { name: `Open ${label}` })).toBeVisible();
  }
}

async function assertProjectCards(page: Page) {
  const projects = getProjects();
  for (const { title } of projects) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
}

async function assertExternalLinksResolve(page: Page) {
  const allHrefs = await page.getByRole("link").evaluateAll(
    els => els
      .map(el => el.getAttribute("href"))
      .filter((h): h is string => !!h && h.startsWith("http"))
  );

  expect(allHrefs.length, "Expected at least one external link on the page").toBeGreaterThan(0);

  const insecure = allHrefs.filter(h => h.startsWith("http://"));
  expect(insecure, `Non-HTTPS links found: ${insecure.join(", ")}`).toHaveLength(0);

  const SKIP_DOMAINS = [  // some domains block bots
    "linkedin.com",
    "instagram.com",
  ];
  
  const broken: { url: string; status: number }[] = [];
  for (const url of allHrefs) {
    if (SKIP_DOMAINS.some(domain => url.includes(domain))) continue;
  
    const response = await page.request.head(url, {
      timeout: 8000,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });
    if (response.status() >= 400) {
      const response_backup = await page.request.get(url, {
        timeout: 8000,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
      });
      if (response_backup.status() >= 400) {
        broken.push({ url, status: response.status() });
      }
    }
  }
  expect(broken, `Broken links found: ${JSON.stringify(broken, null, 2)}`).toHaveLength(0);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("homepage renders core sections", async ({ page }) => {
  await assertCoreSections(page);
});

test("primary CTA and social links are present", async ({ page }) => {
  await assertCTAAndLinks(page);
});

test("project cards are visible", async ({ page }) => {
  await assertProjectCards(page);
});

test("all external links resolve", async ({ page }) => {
  await assertExternalLinksResolve(page);
});

test("page remains usable on mobile viewport", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");

  await assertCoreSections(page);
  await assertCTAAndLinks(page);
  await assertProjectCards(page);
  await assertExternalLinksResolve(page);

  await context.close();
});