'use client'

import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import StripePaymentForm from '@/components/StripePaymentForm'

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    priceDisplay: '$9.99/month',
    features: [
      'Access to basic influencer profiles',
      'Limited campaign participation',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29.99,
    priceDisplay: '$29.99/month',
    features: [
      'Access to all influencer profiles',
      'Unlimited campaign participation',
      'Priority email support',
      'Advanced analytics'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    priceDisplay: 'Contact us',
    features: [
      'Custom influencer matching',
      'Dedicated account manager',
      'API access',
      'Custom analytics and reporting'
    ]
  }
]

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic')
  const [paymentError, setPaymentError] = useState('')

  const selectedPlanData = subscriptionPlans.find(plan => plan.id === selectedPlan)

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>

      {paymentError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}


      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => (
          <Card key={plan.id} className={`cursor-pointer border-2 ${selectedPlan === plan.id ? 'border-blue-600' : 'border-gray-300'}`}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.priceDisplay}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              <RadioGroupItem value={plan.id} className="hidden" />
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {selectedPlan !== 'enterprise' ? (
        <div className="mt-8">
          <StripePaymentForm
            amount={selectedPlanData?.price || 0}
            planName={selectedPlanData?.name || ''}
            planId={selectedPlanData?.id || ''}
            onPaymentError={setPaymentError}
          />
        </div>
      ) : (
        <div className="mt-8 p-4 border rounded bg-yellow-50 text-yellow-800">
          Please contact sales for Enterprise plan.
        </div>
      )}
    </div>
  )
}
