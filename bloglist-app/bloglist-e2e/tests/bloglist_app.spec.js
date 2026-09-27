const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Arto Hellas",
        username: "hellas",
        password: "hellas12345",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
      await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");
      const notification = page.getByText("wrong username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(notification).toHaveCSS("border-style", "solid");
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "mluukkai", "salainen");
      });

      test("a new blog can be created", async ({ page }) => {
        const title = "Building the Mark I Suit";
        const author = "Tony Stark";
        const url = "https://starkindustries.com/mark1";

        await createBlog(page, title, author, url);

        await expect(page.getByText(`${title} ${author}`)).toBeVisible();
        await expect(page.getByRole("button", { name: "view" })).toBeVisible();
      });

      describe("blogs exists", () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            "Building the Mark I Suit",
            "Tony Stark",
            "https://starkindustries.com/mark1",
          );
          await createBlog(
            page,
            "Arc Reactor Explained",
            "Tony Stark",
            "https://starkindustries.com/arcreactor",
          );
        });

        test("blog can be liked", async ({ page }) => {
          const blogElement = page
            .getByTestId("blog")
            .filter({ hasText: "Arc Reactor Explained Tony Stark" });

          await blogElement.getByRole("button", { name: "view" }).click();

          const likesText = blogElement.getByText(/^likes \d+$/);
          const likesContainer = likesText.locator("..");

          const before = await likesText.textContent();
          const beforeLikes = Number(before.match(/\d+/)[0]);

          await likesContainer.getByRole("button", { name: "like" }).click();

          await expect(likesText).toHaveText(`likes ${beforeLikes + 1}`);
        });

        test("blog can be deleted", async ({ page }) => {
          const blogElement = page
            .getByTestId("blog")
            .filter({ hasText: "Arc Reactor Explained Tony Stark" });

          await blogElement.getByRole("button", { name: "view" }).click();

          page.on("dialog", async (dialog) => {
            await dialog.accept();
          });

          await expect(
            blogElement.getByRole("button", { name: "remove" }),
          ).toBeVisible();

          await blogElement.getByRole("button", { name: "remove" }).click();

          await expect(blogElement).toHaveCount(0);
        });

        test("only creator can remove a blog", async ({ page }) => {
          const title = "Express Middleware";
          const author = "Sandeep Rout";
          const url = "https://example.com/middleware";

          await createBlog(page, title, author, url);
          await page.getByRole("button", { name: "logout" }).click();

          await loginWith(page, "hellas", "hellas12345");

          const blogElement = page
            .getByTestId("blog")
            .filter({ hasText: `${title} ${author}` });
          await blogElement.getByRole("button", { name: "view" }).click();

          await expect(
            blogElement.getByRole("button", { name: "remove" }),
          ).toHaveCount(0);
        });
      });

      describe("blogs ordering", () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            "Building the Mark I Suit",
            "Tony Stark",
            "https://starkindustries.com/mark1",
          );
          await createBlog(
            page,
            "Arc Reactor Explained",
            "Tony Stark",
            "https://starkindustries.com/arcreactor",
          );
          await createBlog(
            page,
            "JWT Deep Dive",
            "Randy Orton",
            "https://example.com/jwt",
          );
        });

        test("blogs are ordered by likes", async ({ page }) => {
          test.setTimeout(10000);

          const blogTwo = page
            .getByTestId("blog")
            .filter({ hasText: "Arc Reactor Explained" });

          await blogTwo.getByRole("button", { name: "view" }).click();

          await blogTwo.getByRole("button", { name: "like" }).click();
          await blogTwo.getByText("likes 1").waitFor();
          await blogTwo.getByRole("button", { name: "like" }).click();
          await blogTwo.getByText("likes 2").waitFor();

          const blogThree = page
            .getByTestId("blog")
            .filter({ hasText: "JWT Deep Dive" });

          await blogThree.getByRole("button", { name: "view" }).click();

          await blogThree.getByRole("button", { name: "like" }).click();
          await blogThree.getByText("likes 1").waitFor();
          await blogThree.getByRole("button", { name: "like" }).click();
          await blogThree.getByText("likes 2").waitFor();
          await blogThree.getByRole("button", { name: "like" }).click();
          await blogThree.getByText("likes 3").waitFor();
          await blogThree.getByRole("button", { name: "like" }).click();
          await blogThree.getByText("likes 4").waitFor();
          await blogThree.getByRole("button", { name: "like" }).click();
          await blogThree.getByText("likes 5").waitFor();

          const blogs = await page.getByTestId("blog").allTextContents();

          expect(blogs[0]).toContain("JWT Deep Dive");
          expect(blogs[1]).toContain("Arc Reactor Explained");
          expect(blogs[2]).toContain("Building the Mark I Suit");
        });
      });
    });
  });
});
