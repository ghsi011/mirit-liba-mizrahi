import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createServer } from "node:http";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";
import axe from "axe-core";

const root = process.cwd();
const base = "/mirit-liba-mizrahi/";
const name = "מירית ליבה-מזרחי";
const evidence = path.join(root, ".verification");
await mkdir(evidence, { recursive: true });
const checks = [];
const browserVersions = new Set();
async function launchBrowser() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
  });
  browserVersions.add(browser.version());
  return browser;
}
function command(args, cwd = root, shouldPass = true) {
  const run = spawnSync("npm", args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
  });
  if ((run.status === 0) !== shouldPass)
    throw new Error(
      `npm ${args.join(" ")} failed expectation\n${run.stdout}\n${run.stderr}`,
    );
  return run.stdout + run.stderr;
}
async function serve(directory) {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css",
    ".woff2": "font/woff2",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
  };
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (!pathname.startsWith(base)) {
      res.writeHead(404).end();
      return;
    }
    const file = path.resolve(
      directory,
      pathname.slice(base.length) || "index.html",
    );
    if (!file.startsWith(path.resolve(directory) + path.sep)) {
      res.writeHead(404).end();
      return;
    }
    try {
      const body = await readFile(file);
      res
        .writeHead(200, {
          "Content-Type":
            mime[path.extname(file)] || "application/octet-stream",
        })
        .end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}${base}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
