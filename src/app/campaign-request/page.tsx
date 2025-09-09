'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import RecommendationEngine from '@/components/RecommendationEngine'
import EngagementPrediction from '@/components/EngagementPrediction'

export default function CampaignRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    campaignName: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Campaign Details
    objective: '',
    description: '',
    category: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    
    // Requirements
    influencerType: [] as string[],
    platforms: [] as string[],
    contentTypes: [] as string[],
    deliverables: '',
    specialRequirements: '',
    
    // Additional Info
    brandGuidelines: '',
    prohibitedContent: '',
    successMetrics: [] as string[],
    additionalNotes: ''
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const objectiveOptions = [
    'Brand Awareness',
    'Product Launch',
    'Lead Generation',
    'Sales Conversion',
    'Event Promotion',
    'Content Creation',
    'Community Building',
    'App Downloads'
  ]

  const categoryOptions = [
    'Fashion', 'Beauty', 'Lifestyle', 'Technology', 'Food', 'Travel',
    'Fitness', 'Gaming', 'Music', 'Art', 'Business', 'Education',
    'Health', 'Sports', 'Entertainment', 'Automotive'
  ]

  const influencerTypeOptions = [
    'Nano Influencers (1K-10K)',
    'Micro Influencers (10K-100K)',
    'Mid-tier Influencers (100K-1M)',
    'Macro Influencers (1M+)',
    'Celebrity Influencers',
    'Industry Experts',
    'Brand Ambassadors'
  ]

  const platformOptions = [
    'Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 
    'LinkedIn', 'Pinterest', 'Snapchat', 'Twitch'
  ]

  const contentTypeOptions = [
    'Posts/Feed Content',
    'Stories',
    'Reels/Short Videos',
    'Long-form Videos',
    'Live Streams',
    'Blog Posts',
    'Podcasts',
    'User-Generated Content'
  ]

  const successMetricsOptions = [
    'Reach & Impressions',
    'Engagement Rate',
    'Click-through Rate',
    'Conversions',
    'Brand Mentions',
    'Hashtag Performance',
    'Website Traffic',
    'Sales Revenue'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleMultiSelectToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }))
  }

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: date || null
    }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.campaignName.trim()) return 'Campaign name is required'
        if (!formData.companyName.trim()) return 'Company name is required'
        if (!formData.contactEmail.trim()) return 'Contact email is required'
        if (!formData.contactEmail.includes('@')) return 'Valid email is required'
        break
      case 2:
        if (!formData.objective) return 'Campaign objective is required'
        if (!formData.description.trim()) return 'Campaign description is required'
        if (!formData.category) return 'Category is required'
        if (!formData.targetAudience.trim()) return 'Target audience is required'
        if (!formData.budget.trim()) return 'Budget is required'
        if (!formData.timeline) return 'Timeline is required'
        break
      case 3:
        if (formData.influencerType.length === 0) return 'Select at least one influencer type'
        if (formData.platforms.length === 0) return 'Select at least one platform'
        if (formData.contentTypes.length === 0) return 'Select at least one content type'
        break
    }
    return null
  }

  const handleNextStep = () => {
    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async () => {
    const validationError = validateStep(3)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Simulate campaign submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Campaign request submitted successfully! Our team will review your request and match you with suitable influencers within 24 hours.')
      
      // Reset form after success
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 3000)

    } catch {
      setError('Failed to submit campaign request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString() : 'Select date'
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Basic Information'
      case 2: return 'Campaign Details'
      case 3: return 'Requirements'
      case 4: return 'AI Tools & Review'
      default: return 'Campaign Request'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign Request</h1>
          <p className="mt-2 text-gray-600">
            Tell us about your campaign and we&apos;ll match you with the perfect influencers
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step < currentStep ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-xl font-semibold">{getStepTitle(currentStep)}</h2>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 mb-6">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Step Content */}
        <Card>
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name *</Label>
                    <Input
                      id="campaignName"
                      name="campaignName"
                      value={formData.campaignName}
                      onChange={handleInputChange}
                      placeholder="Summer Collection Launch"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your Company Inc."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="objective">Campaign Objective *</Label>
                    <Select onValueChange={(value) => handleSelectChange('objective', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        {objectiveOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Campaign Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your campaign goals, key messages, and what you want to achieve..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience">Target Audience *</Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Describe your target audience (age, interests, demographics, location, etc.)"
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Budget (USD) *</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      min="100"
                      step="100"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="5000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Timeline *</Label>
                    <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 week">1 week</SelectItem>
                        <SelectItem value="2 weeks">2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2 months">2 months</SelectItem>
                        <SelectItem value="3 months">3 months</SelectItem>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mt-1">
                          {formatDate(formData.startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate || undefined}
                          onSelect={(date) => handleDateChange('startDate', date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mt-1">
                          {formatDate(formData.endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate || undefined}
                          onSelect={(date) => handleDateChange('endDate', date)}
                          disabled={(date) => date < new Date() || (formData.startDate ? date < formData.startDate : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Influencer Type *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {influencerTypeOptions.map(type => (
                      <Badge
                        key={type}
                        variant={formData.influencerType.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleMultiSelectToggle('influencerType', type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Platforms *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {platformOptions.map(platform => (
                      <Badge
                        key={platform}
                        variant={formData.platforms.includes(platform) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleMultiSelectToggle('platforms', platform)}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Content Types *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {contentTypeOptions.map(type => (
                      <Badge
                        key={type}
                        variant={formData.contentTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleMultiSelectToggle('contentTypes', type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="deliverables">Deliverables</Label>
                  <Textarea
                    id="deliverables"
                    name="deliverables"
                    value={formData.deliverables}
                    onChange={handleInputChange}
                    placeholder="Specify the number of posts, stories, videos, etc. you expect..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>Success Metrics</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {successMetricsOptions.map(metric => (
                      <Badge
                        key={metric}
                        variant={formData.successMetrics.includes(metric) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleMultiSelectToggle('successMetrics', metric)}
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              placeholder="Any specific requirements, restrictions, or preferences..."
              className="mt-1 min-h-[100px]"
            />
          </div>
        </div>
      )}



            {currentStep === 4 && (
              <div className="space-y-8">
                <Tabs defaultValue="recommendations" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                    <TabsTrigger value="predictions">Engagement Prediction</TabsTrigger>
                    <TabsTrigger value="review">Review & Submit</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recommendations" className="mt-6">
                    <RecommendationEngine />
                  </TabsContent>
                  
                  <TabsContent value="predictions" className="mt-6">
                    <EngagementPrediction />
                  </TabsContent>
                  
                  <TabsContent value="review" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Campaign Summary</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Basic Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div><strong>Campaign:</strong> {formData.campaignName}</div>
                            <div><strong>Company:</strong> {formData.companyName}</div>
                            <div><strong>Contact:</strong> {formData.contactEmail}</div>
                            <div><strong>Objective:</strong> {formData.objective}</div>
                            <div><strong>Category:</strong> {formData.category}</div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Campaign Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div><strong>Budget:</strong> ${formData.budget}</div>
                            <div><strong>Timeline:</strong> {formData.timeline}</div>
                            <div><strong>Platforms:</strong> {formData.platforms.join(', ')}</div>
                            <div><strong>Influencer Types:</strong> {formData.influencerType.join(', ')}</div>
                            <div><strong>Content Types:</strong> {formData.contentTypes.join(', ')}</div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Description & Audience</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                          <div>
                            <strong>Description:</strong>
                            <p className="mt-1 text-gray-600">{formData.description}</p>
                          </div>
                          <div>
                            <strong>Target Audience:</strong>
                            <p className="mt-1 text-gray-600">{formData.targetAudience}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the platform&apos;s terms of service and understand that this campaign request will be reviewed by our team
                        </Label>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-black hover:bg-gray-800"
                      >
                        {loading ? 'Submitting Campaign...' : 'Submit Campaign Request'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              className="bg-black hover:bg-gray-800"
            >
              Next Step
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
