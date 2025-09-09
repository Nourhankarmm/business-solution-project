'use client'

import { useState } from 'react'
import Image from 'next/image'
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
import { validateInfluencerProfile } from '@/lib/aiAPI'

interface ValidationResult {
  isValid: boolean
  score: number
  suggestions: string[]
  flags: string[]
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    profileType: '',
    bio: '',
    services: [] as string[],
    categories: [] as string[],
    socialHandles: {
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: ''
    },
    portfolio: '',
    hourlyRate: '',
    location: ''
  })
  
  const [availabilityDates, setAvailabilityDates] = useState<Date[]>([])
  const [profileImage, setProfileImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [validating, setValidating] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('social_')) {
      const platform = name.replace('social_', '')
      setFormData(prev => ({
        ...prev,
        socialHandles: {
          ...prev.socialHandles,
          [platform]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate image upload to AWS S3
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImage('https://placehold.co/400x400?text=Profile+Picture+Uploaded+Successfully')
      }
      reader.readAsDataURL(file)
    }
  }

  const fetchSocialMetrics = async () => {
    setValidating(true)
    try {
      // Simulate fetching social media metrics
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockMetrics = {
        instagram: { followers: 15420, engagement: 4.2 },
        tiktok: { followers: 8930, engagement: 6.8 },
        youtube: { subscribers: 3240, views: 125000 },
        twitter: { followers: 2180, engagement: 2.1 }
      }
      
      alert(`Social metrics fetched successfully!\n\nInstagram: ${mockMetrics.instagram.followers} followers (${mockMetrics.instagram.engagement}% engagement)\nTikTok: ${mockMetrics.tiktok.followers} followers (${mockMetrics.tiktok.engagement}% engagement)\nYouTube: ${mockMetrics.youtube.subscribers} subscribers\nTwitter: ${mockMetrics.twitter.followers} followers`)
      
    } catch {
      setError('Failed to fetch social media metrics. Please try again.')
    } finally {
      setValidating(false)
    }
  }

  const validateProfile = async () => {
    if (!formData.bio || formData.categories.length === 0) {
      setError('Please fill in bio and select at least one category before validation')
      return
    }

    setValidating(true)
    try {
      const result = await validateInfluencerProfile({
        bio: formData.bio,
        socialHandles: formData.socialHandles,
        categories: formData.categories
      })
      
      setValidationResult(result)
      
      if (result.isValid) {
        setSuccess(`Profile validation successful! Score: ${result.score}/100`)
      } else {
      setError(`Profile needs improvement. Score: ${result.score}/100`)
      }
    } catch {
      setError('Profile validation failed. Please try again.')
    } finally {
      setValidating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Basic validation
    if (!formData.profileType || !formData.bio || formData.categories.length === 0) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      // Simulate profile creation API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSuccess('Profile created successfully! Your profile is now under review by our admin team.')
      
      // Reset form after success
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)

    } catch {
      setError('Failed to create profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Build your professional profile to connect with brands and opportunities
          </p>
        </div>

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

          {/* Profile Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Type</CardTitle>
              <CardDescription>Select your primary role on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, profileType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your profile type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="influencer">Influencer</SelectItem>
                  <SelectItem value="usher">Usher</SelectItem>
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
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile picture preview showing uploaded image"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
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
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself, your expertise, and what makes you unique..."
                  className="mt-1 min-h-[120px]"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="mt-1"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
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
                <Label>Services Offered *</Label>
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
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
              <CardDescription>Connect your social media accounts to showcase your reach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_instagram">Instagram Handle</Label>
                  <Input
                    id="social_instagram"
                    name="social_instagram"
                    value={formData.socialHandles.instagram}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="social_tiktok">TikTok Handle</Label>
                  <Input
                    id="social_tiktok"
                    name="social_tiktok"
                    value={formData.socialHandles.tiktok}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="social_youtube">YouTube Channel</Label>
                  <Input
                    id="social_youtube"
                    name="social_youtube"
                    value={formData.socialHandles.youtube}
                    onChange={handleInputChange}
                    placeholder="Channel URL or @handle"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="social_twitter">Twitter/X Handle</Label>
                  <Input
                    id="social_twitter"
                    name="social_twitter"
                    value={formData.socialHandles.twitter}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={fetchSocialMetrics}
                disabled={validating}
                className="w-full"
              >
                {validating ? 'Fetching Metrics...' : 'Fetch Social Media Metrics'}
              </Button>
            </CardContent>
          </Card>

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
                  name="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="mt-1"
                />
              </div>

              {/* Availability Calendar */}
              <div>
                <Label>Available Dates</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Select dates when you are available for campaigns
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {availabilityDates.length > 0 
                        ? `${availabilityDates.length} dates selected`
                        : 'Select available dates'
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="multiple"
                      selected={availabilityDates}
                      onSelect={(dates) => setAvailabilityDates(dates || [])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* AI Profile Validation */}
          <Card>
            <CardHeader>
              <CardTitle>AI Profile Validation</CardTitle>
              <CardDescription>Get AI-powered feedback on your profile completeness and authenticity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={validateProfile}
                disabled={validating}
                className="w-full"
              >
                {validating ? 'Validating Profile...' : 'Validate Profile with AI'}
              </Button>

              {validationResult && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Profile Score:</span>
                      <Badge variant={validationResult.score >= 80 ? "default" : "secondary"}>
                        {validationResult.score}/100
                      </Badge>
                    </div>

                  {validationResult.suggestions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Suggestions:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {validationResult.suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validationResult.flags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-orange-600">Flags:</h4>
                      <ul className="text-sm text-orange-600 space-y-1">
                        {validationResult.flags.map((flag: string, index: number) => (
                          <li key={index}>• {flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
                    <Button
                      type="submit"
                      className="bg-black hover:bg-gray-800"
                      disabled={loading}
                    >
                      {loading ? 'Creating Profile...' : 'Create Profile'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
