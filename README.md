# Business Solution Platform

A comprehensive Next.js application for business management with AI-powered features, subscription management, and payment processing.

## Features

### 🤖 AI-Powered Tools

- **AI Chatbot**: Intelligent conversational assistant for customer support and queries
- **Engagement Prediction**: AI-driven analytics to predict user engagement and campaign performance
- **Recommendation Engine**: Smart suggestions for influencers, content, and business strategies

### 💳 Subscription & Payment Management

- **Subscription Tiers**: Multiple pricing plans with different feature sets
- **Stripe Integration**: Secure payment processing for subscriptions and one-time payments
- **Billing Dashboard**: Comprehensive billing management and subscription overview
- **Invoice Generation**: Automated invoice creation and management

### 👥 User Management

- **User Authentication**: Secure login and registration system
- **Profile Management**: Complete user profile customization and management
- **Social Connect**: Integration with social media platforms for enhanced connectivity

### 📊 Campaign Management

- **Campaign Requests**: Streamlined campaign creation and management
- **File Upload**: Easy media and document upload capabilities
- **Analytics Dashboard**: Performance tracking and reporting

## Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.6
- **UI Components**: Radix UI primitives with custom components
- **Payment Processing**: Stripe (frontend: stripe-js, backend: stripe-node)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns
- **Notifications**: Sonner toast notifications

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- OpenAI API key (for AI features)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd business-solution
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Add your OpenAI API key: `NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here`
   - Add Stripe keys (if using payment features)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── campaign-request/  # Campaign management
│   ├── chatbot/           # AI chatbot interface
│   ├── dashboard/         # User dashboard
│   │   └── billing/       # Billing management
│   ├── profile/           # User profile
│   ├── subscriptions/     # Subscription management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/                # Base UI components (Radix + custom)
│   ├── AiChatbot.tsx      # AI chatbot component
│   ├── EngagementPrediction.tsx
│   ├── FileUpload.tsx
│   ├── InvoiceGenerator.tsx
│   ├── PaymentForm.tsx
│   ├── ProfileForm.tsx
│   ├── RecommendationEngine.tsx
│   ├── SocialConnect.tsx
│   ├── StripePaymentForm.tsx
│   └── SubscriptionTiers.tsx
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts      # Mobile detection hook
├── lib/                   # Utility libraries
│   ├── aiAPI.ts           # OpenAI API integration
│   ├── socialAPI.ts       # Social media API integration
│   ├── stripe.ts          # Stripe configuration
│   └── utils.ts           # Utility functions
└── pages/                 # API routes (legacy pages directory)
    └── api/
        └── stripe/        # Stripe webhook handlers
            ├── cancel.ts
            ├── checkout.ts
            ├── upgrade.ts
            └── webhook.ts
```

## Available Scripts

- `npm run dev` - Start development server on port 8000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms

You can also deploy to other platforms like:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.
