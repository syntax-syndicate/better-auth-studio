#!/usr/bin/env node

const { resolveIPLocation, initializeGeoService } = require('../dist/geo-service.js');

async function testDefaultDatabase() {
  // Initialize the geo service
  await initializeGeoService();

  // Test IPs
  const testIPs = [
    '8.8.8.8', // Google DNS (US)
    '1.1.1.1', // Cloudflare (US)
    '46.4.0.1', // Germany
    '5.5.5.5', // UK
    '126.0.0.1', // Japan
    '103.0.0.1', // India
    '1.0.0.1', // Australia
    '177.0.0.1', // Brazil
    '41.0.0.1', // South Africa
    '192.168.1.1', // Private IP (should fallback)
  ];

  for (const ip of testIPs) {
    const location = resolveIPLocation(ip);
    if (location) {
      const _flag = location.countryCode ? getCountryFlag(location.countryCode) : '🌍';
    } else {
    }
  }
}

function getCountryFlag(countryCode) {
  if (!countryCode) return '🌍';

  // Convert country code to flag emoji
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Run the test
testDefaultDatabase().catch(console.error);
