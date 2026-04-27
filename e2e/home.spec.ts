import { expect, test } from "@playwright/test";

test("homepage renders core sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Auric" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Links" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Tech Stack" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Projects" })).toBeVisible();
});

test("primary CTA and social links are present", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Book a Call" })).toHaveAttribute(
    "href",
    "https://cal.com/example"
  );
  await expect(page.getByRole("link", { name: "Open GitHub" })).toBeVisible();
});

test("page remains usable on mobile viewport", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Auric" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a Call" })).toBeVisible();

  await context.close();
});
