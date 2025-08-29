import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { subscriptionId } = req.body

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscription ID' })
  }

  try {
    // Cancel subscription at period end
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    return res.status(200).json({ 
      subscription: canceledSubscription,
      message: 'Subscription will be canceled at the end of the billing period'
    })
  } catch (error) {
    console.error('Subscription cancellation error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
