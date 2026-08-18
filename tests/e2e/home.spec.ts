import { expect, test } from "@playwright/test";

test("loads the institutional home page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /direito, inovação e tecnologia/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("main").getByRole("link", { name: /Fale com o escritório/i }),
  ).toBeVisible();
});
