import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { subscriptionId, newPlanId } = req.body

  if (!subscriptionId || !newPlanId) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    // Map planId to Stripe price ID
    const priceIdMap: Record<string, string> = {
      basic: process.env.STRIPE_BASIC_PRICE_ID!,
      premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    }

    const newPriceId = priceIdMap[newPlanId]

    if (!newPriceId) {
      return res.status(400).json({ error: 'Invalid plan ID' })
    }

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    // Update subscription with proration
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: 'create_prorations', // Automatically prorate charges
    })

    return res.status(200).json({ 
      subscription: updatedSubscription,
      message: 'Subscription upgraded successfully'
    })
  } catch (error) {
    console.error('Subscription upgrade error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
