import PixelLayout from "@/components/PixelLayout";
import PixelCard from "@/components/PixelCard";

export default function Changelog() {
  return (
    <PixelLayout 
      currentPage="changelog"
      title="CHANGELOG"
      description="Track the evolution of Better Auth Studio with detailed release notes and updates."
    >
      <div className="space-y-8">
        {/* Latest Release */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">LATEST RELEASE</h2>
          <PixelCard variant="highlight">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-light tracking-tight text-white">v1.0.16</h3>
              <span className="text-sm font-light tracking-tight text-white/50">2025-01-27</span>
            </div>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              Latest stable release of Better Auth Studio with enhanced functionality and pixel-perfect design.
            </p>
            <div className="space-y-3">
              <h4 className="font-light tracking-tight text-white">✨ New Features</h4>
              <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                <li className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  Complete user management interface with CRUD operations
                </li>
                <li className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  Organization and team management with hierarchical structure
                </li>
                <li className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  Session monitoring and management capabilities
                </li>
                <li className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  Pixel-inspired UI design with 3D hero component
                </li>
                <li className="flex items-start">
                  <span className="text-white/50 mr-3">•</span>
                  Support for Prisma, Drizzle, and SQLite databases
                </li>
              </ul>
            </div>
          </PixelCard>
        </section>

        {/* Recent Updates */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">RECENT UPDATES</h2>
          
          {/* API Improvements */}
          <PixelCard className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-light tracking-tight text-white">API Improvements</h3>
              <span className="text-sm font-light tracking-tight text-white/50">2025-01-26</span>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">🔧 Fixed Issues</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Resolved "organization not found" errors with improved API response consistency
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Fixed "team not found" errors with better routing structure
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Improved database query performance with targeted WHERE clauses
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">⚡ Performance</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Optimized database queries to use limits instead of fetching all records
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Enhanced frontend routing for better organization structure
                  </li>
                </ul>
              </div>
            </div>
          </PixelCard>

          {/* UI/UX Enhancements */}
          <PixelCard className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-light tracking-tight text-white">UI/UX Enhancements</h3>
              <span className="text-sm font-light tracking-tight text-white/50">2025-01-25</span>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">🎨 Design System</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Unified black and white color scheme across all pages
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Integrated Geist Mono font for consistent typography
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">📱 Responsive Design</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Mobile-first responsive navigation system
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Optimized layouts for all screen sizes
                  </li>
                </ul>
              </div>
            </div>
          </PixelCard>

          {/* Documentation Updates */}
          <PixelCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-light tracking-tight text-white">Documentation</h3>
              <span className="text-sm font-light tracking-tight text-white/50">2025-01-24</span>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">📚 Content</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Complete README.md integration for installation guide
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Added comprehensive changelog with version tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Enhanced code examples with syntax highlighting
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">🛠️ Developer Experience</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Added TypeScript syntax highlighting for code blocks
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Improved code readability with proper formatting
                  </li>
                </ul>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* Upcoming Features */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">UPCOMING FEATURES</h2>
          <PixelCard variant="highlight">
            <h3 className="text-lg font-light tracking-tight mb-4 text-white">🚀 Roadmap</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">v1.1.0 - Enhanced Analytics</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    User activity dashboards with real-time metrics
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Session analytics and usage patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Export capabilities for data analysis
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">v1.2.0 - Advanced Security</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Role-based access control (RBAC) management
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Security audit logs and monitoring
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Two-factor authentication management
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-light tracking-tight mb-2 text-white">v2.0.0 - Plugin System</h4>
                <ul className="list-none space-y-2 text-sm font-light tracking-tight text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Extensible plugin architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Custom dashboard widgets
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/50 mr-3">•</span>
                    Third-party integrations marketplace
                  </li>
                </ul>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* Version History */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">VERSION HISTORY</h2>
          <div className="space-y-4">
            <PixelCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-light tracking-tight text-white">v1.0.15</h3>
                <span className="text-sm font-light tracking-tight text-white/50">2025-01-25</span>
              </div>
              <p className="text-sm font-light tracking-tight text-white/70">
                Enhanced user interface with improved navigation and performance optimizations.
              </p>
            </PixelCard>
            
            <PixelCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-light tracking-tight text-white">v1.0.14</h3>
                <span className="text-sm font-light tracking-tight text-white/50">2025-01-20</span>
              </div>
              <p className="text-sm font-light tracking-tight text-white/70">
                Added comprehensive session management and organization features.
              </p>
            </PixelCard>
            
            <PixelCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-light tracking-tight text-white">v1.0.13</h3>
                <span className="text-sm font-light tracking-tight text-white/50">2025-01-15</span>
              </div>
              <p className="text-sm font-light tracking-tight text-white/70">
                Initial stable release with core authentication management capabilities.
              </p>
            </PixelCard>
          </div>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-2xl font-light tracking-tight mb-6 text-white">CONTRIBUTING</h2>
          <PixelCard>
            <p className="text-sm font-light tracking-tight text-white/70 mb-4">
              Better Auth Studio is open source and welcomes contributions from the community.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                Report bugs and request features on GitHub Issues
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                Submit pull requests for bug fixes and enhancements
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                Help improve documentation and examples
              </div>
              <div className="flex items-center text-sm font-light tracking-tight text-white/70">
                <span className="text-white/50 mr-3">→</span>
                Share feedback and suggestions with the community
              </div>
            </div>
          </PixelCard>
        </section>
      </div>
    </PixelLayout>
  );
}
