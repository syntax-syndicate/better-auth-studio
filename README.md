# Better Auth Studio Monorepo

A comprehensive monorepo for Better Auth Studio - a beautiful GUI dashboard for Better Auth authentication system.

## 🏗️ Project Structure

```
bt-studio/
├── packages/           # Core packages
│   ├── studio/        # Main studio application
│   ├── cli/           # CLI tool for running studio
│   └── web/           # Landing page (Vite + React)
├── apps/              # Applications
│   └── docs/          # Documentation site (Next.js)
├── tests/             # Test projects
│   ├── prisma/        # Prisma test project
│   └── drizzle/       # Drizzle test project
└── package.json       # Root workspace configuration
```

## 📦 Packages

### `@better-auth/studio`
The main studio application that provides the GUI dashboard for managing Better Auth.

**Features:**
- User management interface
- Session monitoring and control
- Organization management
- Real-time updates via WebSocket
- Database integration (Prisma, Drizzle, etc.)
- Analytics and insights

### `@better-auth/cli`
Command-line interface for running Better Auth Studio.

**Usage:**
```bash
# Install globally
npm install -g @better-auth/cli

# Start studio
better-auth-studio start

# Or use npx
npx @better-auth/cli start
```

### `@better-auth/web`
Landing page and marketing site built with Vite and React.

**Features:**
- Modern, responsive design
- Feature showcase
- Getting started guide
- Documentation links

## 🚀 Applications

### `docs` (Next.js Documentation)
Complete documentation site built with Next.js, featuring:

- Interactive documentation
- Code examples
- API reference
- Getting started guides
- Search functionality
- Dark/light theme support

## 🧪 Test Projects

### `test-prisma`
Test project using Prisma ORM with Better Auth Studio.

### `test-drizzle`
Test project using Drizzle ORM with Better Auth Studio.

## 🛠️ Development

### Prerequisites
- Node.js >= 18.0.0
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies for all packages
pnpm install

# Or install dependencies for specific package
pnpm --filter @better-auth/studio install
```

### Development Scripts

```bash
# Build all packages
pnpm build

# Run development servers
pnpm dev

# Run specific package
pnpm --filter @better-auth/studio dev
pnpm --filter @better-auth/cli dev
pnpm --filter @better-auth/web dev
pnpm --filter docs dev

# Run test projects
pnpm --filter test-prisma dev
pnpm --filter test-drizzle dev
```

### Package-specific Scripts

#### Studio Package
```bash
pnpm --filter @better-auth/studio studio:dev    # Run studio in dev mode
pnpm --filter @better-auth/studio studio:build  # Build studio
```

#### CLI Package
```bash
pnpm --filter @better-auth/cli cli:dev    # Run CLI in dev mode
pnpm --filter @better-auth/cli cli:build  # Build CLI
```

#### Web Package
```bash
pnpm --filter @better-auth/web web:dev    # Run web app in dev mode
pnpm --filter @better-auth/web web:build  # Build web app
```

#### Docs App
```bash
pnpm --filter docs docs:dev    # Run docs in dev mode
pnpm --filter docs docs:build  # Build docs
```

## 📚 Documentation

Visit the documentation site to learn more about:
- Getting started with Better Auth Studio
- Configuration options
- API reference
- Examples and guides
- Troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Better Auth](https://better-auth.com) - The authentication library
- [Documentation](https://docs.better-auth.com) - Complete documentation
- [GitHub](https://github.com/better-auth/studio) - Source code
- [NPM](https://npmjs.com/package/@better-auth/cli) - CLI package

## 🆘 Support

- GitHub Issues: [Report bugs or request features](https://github.com/better-auth/studio/issues)
- Discord: [Join our community](https://discord.gg/better-auth)
- Documentation: [Read the docs](https://docs.better-auth.com)