'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SubscriptionTiersProps {
  onSelectPlan?: (planId: string) => void
  currentPlan?: string
  showActionButtons?: boolean
}

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9.99',
    period: 'per month',
    description: 'Perfect for individuals getting started',
    features: [
      'Access to basic influencer profiles',
      'Up to 3 active campaigns',
      'Email support',
      'Basic analytics'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29.99',
    period: 'per month',
    description: 'For growing businesses and agencies',
    features: [
      'Access to all influencer profiles',
      'Unlimited campaigns',
      'Priority email & chat support',
      'Advanced analytics',
      'Campaign templates',
      'Performance reports'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'enterprise pricing',
    description: 'For large organizations with custom needs',
    features: [
      'Custom influencer matching',
      'Dedicated account manager',
      'API access',
      'Custom analytics dashboard',
      'White-label solutions',
      'SLA guarantees'
    ],
    popular: false
  }
]

export default function SubscriptionTiers({ 
  onSelectPlan, 
  currentPlan, 
  showActionButtons = true 
}: SubscriptionTiersProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {subscriptionPlans.map(plan => (
        <Card 
          key={plan.id} 
          className={`relative border-2 ${
            plan.popular 
              ? 'border-blue-600 shadow-lg' 
              : 'border-gray-300'
          } ${
            currentPlan === plan.id 
              ? 'ring-2 ring-blue-500' 
              : ''
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
              Most Popular
            </Badge>
          )}
          
          {currentPlan === plan.id && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
              Current Plan
            </Badge>
          )}

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-gray-600">{plan.period}</span>
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="text-sm text-gray-700 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {showActionButtons && (
              <Button 
                onClick={() => onSelectPlan?.(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-black hover:bg-gray-800'
                }`}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
