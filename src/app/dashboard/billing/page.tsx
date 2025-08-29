'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface BillingHistory {
  id: string
  date: string
  amount: string
  status: 'paid' | 'pending' | 'failed'
  description: string
}

interface SubscriptionDetails {
  plan: string
  status: 'active' | 'cancelled' | 'pending'
  nextBillingDate: string
  price: string
}

export default function BillingPage() {
  const [billingHistory] = useState<BillingHistory[]>([
    {
      id: '1',
      date: '2024-01-15',
      amount: '$29.99',
      status: 'paid',
      description: 'Premium Plan - Monthly'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: '$29.99',
      status: 'paid',
      description: 'Premium Plan - Monthly'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: '$9.99',
      status: 'paid',
      description: 'Basic Plan - Monthly'
    }
  ])

  const [subscription] = useState<SubscriptionDetails>({
    plan: 'Premium',
    status: 'active',
    nextBillingDate: '2024-02-15',
    price: '$29.99/month'
  })

  const handleUpgrade = () => {
    // Navigate to subscriptions page
    window.location.href = '/subscriptions'
  }

  const handleCancel = () => {
    // Simulate cancellation
    alert('Subscription cancellation request submitted. Your subscription will remain active until the end of the current billing period.')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your current plan and billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Plan</span>
              <span className="font-semibold">{subscription.plan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <Badge className={getStatusBadge(subscription.status)}>
                {subscription.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Price</span>
              <span className="font-semibold">{subscription.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Next Billing Date</span>
              <span className="font-semibold">{subscription.nextBillingDate}</span>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button onClick={handleUpgrade} className="bg-black hover:bg-gray-800">
                Upgrade Plan
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your current payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm font-bold">V</span>
                </div>
                <div>
                  <p className="font-semibold">Visa ending in 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                Your payment method is securely stored and encrypted.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your past transactions and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 font-semibold">{item.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Download Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
