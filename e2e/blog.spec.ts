import { expect, test, type Page } from "@playwright/test";

async function assertBlogIndex(page: Page) {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read post" }).first()).toBeVisible();
}

async function assertFirstPostFromIndex(page: Page) {
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
}

async function assertUnknownBlogSlugNotFound(page: Page) {
  await page.goto("/blog/this-slug-does-not-exist-9f3a2b1c");
  await expect(page.getByRole("heading", { level: 1, name: "Post not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to blog" })).toHaveAttribute("href", "/blog");
}

/** Site nav: Home → Blog → Home (Blog link from home, Home link from /blog). */
async function assertSiteNavBetweenHomeAndBlogIndex(page: Page) {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Site" }).getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();

  await page.getByRole("navigation", { name: "Site" }).getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

/** From a post → Blog → post → Home (Blog and Home links from post page).*/
async function assertSiteNavOnPostPageToBlogIndexAndHome(page: Page) {
  await page.goto("/blog");
  await page.getByRole("link", { name: "Read post" }).first().click();

  const nav = page.getByRole("navigation", { name: "Site" });
  await nav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL("/blog");
  await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();

  await page.getByRole("link", { name: "Read post" }).first().click();
  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

test("blog index shows title and at least one post", async ({ page }) => {
  await assertBlogIndex(page);
});

test("opens first post from index with matching title and body", async ({ page }) => {
  await assertFirstPostFromIndex(page);
});

test("unknown post slug shows blog not-found", async ({ page }) => {
  await assertUnknownBlogSlugNotFound(page);
});

test("site nav between home and blog index", async ({ page }) => {
  await assertSiteNavBetweenHomeAndBlogIndex(page);
});

test("site nav on blog post links to blog index and home", async ({ page }) => {
  await assertSiteNavOnPostPageToBlogIndexAndHome(page);
});

test("blog flows remain usable on mobile viewport", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await assertBlogIndex(page);
  await assertFirstPostFromIndex(page);
  await assertUnknownBlogSlugNotFound(page);

  await assertSiteNavBetweenHomeAndBlogIndex(page);
  await assertSiteNavOnPostPageToBlogIndexAndHome(page);

  await context.close();
});
