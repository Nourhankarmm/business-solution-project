import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe, priceIdMap } from '@/lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { planId, successUrl, cancelUrl } = req.body

  if (!planId || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    const priceId = priceIdMap[planId]

    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan ID' })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
