import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings, 
  ChevronRight,
  Search
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users, badge: '1,247' },
  { name: 'Sessions', href: '/sessions', icon: Shield, badge: '3,456' },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation */}
      <div className="bg-black/70 border-b border-white/15">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Better Auth Studio</h1>
                <p className="text-xs text-gray-300">v1.0.0</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-colors placeholder-gray-400"
              />
            </div>
            <Button variant="ghost" className="text-gray-300 hover:bg-gray-900">
              Docs
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:bg-gray-900">
              Support
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/70 border-r border-white/15 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-300 hover:bg-white/90 hover:text-black/90'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${
                        isActive ? 'text-black' : 'text-gray-400 group-hover:text-black/90'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs group-hover:bg-white group-hover:border-black group-hover:text-black bg-black/70 border border-white/15 rounded-none border-dashed">
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-black" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 pt-8 border-t border-white/15">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                QUICK STATS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Active Users</span>
                  <span className="text-sm font-medium text-white">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Sessions</span>
                  <span className="text-sm font-medium text-white">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Success Rate</span>
                  <span className="text-sm font-medium text-green-400">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-0">
            {children}
        </div>
      </div>
    </div>
  )
}
