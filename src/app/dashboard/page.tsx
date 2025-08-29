'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Mock data
  const dashboardStats = {
    totalUsers: 2847,
    activeInfluencers: 1234,
    activeCampaigns: 89,
    totalRevenue: 145670,
    monthlyGrowth: 12.5,
    pendingVerifications: 23
  }

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Influencer', status: 'Pending', joinDate: '2024-01-15', followers: 45000 },
    { id: 2, name: 'Mike Chen', email: 'mike@example.com', role: 'Usher', status: 'Verified', joinDate: '2024-01-14', followers: 12000 },
    { id: 3, name: 'Emma Rodriguez', email: 'emma@example.com', role: 'Influencer', status: 'Pending', joinDate: '2024-01-13', followers: 78000 },
    { id: 4, name: 'Tech Corp', email: 'contact@techcorp.com', role: 'Service Seeker', status: 'Active', joinDate: '2024-01-12', followers: 0 },
    { id: 5, name: 'Alex Kim', email: 'alex@example.com', role: 'Influencer', status: 'Verified', joinDate: '2024-01-11', followers: 23000 }
  ]

  const activeCampaigns = [
    { id: 1, name: 'Summer Fashion Launch', brand: 'StyleCo', budget: 15000, status: 'Active', progress: 65, influencers: 5, startDate: '2024-01-10' },
    { id: 2, name: 'Tech Product Review', brand: 'TechStart', budget: 8000, status: 'Planning', progress: 25, influencers: 3, startDate: '2024-01-20' },
    { id: 3, name: 'Fitness Challenge', brand: 'FitLife', budget: 12000, status: 'Active', progress: 80, influencers: 8, startDate: '2024-01-05' },
    { id: 4, name: 'Food Festival Promo', brand: 'FoodieHub', budget: 6000, status: 'Completed', progress: 100, influencers: 4, startDate: '2023-12-15' }
  ]

  const subscriptionData = [
    { package: 'Basic', users: 1200, revenue: 24000, growth: 8.2 },
    { package: 'Premium', users: 850, revenue: 85000, growth: 15.3 },
    { package: 'Enterprise', users: 120, revenue: 36000, growth: 22.1 }
  ]

  const handleUserAction = async (userId: number, action: 'verify' | 'deactivate' | 'delete') => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      switch (action) {
        case 'verify':
          setSuccess(`User verified successfully!`)
          break
        case 'deactivate':
          setSuccess(`User deactivated successfully!`)
          break
        case 'delete':
          setSuccess(`User deleted successfully!`)
          break
      }
    } catch (err) {
      setError(`Failed to ${action} user. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleCampaignAction = async (campaignId: number, action: 'approve' | 'pause' | 'complete') => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(`Campaign ${action}d successfully!`)
    } catch (err) {
      setError(`Failed to ${action} campaign. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Verified': 'default',
      'Active': 'default',
      'Pending': 'secondary',
      'Planning': 'secondary',
      'Completed': 'outline',
      'Deactivated': 'destructive'
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage users, campaigns, and platform analytics
          </p>
        </div>

        {success && (
          <Alert className="border-green-200 bg-green-50 mb-6">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold">{formatNumber(dashboardStats.totalUsers)}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">U</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600">+{dashboardStats.monthlyGrowth}%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Influencers</p>
                      <p className="text-3xl font-bold">{formatNumber(dashboardStats.activeInfluencers)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">I</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600">+8.2%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                      <p className="text-3xl font-bold">{dashboardStats.activeCampaigns}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">C</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600">+15.3%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">$</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600">+22.1%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>Latest users who joined the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 5).map(user => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.role} • {user.joinDate}</p>
                        </div>
                        {getStatusBadge(user.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Overview of active campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCampaigns.slice(0, 4).map(campaign => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-sm text-gray-600">{campaign.brand} • {formatCurrency(campaign.budget)}</p>
                          </div>
                          {getStatusBadge(campaign.status)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, verification, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="usher">Usher</SelectItem>
                      <SelectItem value="seeker">Service Seeker</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.followers > 0 ? formatNumber(user.followers) : '-'}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {user.status === 'Pending' && (
                              <Button
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'verify')}
                                disabled={loading}
                              >
                                Verify
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'deactivate')}
                              disabled={loading}
                            >
                              Deactivate
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>Monitor and manage all platform campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Influencers</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeCampaigns.map(campaign => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.brand}</TableCell>
                        <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={campaign.progress} className="w-16 h-2" />
                            <span className="text-sm">{campaign.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.influencers}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {campaign.status === 'Planning' && (
                              <Button
                                size="sm"
                                onClick={() => handleCampaignAction(campaign.id, 'approve')}
                                disabled={loading}
                              >
                                Approve
                              </Button>
                            )}
                            {campaign.status === 'Active' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCampaignAction(campaign.id, 'pause')}
                                disabled={loading}
                              >
                                Pause
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionData.map(sub => (
                <Card key={sub.package}>
                  <CardHeader>
                    <CardTitle>{sub.package} Package</CardTitle>
                    <CardDescription>{sub.users} active subscribers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold">{formatCurrency(sub.revenue)}</p>
                        <p className="text-sm text-gray-600">Monthly Revenue</p>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600">+{sub.growth}%</span>
                        <span className="text-gray-500 ml-1">growth this month</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Manage Package
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly revenue breakdown by package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Revenue chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>User acquisition and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Growth chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Success rates and ROI metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Platform-wide metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-sm text-gray-600">Campaign Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">2.3x</p>
                    <p className="text-sm text-gray-600">Average ROI</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">72h</p>
                    <p className="text-sm text-gray-600">Avg. Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
