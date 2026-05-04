import { expect, test } from "@playwright/test";

test("blog index shows title and at least one post", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read post" }).first()).toBeVisible();
});

test("opens first post from index with matching title and body", async ({ page }) => {
  await page.goto("/blog");
  const firstCard = page.getByRole("article").first();
  const title = await firstCard.getByRole("heading", { level: 3 }).textContent();
  expect(title?.trim().length).toBeGreaterThan(0);

  const readPost = firstCard.getByRole("link", { name: "Read post" });
  const href = await readPost.getAttribute("href");
  expect(href).toMatch(/^\/blog\/.+/);

  await readPost.click();
  expect(href).toBeTruthy();
  await expect(page).toHaveURL((url) => new URL(url).pathname === href);

  await expect(page.getByRole("heading", { level: 1, name: title!.trim() })).toBeVisible();
  await expect(page.locator(".prose")).toBeVisible();
  await expect(page.locator(".prose p").first()).toBeVisible();
});

test("unknown post slug shows Next.js not-found", async ({ page }) => {
  await page.goto("/blog/this-slug-does-not-exist-9f3a2b1c");
  // With dynamicParams=false, unknown slugs never hit [slug]/page; Next serves the default 404.
  await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});

test("site nav Blog link on home goes to blog index", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Site" }).getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
});
