'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  Zap, 
  Settings, 
  Code, 
  Users, 
  Shield, 
  Database,
  ChevronRight,
  FileText,
  Play
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  {
    name: 'Getting Started',
    href: '/getting-started',
    icon: Zap,
    children: [
      { name: 'Installation', href: '/getting-started/installation' },
      { name: 'Quick Start', href: '/getting-started/quick-start' },
      { name: 'Configuration', href: '/getting-started/configuration' },
    ]
  },
  {
    name: 'Configuration',
    href: '/configuration',
    icon: Settings,
    children: [
      { name: 'Database Setup', href: '/configuration/database' },
      { name: 'Environment Variables', href: '/configuration/environment' },
      { name: 'Customization', href: '/configuration/customization' },
    ]
  },
  {
    name: 'Features',
    href: '/features',
    icon: Users,
    children: [
      { name: 'User Management', href: '/features/user-management' },
      { name: 'Session Control', href: '/features/session-control' },
      { name: 'Organizations', href: '/features/organizations' },
      { name: 'Analytics', href: '/features/analytics' },
    ]
  },
  {
    name: 'API Reference',
    href: '/api-reference',
    icon: Code,
    children: [
      { name: 'Endpoints', href: '/api-reference/endpoints' },
      { name: 'WebSocket', href: '/api-reference/websocket' },
      { name: 'Types', href: '/api-reference/types' },
    ]
  },
  {
    name: 'Examples',
    href: '/examples',
    icon: Play,
    children: [
      { name: 'Basic Setup', href: '/examples/basic-setup' },
      { name: 'With Prisma', href: '/examples/prisma' },
      { name: 'With Drizzle', href: '/examples/drizzle' },
    ]
  },
  {
    name: 'Guides',
    href: '/guides',
    icon: FileText,
    children: [
      { name: 'Deployment', href: '/guides/deployment' },
      { name: 'Troubleshooting', href: '/guides/troubleshooting' },
      { name: 'Best Practices', href: '/guides/best-practices' },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  return (
    <aside className="hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isExpanded = expandedItems.includes(item.name)
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isExpanded && "rotate-90"
                    )} 
                  />
                </button>
                
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            isChildActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          {child.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

