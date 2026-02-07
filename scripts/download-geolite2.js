#!/usr/bin/env node

/**
 * Downloads GeoLite2-City.mmdb for accurate IP geolocation.
 * Uses P3TERX/GeoLite.mmdb (weekly-updated MaxMind GeoLite2 mirror).
 * Run: node scripts/download-geolite2.js or pnpm geo:update
 */
const https = require("node:https");
const fs = require("node:fs");
const path = require("node:path");

const GEO_DB_VERSION = "2026.01.22";
const GEO_DB_URL = `https://github.com/P3TERX/GeoLite.mmdb/releases/download/${GEO_DB_VERSION}/GeoLite2-City.mmdb`;
const OUTPUT_PATH = path.join(__dirname, "..", "data", "GeoLite2-City.mmdb");

const dataDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const file = fs.createWriteStream(OUTPUT_PATH);

console.log("[better-auth-studio] Downloading GeoLite2-City.mmdb for IP lookup...");
https
  .get(GEO_DB_URL, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("[better-auth-studio] ✓ GeoLite2-City.mmdb saved to data/");
      });
      file.on("error", (err) => {
        fs.unlink(OUTPUT_PATH, () => {});
        console.error("[better-auth-studio] Download failed:", err.message);
      });
    } else {
      console.error("[better-auth-studio] Download failed: HTTP", response.statusCode);
    }
  })
  .on("error", (err) => {
    console.error("[better-auth-studio] Download error:", err.message);
  });
