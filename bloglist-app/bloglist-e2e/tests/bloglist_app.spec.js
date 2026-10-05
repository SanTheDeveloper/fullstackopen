const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // Reset creates an isolated starting point; this endpoint exists only in
    // test mode and targets the dedicated test database.
    const resetResponse = await request.post("/api/testing/reset");
    expect(resetResponse.status()).toBe(204);

    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  test("login succeeds with the correct username and password", async ({
    page,
  }) => {
    await loginWith(page, "mluukkai", "salainen");

    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    await expect(
      page.getByText("Welcome back, Matti Luukkainen"),
    ).toBeVisible();
  });

  test("login fails with an incorrect username or password", async ({
    page,
  }) => {
    await loginWith(page, "mluukkai", "wrong-password");

    await expect(page.getByText("wrong username or password")).toBeVisible();

    await expect(page.getByRole("button", { name: "logout" })).toHaveCount(0);
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a logged-in user can create a blog", async ({ page }) => {
      const title = "Building the Mark I Suit";
      const author = "Tony Stark";
      const url = "https://starkindustries.com/mark1";

      await createBlog(page, title, author, url);

      await expect(
        page.getByRole("link", { name: `${title} by ${author}` }),
      ).toBeVisible();
    });

    test("a logged-in user can like a blog", async ({ page }) => {
      const title = "Arc Reactor Explained";
      const author = "Tony Stark";
      const url = "https://starkindustries.com/arcreactor";

      await createBlog(page, title, author, url);

      // Open the blog's routed detail page.
      await page.getByRole("link", { name: `${title} by ${author}` }).click();

      const likesText = page.getByText(/^likes \d+$/);
      const initialLikesText = await likesText.textContent();
      const initialLikes = Number(initialLikesText.match(/\d+/)[0]);

      await page.getByRole("button", { name: "like" }).click();

      await expect(likesText).toHaveText(`likes ${initialLikes + 1}`);
    });

    test("a logged-in user can delete a blog they created", async ({
      page,
    }) => {
      const title = "Express Middleware";
      const author = "Sandeep Rout";
      const url = "https://example.com/middleware";

      await createBlog(page, title, author, url);
      await page.getByRole("link", { name: `${title} by ${author}` }).click();

      // Accept the browser's confirmation dialog so deletion can proceed.
      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "remove" }).click();

      // The app redirects to the blogs list after deletion.
      await expect(
        page.getByRole("link", { name: `${title} by ${author}` }),
      ).toHaveCount(0);
    });
  });
});
