import { expect, test } from "@playwright/test";

const topLevelRoutes = [
  { path: "/", heading: /The Base e\.V\.|BOA Bunker of Art|Kulturzentrum/i },
  { path: "/live", heading: /Live-Programm|Live programme/i },
  { path: "/archive", heading: /Archiv für Kunst|Archive for art/i },
  { path: "/media", heading: /Medienproduktion|Media production/i },
  { path: "/about", heading: /The Base e\.V\.|BOA Bunker of Art/i },
] as const;

test.describe("The Base smoke tests", () => {
  test("active top-level routes render without 404 state", async ({ page }) => {
    for (const route of topLevelRoutes) {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
      await expect(page.getByText(/Seite nicht gefunden|Page not found/i)).toHaveCount(0);
    }
  });

  test("homepage renders the active editorial entry points and navigation", async ({ page }) => {
    await page.goto("/");
    const mainNav = page.getByRole("navigation", { name: /Hauptmenü|Main menu/i });

    await expect(mainNav.getByRole("link", { name: "Live", exact: true })).toBeVisible();
    await expect(mainNav.getByRole("link", { name: "Archive", exact: true })).toBeVisible();
    await expect(mainNav.getByRole("link", { name: "Media", exact: true })).toBeVisible();
    await expect(mainNav.getByRole("link", { name: "About", exact: true })).toBeVisible();

    await expect(page.locator('section[aria-labelledby="home-entry-points-heading"] a')).toHaveCount(3);
    await expect(page.getByRole("link", { name: /Laufende Formate/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Vergangene Veranstaltungen/i })).toBeVisible();
  });

  test("media page marks Media active and shows the intro", async ({ page }) => {
    await page.goto("/media");

    const mediaLink = page.getByRole("link", { name: "Media" });
    await expect(mediaLink).toBeVisible();
    await expect(mediaLink).toHaveAttribute("aria-current", "page");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Medienproduktion im Bunker of Art/i,
      }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /Medienproduktion buchen/i })).toBeVisible();
  });

  test("about subpages stay reachable from the current information architecture", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("link", { name: /Fördermitglied werden|Become a supporting member/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open Call|Open call/i })).toBeVisible();

    await page.goto("/about/foerdermitgliedschaft");
    await expect(page.getByRole("heading", { level: 1, name: /Fördermitglied|supporting member/i })).toBeVisible();

    await page.goto("/mitmachen");
    await expect(page.getByRole("heading", { level: 1, name: /Open Call|Open call/i })).toBeVisible();
  });
});
