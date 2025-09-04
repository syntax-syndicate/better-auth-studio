import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  Building2,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Eye,
  X,
  Database
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectItem } from '../components/ui/select'

interface Organization {
  id: string
  name: string
  slug: string
  metadata?: any
  createdAt: string
  updatedAt: string
}

interface PluginStatus {
  enabled: boolean
  error?: string
  configPath?: string | null
  availablePlugins?: string[]
  organizationPlugin?: any
}

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [pluginStatus, setPluginStatus] = useState<PluginStatus | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showSeedModal, setShowSeedModal] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [seedingLogs, setSeedingLogs] = useState<string[]>([])

  useEffect(() => {
    checkPluginStatus()
  }, [])

  const checkPluginStatus = async () => {
    try {
      const response = await fetch('/api/plugins/organization/status')
      const status = await response.json()
      setPluginStatus(status)
      
      if (status.enabled) {
        await fetchOrganizations()
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Failed to check plugin status:', error)
      setPluginStatus({ enabled: false, error: 'Failed to check plugin status' })
      setLoading(false)
    }
  }

  const fetchOrganizations = async () => {
    try {
      // Request all organizations by setting a high limit
      const response = await fetch('/api/organizations?limit=10000')
      const data = await response.json()
      setOrganizations(data.organizations || [])
    } catch (error) {
      console.error('Failed to fetch organizations:', error)
      toast.error('Failed to fetch organizations')
    } finally {
      setLoading(false)
    }
  }

  const handleSeedOrganizations = async (count: number) => {
    setSeedingLogs([])
    
    try {
      const response = await fetch('/api/seed/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSeedingLogs(result.results.map((r: any) =>
          `✅ Created organization: ${r.organization.name} (${r.organization.slug})`
        ))
        // Refresh the organizations list to show updated count
        await fetchOrganizations()
      } else {
        setSeedingLogs([`❌ Error: ${result.error || 'Failed to seed organizations'}`])
      }
    } catch (error) {
      setSeedingLogs([`❌ Error: ${error}`])
    }
  }

  const handleSeedTeams = async (count: number) => {
    setSeedingLogs([])
    
    try {
      const response = await fetch('/api/seed/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSeedingLogs(result.results.map((r: any) =>
          `✅ Created team: ${r.team.name}`
        ))
        // Refresh the organizations list to show updated count
        await fetchOrganizations()
      } else {
        setSeedingLogs([`❌ Error: ${result.error || 'Failed to seed teams'}`])
      }
    } catch (error) {
      setSeedingLogs([`❌ Error: ${error}`])
    }
  }

  const openViewModal = (organization: Organization) => {
    setSelectedOrganization(organization)
    setShowViewModal(true)
  }

  const openEditModal = (organization: Organization) => {
    setSelectedOrganization(organization)
    setShowEditModal(true)
  }

  const openDeleteModal = (organization: Organization) => {
    setSelectedOrganization(organization)
    setShowDeleteModal(true)
  }

  const handleCreateOrganization = async () => {
    const name = (document.getElementById('create-name') as HTMLInputElement)?.value
    const slug = (document.getElementById('create-slug') as HTMLInputElement)?.value

    if (!name) {
      toast.error('Please fill in the organization name')
      return
    }

    const toastId = toast.loading('Creating organization...')
    
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug })
      })

      const result = await response.json()

      if (result.success) {
        // Refresh the organizations list to show the new organization
        await fetchOrganizations()
        setShowCreateModal(false)
        // Clear the form
        ;(document.getElementById('create-name') as HTMLInputElement).value = ''
        ;(document.getElementById('create-slug') as HTMLInputElement).value = ''
        toast.success('Organization created successfully!', { id: toastId })
      } else {
        toast.error(`Error creating organization: ${result.error || 'Unknown error'}`, { id: toastId })
      }
    } catch (error) {
      console.error('Error creating organization:', error)
      toast.error('Error creating organization', { id: toastId })
    }
  }

  const handleUpdateOrganization = async () => {
    if (!selectedOrganization) {
      toast.error('No organization selected')
      return
    }

    const name = (document.getElementById('edit-name') as HTMLInputElement)?.value
    const slug = (document.getElementById('edit-slug') as HTMLInputElement)?.value

    if (!name) {
      toast.error('Please fill in the organization name')
      return
    }

    const toastId = toast.loading('Updating organization...')
    
    try {
      const response = await fetch(`/api/organizations/${selectedOrganization.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug })
      })

      const result = await response.json()

      if (result.success) {
        // Refresh the organizations list to show the updated organization
        await fetchOrganizations()
        setShowEditModal(false)
        setSelectedOrganization(null)
        toast.success('Organization updated successfully!', { id: toastId })
      } else {
        toast.error(`Error updating organization: ${result.error || 'Unknown error'}`, { id: toastId })
      }
    } catch (error) {
      console.error('Error updating organization:', error)
      toast.error('Error updating organization', { id: toastId })
    }
  }

  const handleDeleteOrganization = async () => {
    if (!selectedOrganization) {
      toast.error('No organization selected')
      return
    }

    const toastId = toast.loading('Deleting organization...')
    
    try {
      const response = await fetch(`/api/organizations/${selectedOrganization.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await response.json()

      if (result.success) {
        // Refresh the organizations list to remove the deleted organization
        await fetchOrganizations()
        setShowDeleteModal(false)
        setSelectedOrganization(null)
        toast.success('Organization deleted successfully!', { id: toastId })
      } else {
        toast.error(`Error deleting organization: ${result.error || 'Unknown error'}`, { id: toastId })
      }
    } catch (error) {
      console.error('Error deleting organization:', error)
      toast.error('Error deleting organization', { id: toastId })
    }
  }

  const filteredOrganizations = organizations.filter(organization => {
    const matchesSearch = organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         organization.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || organization.metadata?.status === filter
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading all organizations from database...</div>
      </div>
    )
  }

  // Show plugin setup prompt if organization plugin is not enabled
  if (pluginStatus && !pluginStatus.enabled) {
    return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-white font-light">Organizations</h1>
            <p className="text-gray-400 mt-1">Manage your application organizations</p>
          </div>
        </div>

        {/* Plugin Setup Card */}
        <div className="bg-black/30 border border-dashed border-white/50 rounded-none p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-white font-light mb-2">Organization Plugin Required</h3>
              <p className="text-gray-300 mb-6">
                To use Organizations in Better Auth Studio, you need to enable the organization plugin in your Better Auth configuration.
              </p>
              
              <div className="bg-black/50 border border-dashed border-white/20 rounded-none p-4 mb-6">
                <h4 className="text-white font-light mb-3">Follow these steps:</h4>
                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
                  <li>Import the plugin in your auth configuration file{pluginStatus.configPath && (
                    <span className="text-gray-400"> ({pluginStatus.configPath})</span>
                  )}:</li>
                </ol>
                
                <div className="mt-4 bg-black/70 border border-dashed border-white/10 rounded-none p-3 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
<span className="text-blue-400">import</span> {`{ betterAuth }`} <span className="text-blue-400">from</span> <span className="text-green-400">"better-auth/plugin"</span> <br />
<span className="text-blue-400">import</span> {`{ organization }`} <span className="text-blue-400">from</span> <span className="text-green-400">"better-auth/plugin"</span> <br />

<span className="text-blue-400">export const</span> <span className="text-yellow-300">auth</span> = <span className="text-yellow-300">betterAuth</span>({`{`} <br />
  <span className="text-gray-500 pl-10">// ... your existing configuration</span> <br />
  <span className="text-red-300 pl-10">plugins</span>: [
    <span className="text-yellow-300">organization</span>()] <br />
{`}`}) <br />
                  </pre>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-400 text-sm">2. Restart your application to apply the changes</p>
                </div>
              </div>

              {pluginStatus.availablePlugins && pluginStatus.availablePlugins.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">
                    Currently enabled plugins: {pluginStatus.availablePlugins.join(', ')}
                  </p>
                </div>
              )}

              <Button
                onClick={() => window.location.reload()}
                className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none"
              >
                Check Again
              </Button>
              
              <div className="mt-4 text-xs text-gray-500">
                Need help? Check the{' '}
                <a 
                  href="https://better-auth.com/docs/plugins/organization" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  Better Auth Organization Plugin Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-light">Organizations ({organizations.length})</h1>
          <p className="text-gray-400 mt-1">Manage your organizations and teams</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            className="border border-dashed border-white/20 text-white hover:bg-white/10 rounded-none"
            onClick={() => setShowSeedModal(true)}
          >
            <Database className="w-4 h-4 mr-2" />
            Seed
          </Button>
          <Button
            className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </Select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-black/30 border border-dashed border-white/20 rounded-none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dashed border-white/10">
                <th className="text-left py-4 px-4 text-white font-light">Organization</th>
                <th className="text-left py-4 px-4 text-white font-light">Slug</th>
                <th className="text-left py-4 px-4 text-white font-light">Status</th>
                <th className="text-left py-4 px-4 text-white font-light">Created</th>
                <th className="text-right py-4 px-4 text-white font-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizations.map((organization) => (
                <tr key={organization.id} className="border-b border-dashed border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-none border border-dashed border-white/20 bg-white/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-light">{organization.name}</div>
                        <div className="text-sm text-gray-400">ID: {organization.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{organization.slug}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">Active</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white rounded-none"
                        onClick={() => openViewModal(organization)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white rounded-none"
                        onClick={() => openEditModal(organization)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 rounded-none"
                        onClick={() => openDeleteModal(organization)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seed Modal */}
      {showSeedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-dashed border-white/20 p-6 w-full max-w-lg rounded-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-white font-light">Seed Data</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSeedModal(false)}
                className="text-gray-400 hover:text-white rounded-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* Organization Seeding */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-white" />
                  <h4 className="text-white font-light">Seed Organizations</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Label htmlFor="organization-count" className="text-sm text-gray-400 font-light">Number of organizations</Label>
                    <Input
                      id="organization-count"
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="5"
                      className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const count = parseInt((document.getElementById('organization-count') as HTMLInputElement)?.value || '5')
                      handleSeedOrganizations(count)
                    }}
                    className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none mt-6"
                  >
                    Seed Organizations
                  </Button>
                </div>
              </div>
              
              {/* Team Seeding */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-white" />
                  <h4 className="text-white font-light">Seed Teams</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Label htmlFor="team-count" className="text-sm text-gray-400 font-light">Number of teams</Label>
                    <Input
                      id="team-count"
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="5"
                      className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const count = parseInt((document.getElementById('team-count') as HTMLInputElement)?.value || '5')
                      handleSeedTeams(count)
                    }}
                    className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none mt-6"
                  >
                    Seed Teams
                  </Button>
                </div>
              </div>

              {/* Seeding Logs */}
              {seedingLogs.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm text-white font-light">Seeding Log</h5>
                    <details className="group">
                      <summary className="cursor-pointer text-sm text-gray-400 font-light hover:text-white">
                        View Details ({seedingLogs.length} items)
                      </summary>
                      <div className="mt-3 p-4 bg-black/50 border border-dashed border-white/20 rounded-none">
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {seedingLogs.map((log, index) => (
                            <div key={index} className="text-xs font-mono text-gray-300 flex items-start space-x-2">
                              <span className="text-green-400">✓</span>
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6 pt-6 border-t border-dashed border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowSeedModal(false)}
                className="border border-dashed border-white/20 text-white hover:bg-white/10 rounded-none"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Organization Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-dashed border-white/20 p-6 w-full max-w-md rounded-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white font-light">Create Organization</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white rounded-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="create-name" className="text-sm text-gray-400 font-light">Name</Label>
                <Input
                  id="create-name"
                  className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="create-slug" className="text-sm text-gray-400 font-light">Slug</Label>
                <Input
                  id="create-slug"
                  className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="border border-dashed border-white/20 text-white hover:bg-white/10 rounded-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOrganization}
                className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Organization Modal */}
      {showEditModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-dashed border-white/20 p-6 w-full max-w-md rounded-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white font-light">Edit Organization</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white rounded-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-none border border-dashed border-white/20 bg-white/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-light">{selectedOrganization.name}</div>
                  <div className="text-sm text-gray-400">{selectedOrganization.slug}</div>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-name" className="text-sm text-gray-400 font-light">Name</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedOrganization.name}
                  className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="edit-slug" className="text-sm text-gray-400 font-light">Slug</Label>
                <Input
                  id="edit-slug"
                  defaultValue={selectedOrganization.slug}
                  className="mt-1 border border-dashed border-white/20 bg-black/30 text-white rounded-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="border border-dashed border-white/20 text-white hover:bg-white/10 rounded-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateOrganization}
                className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Organization Modal */}
      {showDeleteModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-dashed border-white/20 p-6 w-full max-w-md rounded-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white font-light">Delete Organization</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-white rounded-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-none border border-dashed border-white/20 bg-white/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-light">{selectedOrganization.name}</div>
                  <div className="text-sm text-gray-400">{selectedOrganization.slug}</div>
                </div>
              </div>
              <p className="text-gray-400">Are you sure you want to delete this organization? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="border border-dashed border-white/20 text-white hover:bg-white/10 rounded-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteOrganization}
                className="bg-red-600 hover:bg-red-700 text-white border border-red-600 rounded-none"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Organization Modal */}
      {showViewModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 border border-dashed border-white/20 p-6 w-full max-w-md rounded-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-white font-light">Organization Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-white rounded-none"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-none border border-dashed border-white/20 bg-white/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-light">{selectedOrganization.name}</div>
                  <div className="text-sm text-gray-400">{selectedOrganization.slug}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white text-sm">{selectedOrganization.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white text-sm">{new Date(selectedOrganization.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Updated:</span>
                  <span className="text-white text-sm">{new Date(selectedOrganization.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowViewModal(false)}
                className="bg-white hover:bg-white/90 text-black border border-white/20 rounded-none"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
