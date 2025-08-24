import { useState, useEffect } from 'react'
import { 
  Users, 
  Shield, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Zap,
  Settings,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Chart data
const chartData = [
  { name: 'Jan', users: 400, sessions: 240 },
  { name: 'Feb', users: 300, sessions: 139 },
  { name: 'Mar', users: 200, sessions: 980 },
  { name: 'Apr', users: 278, sessions: 390 },
  { name: 'May', users: 189, sessions: 480 },
  { name: 'Jun', users: 239, sessions: 380 },
  { name: 'Jul', users: 349, sessions: 430 },
]

const pieData = [
  { name: 'Google', value: 400, color: '#ffffff' },
  { name: 'GitHub', value: 300, color: '#e5e7eb' },
  { name: 'Email', value: 300, color: '#d1d5db' },
  { name: 'Discord', value: 200, color: '#9ca3af' },
]

const COLORS = ['#ffffff', '#e5e7eb', '#d1d5db', '#9ca3af']

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  successRate: number
  userGrowth: number
  sessionGrowth: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    successRate: 0,
    userGrowth: 0,
    sessionGrowth: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between p-5 pt-7">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-300 mt-2">Welcome to your Better Auth Studio dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-900">
            <Eye className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button className="bg-white hover:bg-white text-black">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>
    <hr  className='w-full border-white/15 h-px'/>
    <hr  className='w-full border-white/15 h-px'/>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change={stats.userGrowth}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          change={12.5}
          icon={Activity}
          trend="up"
        />
        <StatCard
          title="Total Sessions"
          value={stats.totalSessions}
          change={stats.sessionGrowth}
          icon={Shield}
          trend="up"
        />
        <StatCard
          title="Success Rate"
          value={stats.successRate}
          change={-2.1}
          icon={TrendingUp}
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5">
        <Card className="hover:shadow-lg transition-shadow duration-200 border-white/15 bg-black/70">
          <CardHeader>
            <CardTitle className="text-white">User Growth</CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #374151',
                    color: '#ffffff'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#ffffff" strokeWidth={2} />
                <Line type="monotone" dataKey="sessions" stroke="#e5e7eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200 border-white/15 bg-black/70">
          <CardHeader>
            <CardTitle className="text-white">Authentication Methods</CardTitle>
            <CardDescription>Distribution of login providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    border: '1px solid #374151',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-white/15 bg-black/70">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription>Latest user actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">New user registered</p>
                <p className="text-sm text-gray-300">john.doe@example.com signed up via Google</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">2 minutes ago</p>
                <Badge variant="success" className="mt-1">Success</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Session created</p>
                <p className="text-sm text-gray-300">User session established for jane.smith@example.com</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">5 minutes ago</p>
                <Badge variant="success" className="mt-1">Active</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Configuration updated</p>
                <p className="text-sm text-gray-300">Email verification settings modified</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">10 minutes ago</p>
                <Badge variant="info" className="mt-1">Info</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-white/15 bg-black/70">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 border-gray-600 text-gray-300 hover:bg-gray-800">
              <Users className="w-5 h-5 text-white" />
              <span className="font-medium">Add User</span>
              <span className="text-xs text-gray-400">Create a new user account</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 border-gray-600 text-gray-300 hover:bg-gray-800">
              <Shield className="w-5 h-5 text-white" />
              <span className="font-medium">Security</span>
              <span className="text-xs text-gray-400">Review security settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 border-gray-600 text-gray-300 hover:bg-gray-800">
              <Settings className="w-5 h-5 text-white" />
              <span className="font-medium">Configure</span>
              <span className="text-xs text-gray-400">Update authentication settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }: any) => (
  <Card className="hover:shadow-lg transition-shadow duration-200 border-white/15 bg-black/70">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-300">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      {change && (
        <div className="flex items-center space-x-1 text-sm">
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
          <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
            {Math.abs(change)}%
          </span>
          <span className="text-gray-400">from last month</span>
        </div>
      )}
    </CardContent>
  </Card>
)
