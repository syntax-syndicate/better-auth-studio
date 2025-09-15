import PixelLayout from "@/components/PixelLayout";
import PixelCard from "@/components/PixelCard";
import CodeHighlighter from "@/components/SyntaxHighlighter";

export default function Installation() {
  return (
    <PixelLayout 
      currentPage="installation"
      title="INSTALLATION"
      description="Get Better Auth Studio up and running in your project."
    >
      <div className="space-y-8">
        <section>
          <PixelCard variant="highlight">
            <div className="flex items-start">
              <span className="text-white/50 mr-3 text-lg">⚠️</span>
              <div>
                <h3 className="text-lg font-light tracking-tight mb-2 text-white">Alpha Version Notice</h3>
                <p className="text-sm font-light tracking-tight text-white/70">
                  Better Auth Studio is currently in <strong>alpha</strong> and in early development. You may encounter bugs or incomplete features. Please report any issues you find on our GitHub repository to help us improve the project. Your feedback is greatly appreciated!
                </p>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">QUICK START</h2>
          
          {/* Installation */}
          <PixelCard className="mb-6">
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Installation</h3>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              Install Better Auth Studio globally using pnpm:
            </p>
            <PixelCard variant="code">
              <code className="text-sm font-mono text-white/90">pnpm add -g better-auth-studio</code>
            </PixelCard>
            <p className="text-sm font-light tracking-tight text-white/70 mt-4 mb-4">
              Or use pnpx to run it without installation:
            </p>
            <PixelCard variant="code">
              <code className="text-sm font-mono text-white/90">pnpx better-auth-studio</code>
            </PixelCard>
          </PixelCard>

          {/* Basic Usage */}
          <PixelCard>
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Basic Usage</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  <strong>1. Navigate to your Better Auth project directory</strong>
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">cd your-better-auth-project</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  <strong>2. Start the studio</strong>
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio start</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  <strong>3. Open your browser</strong>
                </p>
                <ul className="list-none space-y-1 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    The studio will automatically open at <code className="bg-white/10 px-1 text-white/90">http://localhost:3000</code>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Or manually navigate to the URL shown in the terminal
                  </li>
                </ul>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* Prerequisites */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">PREREQUISITES</h2>
          <PixelCard>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              Before using Better Auth Studio, ensure you have:
            </p>
            <ul className="list-none space-y-3 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Node.js</strong> (v18 or higher)
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>A Better Auth project</strong> with a valid <code className="bg-white/10 px-1 text-white/90">auth.ts</code> configuration file
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Database setup</strong> (Prisma, Drizzle, or SQLite)
              </li>
            </ul>
          </PixelCard>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">CONFIGURATION</h2>
          
          {/* Supported Database Adapters */}
          <PixelCard className="mb-6">
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Supported Database Adapters</h3>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              Better Auth Studio automatically detects and works with:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                <strong>Prisma</strong> (<code className="bg-white/10 px-1 text-white/90">prismaAdapter</code>)
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                <strong>Drizzle</strong> (<code className="bg-white/10 px-1 text-white/90">drizzleAdapter</code>)
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                <strong>SQLite</strong> (<code className="bg-white/10 px-1 text-white/90">new Database()</code> from better-sqlite3)
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                <strong>PostgreSQL</strong> (via Prisma or Drizzle)
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                <strong>MySQL</strong> (via Prisma or Drizzle)
              </div>
            </div>
          </PixelCard>

          {/* Example Configuration Files */}
          <PixelCard>
            <h3 className="text-lg font-light tracking-tight mb-6 text-white">Example Configuration Files</h3>
            
            {/* Prisma Setup */}
            <div className="mb-6">
              <h4 className="font-light tracking-tight mb-3 text-white">Prisma Setup</h4>
            <PixelCard variant="code">
              <CodeHighlighter 
                code={`// auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
  }),
  // ... other config
});`}
                language="typescript"
              />
            </PixelCard>
            </div>

            {/* Drizzle Setup */}
            <div className="mb-6">
              <h4 className="font-light tracking-tight mb-3 text-white">Drizzle Setup</h4>
            <PixelCard variant="code">
              <CodeHighlighter 
                code={`// auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  // ... other config
});`}
                language="typescript"
              />
            </PixelCard>
            </div>

            {/* SQLite Setup */}
            <div>
              <h4 className="font-light tracking-tight mb-3 text-white">SQLite Setup</h4>
            <PixelCard variant="code">
              <CodeHighlighter 
                code={`// auth.ts
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./better-auth.db"),
  // ... other config
});`}
                language="typescript"
              />
            </PixelCard>
            </div>
          </PixelCard>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">FEATURES</h2>
          
          {/* Dashboard */}
          <PixelCard className="mb-4">
            <h3 className="text-lg font-light tracking-tight mb-3 text-white">📊 Dashboard</h3>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Overview statistics</strong> - User counts, organization counts, session data
              </li>
            </ul>
          </PixelCard>

          {/* User Management */}
          <PixelCard className="mb-4">
            <h3 className="text-lg font-light tracking-tight mb-3 text-white">👥 User Management</h3>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>View all users</strong> - Paginated list with search and filtering
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Create users</strong> - Add new users with email/password
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Edit users</strong> - Update user information, email verification status
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Delete users</strong> - Remove users from the system
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Bulk operations</strong> - Seed multiple test users
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>User details</strong> - View user profiles, and accounts
              </li>
            </ul>
          </PixelCard>

          {/* Organization Management */}
          <PixelCard className="mb-4">
            <h3 className="text-lg font-light tracking-tight mb-3 text-white">🏢 Organization Management</h3>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>View organizations</strong> - List all organizations with pagination
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Create organizations</strong> - Add new organizations with custom slugs
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Edit organizations</strong> - Update organization details
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Delete organizations</strong> - Remove organizations
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Team management</strong> - Create and manage teams within organizations
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Member management</strong> - Add/remove members from teams
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Bulk seeding</strong> - Generate test organizations and teams
              </li>
            </ul>
          </PixelCard>

          {/* Settings & Configuration */}
          <PixelCard>
            <h3 className="text-lg font-light tracking-tight mb-3 text-white">⚙️ Settings & Configuration</h3>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Plugin status</strong> - Check which Better Auth plugins are enabled
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Database configuration</strong> - View current database adapter and settings
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Social providers</strong> - Configure OAuth providers (GitHub, Google, etc.)
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Email settings</strong> - Configure email verification and password reset
              </li>
            </ul>
          </PixelCard>
        </section>

        {/* Command Line Options */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">COMMAND LINE OPTIONS</h2>
          
          {/* Start Studio */}
          <PixelCard className="mb-6">
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Start Studio</h3>
            <PixelCard variant="code" className="mb-4">
              <code className="text-sm font-mono text-white/90">pnpx better-auth-studio start [options]</code>
            </PixelCard>
            
            <h4 className="font-light tracking-tight mb-3 text-white">Options:</h4>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 mb-4">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <code className="bg-white/10 px-1 text-white/90">--port &lt;number&gt;</code> - Specify port (default: 3000)
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <code className="bg-white/10 px-1 text-white/90">--host &lt;string&gt;</code> - Specify host (default: localhost)
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <code className="bg-white/10 px-1 text-white/90">--no-open</code> - Don't automatically open browser
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <code className="bg-white/10 px-1 text-white/90">--config &lt;path&gt;</code> - Path to auth config file (default: auto-detect)
              </li>
            </ul>

            <h4 className="font-light tracking-tight mb-3 text-white">Examples:</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Start on custom port:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio start --port 3001</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Start without opening browser:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio start --no-open</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Use custom config file:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio start --config ./custom-auth.ts</code>
                </PixelCard>
              </div>
            </div>
          </PixelCard>

          {/* Other Commands */}
          <PixelCard>
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Other Commands</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Check version:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio --version</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Show help:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpx better-auth-studio --help</code>
                </PixelCard>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* Development */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">DEVELOPMENT</h2>
          
          {/* Running from Source */}
          <PixelCard className="mb-6">
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Running from Source</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Clone the repository:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">git clone https://github.com/better-auth/better-auth-studio.git</code>
                </PixelCard>
                <PixelCard variant="code" className="mt-2">
                  <code className="text-sm font-mono text-white/90">cd better-auth-studio</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Install dependencies:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpm install</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Build the project:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpm run build</code>
                </PixelCard>
              </div>
              
              <div>
                <p className="text-sm font-light tracking-tight text-white/70 mb-2">
                  Start development server:
                </p>
                <PixelCard variant="code">
                  <code className="text-sm font-mono text-white/90">pnpm run dev</code>
                </PixelCard>
              </div>
            </div>
          </PixelCard>

          {/* Contributing */}
          <PixelCard>
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">Contributing</h3>
            <ol className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">1.</span>
                Fork the repository
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">2.</span>
                Create a feature branch
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">3.</span>
                Make your changes
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">4.</span>
                Add tests if applicable
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">5.</span>
                Submit a pull request
              </li>
            </ol>
          </PixelCard>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">SUPPORT</h2>
          <PixelCard>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              If you encounter any issues or have questions:
            </p>
            <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70">
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Search existing issues</strong> on GitHub
              </li>
              <li className="flex items-start">
                <span className="text-white/50 mr-3">•</span>
                <strong>Create a new issue</strong> with detailed information
              </li>
            </ul>
          </PixelCard>
        </section>
      </div>
    </PixelLayout>
  );
}