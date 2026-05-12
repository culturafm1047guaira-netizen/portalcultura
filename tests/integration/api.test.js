const { readdirSync, readFileSync, existsSync } = require("fs");
const { join, dirname } = require("path");

describe("API Integration Tests", () => {
  describe("src/app/api/news structure", () => {
    test("route.ts exists and exports GET handler", () => {
      const route = join(__dirname, "../../src/app/api/news/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("GET");
      expect(content).toContain("NextResponse");
    });

    test("has RSS feed configuration", () => {
      const route = join(__dirname, "../../src/app/api/news/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("FEEDS");
      expect(content).toContain("rss-parser");
    });
  });

  describe("src/app/api/weather structure", () => {
    test("route.ts exists and exports GET handler", () => {
      const route = join(__dirname, "../../src/app/api/weather/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("GET");
      expect(content).toContain("wttr.in");
    });
  });

  describe("src/app/api/publicities structure", () => {
    test("route.ts exists and exports GET handler", () => {
      const route = join(__dirname, "../../src/app/api/publicities/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("GET");
      expect(content).toContain("Publicidades");
    });
  });

  describe("src/app/api/quotes structure", () => {
    test("route.ts exists and exports GET handler", () => {
      const route = join(__dirname, "../../src/app/api/quotes/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("GET");
      expect(content).toContain("awesomeapi");
    });

    test("has CEPEA indicators for commodities", () => {
      const route = join(__dirname, "../../src/app/api/quotes/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("cepea");
      expect(content).toContain("boi-gordo");
    });
  });

  describe("src/app/api/youtube structure", () => {
    test("route.ts exists and exports GET handler", () => {
      const route = join(__dirname, "../../src/app/api/youtube/route.ts");
      const content = readFileSync(route, "utf-8");
      expect(content).toContain("GET");
      expect(content).toContain("fallbackVideos");
    });
  });

  describe("File system checks", () => {
    test("Publicidades directory exists in public", () => {
      const pubDir = join(__dirname, "../../public/Publicidades");
      expect(existsSync(pubDir)).toBe(true);
    });

    test("src/app/api directory has expected route handlers", () => {
      const apiDir = join(__dirname, "../../src/app/api");
      const dirs = readdirSync(apiDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
      expect(dirs).toContain("news");
      expect(dirs).toContain("weather");
      expect(dirs).toContain("publicities");
      expect(dirs).toContain("quotes");
      expect(dirs).toContain("youtube");
    });
  });
});
