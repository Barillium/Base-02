import { expect, test } from "@playwright/test";

test.describe("The Base smoke tests", () => {
  test("homepage renders the editorial hero and main navigation", async ({ page }) => {
    await page.goto("/");
    const mainNav = page.getByRole("navigation", { name: /Hauptmenü|Main menu/i });

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Ausstellungen, Konzerte und Workshops im Bunker of Art/i,
      }),
    ).toBeVisible();

    await expect(mainNav.getByRole("link", { name: "Live", exact: true })).toBeVisible();
    await expect(mainNav.getByRole("link", { name: "About", exact: true })).toBeVisible();
    await expect(page.getByText("The Base e.V. organisiert im BOA Bunker of Art", { exact: false })).toBeVisible();
  });

  test("people page marks Talents active and shows the intro", async ({ page }) => {
    await page.goto("/people");

    const talentsLink = page.getByRole("link", { name: "Talents" });
    await expect(talentsLink).toBeVisible();
    await expect(talentsLink).toHaveAttribute("aria-current", "page");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Künstler:innen, DJs und Mitwirkende/i,
      }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /Profile und Positionen/i })).toBeVisible();
  });
});
