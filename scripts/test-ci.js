#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const _path = require('node:path');

function runCommand(command, _description) {
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    return true;
  } catch (_error) {
    return false;
  }
}

function checkFileExists(filePath, _description) {
  if (fs.existsSync(filePath)) {
    return true;
  } else {
    return false;
  }
}

async function testCI() {
  let allPassed = true;

  // Test 1: Install dependencies
  if (!runCommand('pnpm install --frozen-lockfile', 'Installing dependencies')) {
    allPassed = false;
  }
  try {
    execSync('cd frontend && rm -rf node_modules pnpm-lock.yaml', { stdio: 'inherit' });
    execSync('cd frontend && pnpm install', { stdio: 'inherit' });
  } catch (_error) {
    allPassed = false;
  }

  // Test 2: Type checking
  if (!runCommand('pnpm run type-check', 'Type checking')) {
    allPassed = false;
  }
  const lintResult = runCommand('pnpm run lint', 'Linting with Biome');
  if (!lintResult) {
  }

  // Test 4: Building
  if (!runCommand('pnpm run build', 'Building packages')) {
    allPassed = false;
  }

  const artifacts = [
    { path: 'dist', description: 'Main package dist directory' },
    { path: 'public', description: 'Frontend public directory' },
  ];

  for (const artifact of artifacts) {
    if (!checkFileExists(artifact.path, artifact.description)) {
      allPassed = false;
    }
  }
  try {
    execSync('pnpm audit --audit-level moderate', { stdio: 'inherit' });
  } catch (_error) {}
  if (allPassed) {
  } else {
    process.exit(1);
  }
}

// Run the tests
testCI().catch(console.error);
