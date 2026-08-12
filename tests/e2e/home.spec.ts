import { expect, test } from "@playwright/test";

test("loads the institutional home page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Rabelo & Rocha Advogados/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Fale com o escritório/i })).toBeVisible();
});
