import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil' as any,
})

export const priceIdMap: Record<string, string> = {
  basic: process.env.STRIPE_BASIC_PRICE_ID!,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
}

export function getPlanNameFromPriceId(priceId: string): string {
  const entries = Object.entries(priceIdMap)
  const found = entries.find(([, id]) => id === priceId)
  return found ? found[0] : 'Unknown'
}

export function getPriceIdFromPlanName(planName: string): string | null {
  return priceIdMap[planName] || null
}
