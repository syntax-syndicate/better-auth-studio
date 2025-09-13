'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Sun, 
  Moon, 
  Menu,
  X,
  Github,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Better Auth Studio</span>
            <Badge variant="secondary" className="text-xs">
              Docs
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/getting-started" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Getting Started
            </Link>
            <Link 
              href="/configuration" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Configuration
            </Link>
            <Link 
              href="/api-reference" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              API Reference
            </Link>
            <Link 
              href="/examples" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/better-auth/studio" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link href="https://studio.better-auth.com" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Try Studio
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/getting-started" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Getting Started
              </Link>
              <Link 
                href="/configuration" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Configuration
              </Link>
              <Link 
                href="/api-reference" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API Reference
              </Link>
              <Link 
                href="/examples" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com/better-auth/studio" target="_blank">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

