#!/usr/bin/env node

/**
 * Postinstall script to ensure public directory exists
 * This runs after npm/pnpm install to handle edge cases where
 * the public directory isn't extracted properly (e.g., Vercel with pnpm)
 */

const fs = require('fs');
const path = require('path');

// Find the package root
const packageRoot = path.resolve(__dirname, '..');
const distDir = path.join(packageRoot, 'dist');
const publicInDist = path.join(distDir, 'public');
const publicInRoot = path.join(packageRoot, 'public');

console.log('[better-auth-studio] Running postinstall...');

// Check if either public directory exists
const hasPublicInDist = fs.existsSync(publicInDist) && fs.existsSync(path.join(publicInDist, 'index.html'));
const hasPublicInRoot = fs.existsSync(publicInRoot) && fs.existsSync(path.join(publicInRoot, 'index.html'));

if (hasPublicInDist || hasPublicInRoot) {
  console.log('[better-auth-studio] ✓ Public directory found');
  
  // Ensure both locations have the public files for maximum compatibility
  if (hasPublicInRoot && !hasPublicInDist) {
    try {
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      copyRecursive(publicInRoot, publicInDist);
      console.log('[better-auth-studio] ✓ Copied public/ to dist/public/');
    } catch (err) {
      console.warn('[better-auth-studio] Warning: Could not copy to dist/public:', err.message);
    }
  } else if (hasPublicInDist && !hasPublicInRoot) {
    try {
      copyRecursive(publicInDist, publicInRoot);
      console.log('[better-auth-studio] ✓ Copied dist/public/ to public/');
    } catch (err) {
      console.warn('[better-auth-studio] Warning: Could not copy to public:', err.message);
    }
  }
} else {
  console.warn('[better-auth-studio] ⚠ Warning: Public directory not found. Studio UI may not work correctly.');
  console.warn('[better-auth-studio] Please report this issue at: https://github.com/better-auth/better-auth-studio/issues');
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

