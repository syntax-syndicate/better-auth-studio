#!/usr/bin/env node

const _http = require('node:http');

async function testConfigEndpoint() {
  try {
    const response = await fetch('http://localhost:3002/api/config');

    if (response.ok) {
      const config = await response.json();
      if (config.socialProviders && config.socialProviders.length > 0) {
        config.socialProviders.forEach((_provider) => {});
      } else {
      }
      if (config.rateLimit?.enabled) {
      }
    } else {
      const _errorText = await response.text();
    }
  } catch (_error) {}
}

// Run the test
testConfigEndpoint();