async function inspect(directory, variant, expected) {
  let browser;
  const server = await serve(directory);
  try {
    for (const width of [320, 390, 1440]) {
      browser = await launchBrowser();
      const context = await browser.newContext({
        viewport: { width, height: width < 500 ? 844 : 1000 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const failures = [];
      page.on("pageerror", (error) => failures.push(error.message));
      page.on("response", (response) => {
        if (response.status() >= 400)
          failures.push(`${response.status()} ${response.url()}`);
      });
      page.on("requestfailed", (request) => failures.push(request.url()));
      page.on("request", (request) => {
        if (!request.url().startsWith(new URL(server.url).origin))
          failures.push(`External request: ${request.url()}`);
      });
      assert.equal((await page.goto(server.url)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("html").getAttribute("lang"), "he");
      assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
      assert.equal(
        (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
        name,
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.ok(
        await page
          .locator(".dedication p")
          .innerText()
          .then((text) => text === expected.dedication.trim()),
      );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        "Horizontal overflow",
      );
      if (!expected.photo) {
        assert.ok(await page.locator("figcaption").isVisible());
        assert.equal(
          await page.locator("figcaption").innerText(),
          "מקום לתמונה",
        );
        assert.equal(await page.locator("img").count(), 0);
      } else {
        const photo = page.getByRole("img", {
          name: expected.photo.alt.trim(),
        });
        assert.ok(await photo.isVisible());
        assert.ok(
          await photo.evaluate((img) => img.complete && img.naturalWidth > 0),
        );
        assert.ok(
          (await photo.getAttribute("src")).startsWith(base),
          "Photo must respect the Pages project path",
        );
        assert.equal(await page.locator("figcaption").count(), 0);
      }
      await page.addScriptTag({ content: axe.source });
      const audit = await page.evaluate(async () =>
        window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      assert.deepEqual(
        audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.length })),
        [],
        "Accessibility violations",
      );
      await page.screenshot({
        path: path.join(evidence, `${variant}-${width}.png`),
        fullPage: true,
      });
      assert.deepEqual(failures, [], "Page/network errors");
      checks.push(
        `${variant}: ${width}px, RTL, name, layout, image state, local assets, WCAG A/AA`,
      );
      await context.close();
      await browser.close();
      browser = undefined;
    }
    browser = await launchBrowser();
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(server.url);
    assert.ok(
      await page.getByRole("heading", { name, exact: true }).isVisible(),
    );
    assert.equal(
      await page.locator(".dedication p").innerText(),
      expected.dedication.trim(),
    );
    assert.ok(await page.locator(".dedication p").isVisible());
    if (expected.photo) {
      const photo = page.getByRole("img", { name: expected.photo.alt.trim() });
      assert.ok(await photo.isVisible());
      await photo.evaluate((image) => image.decode());
    } else {
      assert.ok(await page.locator("figcaption").isVisible());
      assert.equal(await page.locator("figcaption").innerText(), "מקום לתמונה");
    }
    await context.close();
    assert.equal(
      (await fetch(new URL("/_astro/not-a-real-file.css", server.url))).status,
      404,
      "Server must not conceal root-path errors",
    );
    checks.push(
      `${variant}: readable with JavaScript disabled; strict subpath server`,
    );
  } finally {
    await browser?.close();
    await server.close();
  }
}

let fixture;
try {
  command(["run", "format:check"]);
  command(["run", "lint"]);
  checks.push("Formatting, JavaScript and Astro lint, CSS lint");
  command(["run", "check"]);
  command(["run", "build"]);
  command(["run", "lint:html"]);
  checks.push("Type/content check, production build and HTML validation");
  const current = JSON.parse(
    await readFile(path.join(root, "src/content/memorial.json"), "utf8"),
  );
  await inspect(path.join(root, "dist"), "current", current);
  fixture = await mkdtemp(path.join(tmpdir(), "memorial-verify-"));
  for (const item of [
    "src",
    "public",
    "astro.config.mjs",
    "tsconfig.json",
    "package.json",
    ".htmlvalidate.json",
  ]) {
    await cp(path.join(root, item), path.join(fixture, item), {
      recursive: true,
    });
  }
  await symlink(
    path.join(root, "node_modules"),
    path.join(fixture, "node_modules"),
    "dir",
  );
  const contentPath = path.join(fixture, "src/content/memorial.json");
  const content = JSON.parse(await readFile(contentPath, "utf8"));
  content.photo = null;
  content.dedication = "טקסט בדיקה <ללא HTML>";
  await writeFile(contentPath, JSON.stringify(content));
  command(["run", "build"], fixture);
  command(["run", "lint:html"], fixture);
  await inspect(path.join(fixture, "dist"), "placeholder", content);
  await mkdir(path.join(fixture, "src/assets/photos"), { recursive: true });
  await cp(
    path.join(root, "tests/fixtures/photo.png"),
    path.join(fixture, "src/assets/photos/verification.png"),
  );
  content.photo = { file: "verification.png", alt: "תמונת בדיקה מופשטת" };
  await writeFile(contentPath, JSON.stringify(content));
  command(["run", "build"], fixture);
  command(["run", "lint:html"], fixture);
  await inspect(path.join(fixture, "dist"), "photo", content);
  content.photo.file = "missing.png";
  await writeFile(contentPath, JSON.stringify(content));
  const missingLog = command(["run", "build"], fixture, false);
  assert.match(missingLog, /missing|photo|תמונה/i);
  checks.push("Missing photo rejected by actual production build");
  content.photo = null;
  content.name = "Unapproved spelling";
  await writeFile(contentPath, JSON.stringify(content));
  const nameLog = command(["run", "build"], fixture, false);
  assert.match(nameLog, /name|מירית|invalid/i);
  checks.push("Changed name rejected by actual production build");
  content.name = name;
  content.photo = { file: "../outside.png", alt: "בדיקה" };
  await writeFile(contentPath, JSON.stringify(content));
  command(["run", "build"], fixture, false);
  checks.push("Unsafe photo path rejected by actual production build");
  await writeFile(
    path.join(evidence, "report.json"),
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        browsers: [...browserVersions],
        browserExecutableOverride:
          process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || null,
        checks,
        liveGitHubPagesVerified: false,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(checks.map((check) => `PASS ${check}`).join("\n"));
} finally {
  if (fixture) await rm(fixture, { recursive: true, force: true });
}
