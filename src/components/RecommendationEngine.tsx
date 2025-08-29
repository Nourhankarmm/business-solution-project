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
import { Progress } from "@/components/ui/progress"
import { getInfluencerRecommendations, type CampaignData, type RecommendationResult } from '@/lib/aiAPI'

export default function RecommendationEngine() {
  const [campaignData, setCampaignData] = useState<CampaignData>({
    objective: '',
    budget: 0,
    category: '',
    target_audience: '',
    timeline: ''
  })
  
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  const timelineOptions = [
    '1 week',
    '2 weeks',
    '1 month',
    '2 months',
    '3 months',
    '6 months',
    'Ongoing'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCampaignData(prev => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSelectChange = (name: string, value: string) => {
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!campaignData.objective) return 'Please select a campaign objective'
    if (!campaignData.budget || campaignData.budget <= 0) return 'Please enter a valid budget'
    if (!campaignData.category) return 'Please select a category'
    if (!campaignData.target_audience.trim()) return 'Please describe your target audience'
    if (!campaignData.timeline) return 'Please select a timeline'
    return null
  }

  const handleGetRecommendations = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setRecommendations([])

    try {
      const results = await getInfluencerRecommendations(campaignData)
      setRecommendations(results)
      if (results.length > 0) {
        setSuccess(`Found ${results.length} recommended influencers for your campaign!`)
      } else {
        setError('No influencers found matching your criteria. Try adjusting your budget or requirements.')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get recommendations'
      setError(`Failed to get recommendations: ${errorMessage}. Please try again or contact support if the issue persists.`)
      console.error('Recommendation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-blue-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-gray-500'
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
    <div className="space-y-8">
      {/* Campaign Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>
            Provide your campaign information to get AI-powered influencer recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign Objective */}
            <div>
              <Label htmlFor="objective">Campaign Objective *</Label>
              <Select onValueChange={(value) => handleSelectChange('objective', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select campaign objective" />
                </SelectTrigger>
                <SelectContent>
                  {objectiveOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div>
              <Label htmlFor="budget">Budget (USD) *</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                min="100"
                step="100"
                value={campaignData.budget || ''}
                onChange={handleInputChange}
                placeholder="5000"
                className="mt-1"
              />
            </div>

            {/* Category */}
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

            {/* Timeline */}
            <div>
              <Label htmlFor="timeline">Timeline *</Label>
              <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <Label htmlFor="target_audience">Target Audience *</Label>
            <Textarea
              id="target_audience"
              name="target_audience"
              value={campaignData.target_audience}
              onChange={handleInputChange}
              placeholder="Describe your target audience (age, interests, demographics, etc.)"
              className="mt-1 min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800"
          >
            {loading ? 'Finding Recommendations...' : 'Get AI Recommendations'}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Results */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Influencers</h2>
            <p className="text-gray-600 mt-2">
              AI-matched influencers based on your campaign requirements
            </p>
          </div>

          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <img 
                          src={`https://placehold.co/64x64?text=${rec.influencer.charAt(0)}`}
                          alt={`Profile picture of ${rec.influencer}`}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/64x64?text=${rec.influencer.charAt(0)}`
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{rec.influencer}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">
                            Match Score: {rec.match_score}%
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getMatchScoreColor(rec.match_score)}`}></div>
                            <span className="text-sm text-gray-500">
                              {rec.match_score >= 90 ? 'Excellent' : 
                               rec.match_score >= 80 ? 'Very Good' : 
                               rec.match_score >= 70 ? 'Good' : 'Fair'} Match
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatCurrency(rec.estimated_cost)}</p>
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Match Score</span>
                      <span className="text-sm text-gray-500">{rec.match_score}%</span>
                    </div>
                    <Progress value={rec.match_score} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-700">Estimated Reach</p>
                      <p className="text-lg font-semibold">{formatNumber(rec.estimated_reach)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-gray-700">Cost per Reach</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(rec.estimated_cost / rec.estimated_reach)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Why This Match?</h4>
                    <p className="text-sm text-gray-600">{rec.reasoning}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button className="w-full sm:flex-1 bg-black hover:bg-gray-800">
                      Contact Influencer
                    </Button>
                    <Button variant="outline" className="w-full sm:flex-1">
                      View Full Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">
                    {formatNumber(recommendations.reduce((sum, rec) => sum + rec.estimated_reach, 0))}
                  </p>
                  <p className="text-sm text-gray-600">Total Estimated Reach</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(recommendations.reduce((sum, rec) => sum + rec.estimated_cost, 0))}
                  </p>
                  <p className="text-sm text-gray-600">Total Estimated Cost</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(recommendations.reduce((sum, rec) => sum + rec.match_score, 0) / recommendations.length)}%
                  </p>
                  <p className="text-sm text-gray-600">Average Match Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{recommendations.length}</p>
                  <p className="text-sm text-gray-600">Recommended Influencers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
              <p className="text-gray-600">Finding the perfect influencers for your campaign...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
