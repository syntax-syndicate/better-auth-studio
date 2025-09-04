import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Building2,
  Shield, 
  Settings, 
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
  { name: 'Organizations', href: '/organizations', icon: Building2, badge: '12' },
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
                className="pl-10 pr-4 py-2 bg-black border rounded-none border-gray-600 text-white border-dashed focus:ring-2 focus:ring-white focus:border-transparent transition-colors placeholder-gray-400"
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

      {/* Top Navigation Tabs */}
      <div className="bg-black/50 border-b border-white/10">
        <div className="px-6">
          <nav className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-white/10 border border-white/20 rounded-sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0">
        {children}
      </div>
    </div>
  )
}
