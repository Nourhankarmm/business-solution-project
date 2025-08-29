'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { socialAPI, SocialMetrics, FakeFollowerAnalysis } from '@/lib/socialAPI'

interface SocialConnectProps {
  socialHandles: Record<string, string>
  onSocialHandlesChange: (handles: Record<string, string>) => void
  onMetricsUpdate?: (metrics: Record<string, SocialMetrics>) => void
  onFakeFollowerAnalysis?: (analysis: Record<string, FakeFollowerAnalysis>) => void
}

export default function SocialConnect({
  socialHandles,
  onSocialHandlesChange,
  onMetricsUpdate,
  onFakeFollowerAnalysis
}: SocialConnectProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [metrics, setMetrics] = useState<Record<string, SocialMetrics>>({})
  const [fakeFollowerAnalysis, setFakeFollowerAnalysis] = useState<Record<string, FakeFollowerAnalysis>>({})
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const platforms = [
    { key: 'instagram', name: 'Instagram', icon: '📷', placeholder: '@username' },
    { key: 'tiktok', name: 'TikTok', icon: '🎵', placeholder: '@username' },
    { key: 'youtube', name: 'YouTube', icon: '📺', placeholder: 'Channel URL or @handle' },
    { key: 'twitter', name: 'Twitter/X', icon: '🐦', placeholder: '@username' }
  ]

  const handleInputChange = (platform: string, value: string) => {
    const newHandles = { ...socialHandles, [platform]: value }
    onSocialHandlesChange(newHandles)
    setError('')
    setSuccess('')
  }

  const fetchPlatformMetrics = async (platform: string) => {
    const username = socialHandles[platform]
    if (!username) {
      setError(`Please enter a ${platform} username first`)
      return
    }

    setLoading(platform)
    setError('')
    setSuccess('')

    try {
      let platformMetrics: SocialMetrics
      
      switch (platform) {
        case 'instagram':
          platformMetrics = await socialAPI.getInstagramMetrics(username)
          break
        case 'tiktok':
          platformMetrics = await socialAPI.getTikTokMetrics(username)
          break
        case 'youtube':
          platformMetrics = await socialAPI.getYouTubeMetrics()
          break
        case 'twitter':
          platformMetrics = await socialAPI.getTwitterMetrics(username)
          break
        default:
          throw new Error('Unsupported platform')
      }

      // Update metrics state
      const newMetrics = { ...metrics, [platform]: platformMetrics }
      setMetrics(newMetrics)
      onMetricsUpdate?.(newMetrics)

      // Perform fake follower analysis
      const analysis = await socialAPI.detectFakeFollowers(platformMetrics, platform)
      const newAnalysis = { ...fakeFollowerAnalysis, [platform]: analysis }
      setFakeFollowerAnalysis(newAnalysis)
      onFakeFollowerAnalysis?.(newAnalysis)

      setSuccess(`Successfully fetched ${platform} metrics!`)
    } catch (err) {
      setError(`Failed to fetch ${platform} metrics: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(null)
    }
  }

  const fetchAllMetrics = async () => {
    const platformsToFetch = Object.keys(socialHandles).filter(key => socialHandles[key])
    if (platformsToFetch.length === 0) {
      setError('Please enter at least one social media username')
      return
    }

    setLoading('all')
    setError('')
    setSuccess('')

    try {
      const batchMetrics = await socialAPI.getBatchMetrics(socialHandles)
      setMetrics(batchMetrics)
      onMetricsUpdate?.(batchMetrics)

      // Perform fake follower analysis for each platform
      const analysisResults: Record<string, FakeFollowerAnalysis> = {}
      for (const [platform, platformMetrics] of Object.entries(batchMetrics)) {
        const analysis = await socialAPI.detectFakeFollowers(platformMetrics, platform)
        analysisResults[platform] = analysis
      }
      setFakeFollowerAnalysis(analysisResults)
      onFakeFollowerAnalysis?.(analysisResults)

      setSuccess(`Successfully fetched metrics for ${platformsToFetch.length} platform(s)!`)
    } catch (err) {
      setError(`Failed to fetch metrics: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(null)
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Integration</CardTitle>
          <CardDescription>
            Connect your social media accounts to showcase your reach and engagement metrics
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

          {/* Platform Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <div key={platform.key} className="space-y-3">
                <Label htmlFor={platform.key}>
                  <span className="mr-2">{platform.icon}</span>
                  {platform.name}
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id={platform.key}
                    value={socialHandles[platform.key] || ''}
                    onChange={(e) => handleInputChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fetchPlatformMetrics(platform.key)}
                    disabled={loading === platform.key || !socialHandles[platform.key]}
                    size="sm"
                  >
                    {loading === platform.key ? '...' : 'Fetch'}
                  </Button>
                </div>

                {/* Platform Metrics Display */}
                {metrics[platform.key] && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Followers:</span>
                      <span className="font-medium">{formatNumber(metrics[platform.key].followers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement:</span>
                      <span className="font-medium">{metrics[platform.key].engagement_rate}%</span>
                    </div>
                    {metrics[platform.key].verified && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Verified ✓
                      </Badge>
                    )}
                  </div>
                )}

                {/* Fake Follower Analysis */}
                {fakeFollowerAnalysis[platform.key] && (
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between items-center">
                      <span>Authenticity:</span>
                      <Badge
                        variant={
                          fakeFollowerAnalysis[platform.key].is_suspicious 
                            ? "destructive" 
                            : "default"
                        }
                      >
                        {fakeFollowerAnalysis[platform.key].is_suspicious 
                          ? 'Suspicious' 
                          : 'Authentic'
                        }
                      </Badge>
                    </div>
                    {fakeFollowerAnalysis[platform.key].is_suspicious && (
                      <div className="text-orange-600 text-xs">
                        {fakeFollowerAnalysis[platform.key].estimated_fake_percentage}% fake followers detected
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Batch Fetch Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={fetchAllMetrics}
              disabled={loading === 'all'}
              className="w-full max-w-md"
            >
              {loading === 'all' ? (
                <>
                  <span className="animate-pulse">⏳</span>
                  <span className="ml-2">Fetching All Metrics...</span>
                </>
              ) : (
                <>
                  <span>📊</span>
                  <span className="ml-2">Fetch All Social Media Metrics</span>
                </>
              )}
            </Button>
          </div>

          {/* Overall Authenticity Score */}
          {Object.keys(fakeFollowerAnalysis).length > 0 && (
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-sm mb-2">Overall Authenticity Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Object.entries(fakeFollowerAnalysis).map(([platform, analysis]) => (
                  <div key={platform} className="p-3 border rounded-lg">
                    <div className="font-medium capitalize">{platform}</div>
                    <div className="flex justify-between items-center mt-2">
                      <span>Confidence:</span>
                      <Badge
                        variant={
                          analysis.confidence_score > 70 
                            ? "default" 
                            : analysis.confidence_score > 40 
                            ? "secondary" 
                            : "destructive"
                        }
                      >
                        {analysis.confidence_score}%
                      </Badge>
                    </div>
                    {analysis.is_suspicious && analysis.reasons.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-orange-600 font-medium">Issues:</div>
                        <ul className="text-xs text-orange-600 space-y-1 mt-1">
                          {analysis.reasons.slice(0, 2).map((reason, index) => (
                            <li key={index}>• {reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
