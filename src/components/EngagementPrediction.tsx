'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getEngagementPrediction, type InfluencerData, type CampaignData, type EngagementPrediction as PredictionResult } from '@/lib/aiAPI'

export default function EngagementPrediction() {
  const [influencerData, setInfluencerData] = useState<InfluencerData>({
    name: '',
    category: '',
    followers: 0,
    engagement_rate: 0,
    platform: ''
  })

  const [campaignData, setCampaignData] = useState<Partial<CampaignData>>({
    objective: '',
    budget: 0,
    target_audience: ''
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 'LinkedIn']
  const categoryOptions = [
    'Fashion', 'Beauty', 'Lifestyle', 'Technology', 'Food', 'Travel',
    'Fitness', 'Gaming', 'Music', 'Art', 'Business', 'Education',
    'Health', 'Sports', 'Entertainment', 'Automotive'
  ]
  const objectiveOptions = [
    'Brand Awareness', 'Product Launch', 'Lead Generation', 'Sales Conversion',
    'Event Promotion', 'Content Creation', 'Community Building', 'App Downloads'
  ]

  const handleInfluencerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfluencerData(prev => ({
      ...prev,
      [name]: name === 'followers' || name === 'engagement_rate' ? parseFloat(value) || 0 : value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleCampaignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCampaignData(prev => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) || 0 : value
    }))
    if (error) setError('')
  }

  const handleSelectChange = (field: string, value: string, isInfluencer = true) => {
    if (isInfluencer) {
      setInfluencerData(prev => ({ ...prev, [field]: value }))
    } else {
      setCampaignData(prev => ({ ...prev, [field]: value }))
    }
    if (error) setError('')
  }

  const validateForm = () => {
    if (!influencerData.name.trim()) return 'Please enter influencer name'
    if (!influencerData.category) return 'Please select influencer category'
    if (!influencerData.platform) return 'Please select platform'
    if (!influencerData.followers || influencerData.followers <= 0) return 'Please enter valid follower count'
    if (!influencerData.engagement_rate || influencerData.engagement_rate <= 0) return 'Please enter valid engagement rate'
    if (!campaignData.objective) return 'Please select campaign objective'
    if (!campaignData.budget || campaignData.budget <= 0) return 'Please enter valid budget'
    if (!campaignData.target_audience?.trim()) return 'Please describe target audience'
    return null
  }

  const handleGetPrediction = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setPrediction(null)

    try {
      const fullCampaignData: CampaignData = {
        objective: campaignData.objective!,
        budget: campaignData.budget!,
        category: influencerData.category,
        target_audience: campaignData.target_audience!,
        timeline: '1 month' // Default timeline for prediction
      }

      const result = await getEngagementPrediction(influencerData, fullCampaignData)
      setPrediction(result)
      setSuccess('Engagement prediction generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate prediction'
      setError("Failed to generate prediction: " + errorMessage + ". Please try again or contact support if the issue persists.")
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (score: number) => {
    if (score >= 80) return 'High Confidence'
    if (score >= 60) return 'Medium Confidence'
    if (score >= 40) return 'Low Confidence'
    return 'Very Low Confidence'
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Influencer Data */}
        <Card>
          <CardHeader>
            <CardTitle>Influencer Profile</CardTitle>
            <CardDescription>
              Enter the influencer&apos;s profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Influencer Name *</Label>
              <Input
                id="name"
                name="name"
                value={influencerData.name}
                onChange={handleInfluencerChange}
                placeholder="Enter influencer name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="platform">Platform *</Label>
              <Select onValueChange={(value) => handleSelectChange('platform', value, true)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => handleSelectChange('category', value, true)}>
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

            <div>
              <Label htmlFor="followers">Followers *</Label>
              <Input
                id="followers"
                name="followers"
                type="number"
                min="1"
                value={influencerData.followers || ''}
                onChange={handleInfluencerChange}
                placeholder="50000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="engagement_rate">Engagement Rate (%) *</Label>
              <Input
                id="engagement_rate"
                name="engagement_rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={influencerData.engagement_rate || ''}
                onChange={handleInfluencerChange}
                placeholder="3.5"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Campaign Data */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Provide campaign information for accurate predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="objective">Campaign Objective *</Label>
              <Select onValueChange={(value) => handleSelectChange('objective', value, false)}>
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
              <Label htmlFor="budget">Campaign Budget (USD) *</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                min="100"
                step="100"
                value={campaignData.budget || ''}
                onChange={handleCampaignChange}
                placeholder="5000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="target_audience">Target Audience *</Label>
              <Input
                id="target_audience"
                name="target_audience"
                value={campaignData.target_audience || ''}
                onChange={handleCampaignChange}
                placeholder="Young adults interested in fashion"
                className="mt-1"
              />
            </div>

            <div className="pt-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 mb-4">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleGetPrediction}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800"
              >
                {loading ? 'Generating Prediction...' : 'Predict Engagement'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prediction Results */}
      {prediction && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Engagement Prediction</h2>
            <p className="text-gray-600 mt-2">
              AI-powered predictions based on historical data and current trends
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatNumber(prediction.predicted_reach)}
                </div>
                <div className="text-sm text-gray-600">Predicted Reach</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((prediction.predicted_reach / influencerData.followers) * 100).toFixed(1)}% of followers
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatNumber(prediction.predicted_engagement)}
                </div>
                <div className="text-sm text-gray-600">Predicted Engagement</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((prediction.predicted_engagement / prediction.predicted_reach) * 100).toFixed(1)}% engagement rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatNumber(prediction.predicted_conversions)}
                </div>
                <div className="text-sm text-gray-600">Predicted Conversions</div>
                <div className="text-xs text-gray-500 mt-1">
                  {((prediction.predicted_conversions / prediction.predicted_engagement) * 100).toFixed(1)}% conversion rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-bold mb-2 ${getConfidenceColor(prediction.confidence_score)}`}>
                  {prediction.confidence_score}%
                </div>
                <div className="text-sm text-gray-600">Confidence Score</div>
                <div className={`text-xs mt-1 ${getConfidenceColor(prediction.confidence_score)}`}>
                  {getConfidenceLabel(prediction.confidence_score)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confidence Indicator */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Prediction Confidence</span>
                <Badge variant={prediction.confidence_score >= 70 ? "default" : "secondary"}>
                  {getConfidenceLabel(prediction.confidence_score)}
                </Badge>
              </div>
              <Progress value={prediction.confidence_score} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {prediction.confidence_score >= 80 
                  ? "High confidence - predictions are likely to be accurate based on strong data patterns"
                  : prediction.confidence_score >= 60
                  ? "Medium confidence - predictions are reasonably reliable with some uncertainty"
                  : "Lower confidence - use predictions as rough estimates, actual results may vary significantly"
                }
              </p>
            </CardContent>
          </Card>

          {/* ROI Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>
                Cost-effectiveness metrics for this campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {formatCurrency(campaignData.budget! / prediction.predicted_reach)}
                  </div>
                  <div className="text-sm text-gray-600">Cost per Reach</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {formatCurrency(campaignData.budget! / prediction.predicted_engagement)}
                  </div>
                  <div className="text-sm text-gray-600">Cost per Engagement</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {formatCurrency(campaignData.budget! / prediction.predicted_conversions)}
                  </div>
                  <div className="text-sm text-gray-600">Cost per Conversion</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Suggestions to optimize your campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prediction.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-blue-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto bg-black hover:bg-gray-800">
              Save Prediction Report
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Share with Team
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setPrediction(null)}>
              New Prediction
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
