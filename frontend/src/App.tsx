import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Organizations from './pages/Organizations'
import OrganizationDetails from './pages/OrganizationDetails'
import TeamDetails from './pages/TeamDetails'
import UserDetails from './pages/UserDetails'
import Sessions from './pages/Sessions'
import Settings from './pages/Settings'
import { CountsProvider } from './contexts/CountsContext'

function App() {
  return (
    <CountsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:orgId" element={<OrganizationDetails />} />
            <Route path="/organizations/:orgId/teams/:teamId" element={<TeamDetails />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster 
          theme="dark" 
          position="top-right"
          richColors
          closeButton
        />
      </Router>
    </CountsProvider>
  )
}

export default App
