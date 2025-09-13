import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Zap, 
  Code, 
  Users, 
  Shield, 
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <BookOpen className="w-3 h-3 mr-1" />
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Better Auth Studio Documentation
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Learn how to set up, configure, and use Better Auth Studio to manage your authentication system with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/getting-started">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/api-reference">
              API Reference
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Zap className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Get up and running with Better Auth Studio in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/getting-started">
                Start Here
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Code className="w-8 h-8 text-green-600 mb-2" />
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Learn how to configure Better Auth Studio for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/configuration">
                Configure
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users, sessions, and organizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/user-management">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">What you can do with Better Auth Studio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">User Management</h3>
                <p className="text-muted-foreground text-sm">
                  View, edit, and manage all your users with an intuitive interface
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Session Control</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor and control user sessions with real-time updates
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Organization Management</h3>
                <p className="text-muted-foreground text-sm">
                  Handle multi-tenant applications with organization support
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Database Integration</h3>
                <p className="text-muted-foreground text-sm">
                  Works seamlessly with Prisma, Drizzle, and other ORMs
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Real-time Updates</h3>
                <p className="text-muted-foreground text-sm">
                  Live data synchronization with WebSocket support
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Analytics & Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Get insights into user behavior and system performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Guides */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Popular Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/getting-started/installation" className="block">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Installation Guide</CardTitle>
                <CardDescription>
                  Step-by-step installation instructions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/configuration/database" className="block">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Database Setup</CardTitle>
                <CardDescription>
                  Configure your database connection
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/features/user-management" className="block">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">User Management</CardTitle>
                <CardDescription>
                  Managing users and their data
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/api-reference" className="block">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">API Reference</CardTitle>
                <CardDescription>
                  Complete API documentation
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

