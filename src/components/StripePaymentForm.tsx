'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripePaymentFormProps {
  amount: number
  planName: string
  planId: string
  onPaymentError?: (error: string) => void
}

export default function StripePaymentForm({ 
  amount, 
  planName, 
  planId, 
  onPaymentError 
}: StripePaymentFormProps) {
const [paymentProcessing, setPaymentProcessing] = useState(false)
const [paymentError, setPaymentError] = useState('')

const handlePayment = async () => {
  setPaymentProcessing(true)
  setPaymentError('')

  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        successUrl: `${window.location.origin}/subscriptions?success=true`,
        cancelUrl: `${window.location.origin}/subscriptions?canceled=true`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session')
    }

    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })

    if (error) {
      throw new Error(error.message)
    }

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Payment failed. Please try again.'
    setPaymentError(errorMsg)
    onPaymentError?.(errorMsg)
    setPaymentProcessing(false)
  }
}


  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your {planName} subscription for ${amount}/month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {paymentError && (
          <Alert variant="destructive">
            <AlertDescription>{paymentError}</AlertDescription>
          </Alert>
        )}

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-600 mb-4">
            You will be redirected to Stripe's secure payment page to complete your purchase.
            Your card details are never stored on our servers.
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span>Plan:</span>
            <span className="font-semibold">{planName}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Price:</span>
            <span className="font-semibold">${amount}/month</span>
          </div>
        </div>

        <Button 
          onClick={handlePayment}
          className="w-full bg-black hover:bg-gray-800" 
          disabled={paymentProcessing}
        >
          {paymentProcessing ? 'Redirecting to payment...' : `Pay $${amount}`}
        </Button>
      </CardContent>
    </Card>
  )
}
