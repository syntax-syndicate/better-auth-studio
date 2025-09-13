# Better Auth Studio UI

This package contains the React-based user interface for Better Auth Studio. It provides a modern, responsive dashboard for managing authentication data and configurations.

## Features

- **Dashboard**: Overview of authentication metrics and activity
- **User Management**: View and manage user accounts
- **Session Management**: Monitor active sessions
- **Organization Management**: Handle multi-tenant organizations
- **Settings**: Configure authentication options and plugins

## Development

### Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Tanstack Query** - Data fetching
- **React Router** - Client-side routing
- **Recharts** - Data visualization

## Architecture

The UI is built as a separate package from the studio backend for better separation of concerns:

- **Frontend**: React SPA built with Vite
- **Backend**: Express server with WebSocket support
- **Communication**: REST API + WebSocket for real-time updates

## Build Output

The build output goes to `dist/` and is copied to the studio's `public/` directory during the studio build process.
