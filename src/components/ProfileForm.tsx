'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { socialAPI, SocialMetrics, FakeFollowerAnalysis } from '@/lib/socialAPI'
import SocialConnect from './SocialConnect'
import FileUpload from './FileUpload'

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void
  loading?: boolean
  initialData?: Partial<ProfileData>
}

export interface ProfileData {
  profileType: string
  bio: string
  services: string[]
  categories: string[]
  socialHandles: Record<string, string>
  portfolio: string
  hourlyRate: string
  location: string
  availabilityDates: Date[]
  profileImage: string
  uploadedFiles: File[]
}

export default function ProfileForm({ onSubmit, loading = false, initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>({
    profileType: initialData?.profileType || '',
    bio: initialData?.bio || '',
    services: initialData?.services || [],
    categories: initialData?.categories || [],
    socialHandles: initialData?.socialHandles || {
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: ''
    },
    portfolio: initialData?.portfolio || '',
    hourlyRate: initialData?.hourlyRate || '',
    location: initialData?.location || '',
    availabilityDates: initialData?.availabilityDates || [],
    profileImage: initialData?.profileImage || '',
    uploadedFiles: initialData?.uploadedFiles || []
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [, setMetrics] = useState<Record<string, SocialMetrics>>({})
  const [, setFakeFollowerAnalysis] = useState<Record<string, FakeFollowerAnalysis>>({})
  const [profileScore, setProfileScore] = useState(0)

  const serviceOptions = [
    'Content Creation', 'Brand Partnerships', 'Event Hosting', 'Product Reviews',
    'Social Media Management', 'Photography', 'Video Production', 'Live Streaming',
    'Influencer Marketing', 'Brand Ambassador', 'Event Promotion', 'Product Launch'
  ]

  const categoryOptions = [
    'Fashion', 'Beauty', 'Lifestyle', 'Technology', 'Food', 'Travel',
    'Fitness', 'Gaming', 'Music', 'Art', 'Business', 'Education',
    'Health', 'Sports', 'Entertainment', 'Automotive'
  ]

  const handleInputChange = (field: keyof ProfileData, value: string | string[] | Date[] | File[] | Record<string, string>) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSocialHandlesChange = (handles: Record<string, string>) => {
    handleInputChange('socialHandles', handles)
    // Recalculate profile score when social handles change
    calculateProfileScore({ ...formData, socialHandles: handles })
  }

  const handleFilesChange = (files: File[]) => {
    handleInputChange('uploadedFiles', files)
    // Recalculate profile score when files change
    calculateProfileScore({ ...formData, uploadedFiles: files })
  }

  const handleServiceToggle = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service]
    
    handleInputChange('services', newServices)
    calculateProfileScore({ ...formData, services: newServices })
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category]
    
    handleInputChange('categories', newCategories)
    calculateProfileScore({ ...formData, categories: newCategories })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate image upload to AWS S3
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = 'https://placehold.co/400x400?text=Profile+Picture+Uploaded+Successfully'
        handleInputChange('profileImage', imageUrl)
        calculateProfileScore({ ...formData, profileImage: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const calculateProfileScore = (data: ProfileData) => {
    const score = socialAPI.calculateProfileCompleteness({
      bio: data.bio,
      socialHandles: data.socialHandles,
      categories: data.categories,
      services: data.services,
      profileImage: data.profileImage
    })
    setProfileScore(score)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.profileType || !formData.bio || formData.categories.length === 0) {
      setError('Please fill in all required fields (Profile Type, Bio, and at least one Category)')
      return
    }

    if (formData.bio.length < 50) {
      setError('Bio should be at least 50 characters long')
      return
    }

    onSubmit(formData)
  }

  const handleMetricsUpdate = (newMetrics: Record<string, SocialMetrics>) => {
    setMetrics(newMetrics)
  }

  const handleFakeFollowerAnalysis = (analysis: Record<string, FakeFollowerAnalysis>) => {
    setFakeFollowerAnalysis(analysis)
  }

  // Calculate profile score on initial load and when relevant fields change
  useState(() => {
    calculateProfileScore(formData)
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Profile Score Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completeness</CardTitle>
          <CardDescription>
            Your profile strength based on the information provided
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${profileScore}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>0%</span>
                <span className="font-medium">{profileScore}% Complete</span>
                <span>100%</span>
              </div>
            </div>
            <Badge 
              variant={profileScore >= 80 ? "default" : profileScore >= 50 ? "secondary" : "outline"}
              className="sm:ml-4"
            >
              {profileScore >= 80 ? 'Excellent' : profileScore >= 50 ? 'Good' : 'Needs Work'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Profile Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Type *</CardTitle>
          <CardDescription>Select your primary role on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={formData.profileType} 
            onValueChange={(value) => handleInputChange('profileType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your profile type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="influencer">Influencer</SelectItem>
              <SelectItem value="usher">Usher</SelectItem>
              <SelectItem value="service-seeker">Service Seeker</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Tell us about yourself and your expertise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image Upload */}
          <div>
            <Label htmlFor="profileImage">Profile Picture</Label>
            <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/80x80?text=Profile'
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                )}
              </div>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself, your expertise, and what makes you unique..."
              className="mt-1 min-h-[120px]"
              required
            />
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 mt-1 gap-2">
              <span>{formData.bio.length}/500 characters</span>
              <span>{formData.bio.length >= 100 ? '✅ Good length' : '⚠️ Add more details'}</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, Country"
              className="mt-1"
            />
          </div>

          {/* Hourly Rate */}
          <div>
            <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
              placeholder="50"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services & Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Services & Categories</CardTitle>
          <CardDescription>Select the services you offer and categories you specialize in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Services */}
          <div>
            <Label>Services Offered</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {serviceOptions.map(service => (
                <Badge
                  key={service}
                  variant={formData.services.includes(service) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleServiceToggle(service)}
                >
                  {service}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Selected: {formData.services.length} services
            </p>
          </div>

          {/* Categories */}
          <div>
            <Label>Categories *</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {categoryOptions.map(category => (
                <Badge
                  key={category}
                  variant={formData.categories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Selected: {formData.categories.length} categories
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Integration */}
      <SocialConnect
        socialHandles={formData.socialHandles}
        onSocialHandlesChange={handleSocialHandlesChange}
        onMetricsUpdate={handleMetricsUpdate}
        onFakeFollowerAnalysis={handleFakeFollowerAnalysis}
      />

      {/* File Upload */}
      <FileUpload
        onFilesChange={handleFilesChange}
        maxFiles={10}
        maxSize={10}
        title="Portfolio & Media Files"
        description="Upload photos, videos, or documents to showcase your work"
      />

      {/* Portfolio & Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio & Availability</CardTitle>
          <CardDescription>Showcase your work and set your availability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Portfolio */}
          <div>
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input
              id="portfolio"
              type="url"
              value={formData.portfolio}
              onChange={(e) => handleInputChange('portfolio', e.target.value)}
              placeholder="https://yourportfolio.com"
              className="mt-1"
            />
          </div>

          {/* Availability Calendar */}
          <div>
            <Label>Available Dates</Label>
            <p className="text-sm text-gray-500 mb-2">
              Select dates when you&apos;re available for campaigns
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {formData.availabilityDates.length > 0 
                    ? `${formData.availabilityDates.length} dates selected`
                    : 'Select available dates'
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="multiple"
                  selected={formData.availabilityDates}
                  onSelect={(dates) => handleInputChange('availabilityDates', dates || [])}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-black hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? 'Saving Profile...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  )
}
