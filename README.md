# Business Solution Platform

A comprehensive Next.js application for business management with AI-powered features, subscription management, and payment processing.


## Features

### 🤖 AI-Powered Tools

- **AI Chatbot**: Intelligent conversational assistant for customer support and queries
- **Engagement Prediction**: AI-driven analytics to predict user engagement and campaign performance
- **Recommendation Engine**: Smart suggestions for influencers, content, and business strategies
- <img width="1901" height="901" alt="Screenshot 2025-08-29 105145" src="https://github.com/user-attachments/assets/ab381ffb-d4b4-4b89-8d09-212a94845167" />
<img width="1919" height="884" alt="Screenshot 2025-08-29 105214" src="https://github.com/user-attachments/assets/0fa52843-8026-4422-8f70-f613de361271" />
<img width="1908" height="917" alt="Screenshot 2025-08-29 105109" src="https://github.com/user-attachments/assets/ac92e975-a8c7-4b46-9f61-3aed2a935223" />
<img width="1918" height="920" alt="Screenshot 2025-08-29 105056" src="https://github.com/user-attachments/assets/1ee81ab7-349c-4482-96df-da8135758b6d" />
<img width="1918" height="899" alt="Screenshot 2025-08-29 105451" src="https://github.com/user-attachments/assets/ddb27af5-d5a9-4e2d-a00f-25ed2604e3b1" />



### 💳 Subscription & Payment Management

- **Subscription Tiers**: Multiple pricing plans with different feature sets
- **Stripe Integration**: Secure payment processing for subscriptions and one-time payments
- **Billing Dashboard**: Comprehensive billing management and subscription overview
- **Invoice Generation**: Automated invoice creation and management
- <img width="1911" height="912" alt="Screenshot 2025-08-29 105647" src="https://github.com/user-attachments/assets/18590db0-c4ef-4c5b-aeb4-0a72ff69d63f" />


### 👥 User Management

- **User Authentication**: Secure login and registration system
- **Profile Management**: Complete user profile customization and management
- **Social Connect**: Integration with social media platforms for enhanced connectivity
 <img width="1901" height="967" alt="Screenshot 2025-08-29 104827" src="https://github.com/user-attachments/assets/859e2df4-3de1-476d-8fd8-de7356f47caa" />
<img width="1911" height="963" alt="Screenshot 2025-08-29 104843" src="https://github.com/user-attachments/assets/52e20efe-c565-4af4-90f2-87b27867fad0" />
<img width="1911" height="903" alt="Screenshot 2025-08-29 104904" src="https://github.com/user-attachments/assets/a7e02f8a-3672-4f1a-a45e-5153278f4126" />
<img width="1913" height="963" alt="Screenshot 2025-08-29 104921" src="https://github.com/user-attachments/assets/1a7fa83b-cff2-4c7d-a45a-5bedf30222e7" />

### 📊 Campaign Management

- **Campaign Requests**: Streamlined campaign creation and management
- **File Upload**: Easy media and document upload capabilities
- **Analytics Dashboard**: Performance tracking and reporting
<img width="1919" height="898" alt="Screenshot 2025-08-29 105814" src="https://github.com/user-attachments/assets/abbf8312-ee01-4096-ab02-f87d06b19274" />
<img width="1856" height="911" alt="Screenshot 2025-08-29 105839" src="https://github.com/user-attachments/assets/40e8da5f-a4bd-48a9-92cb-77fcabeb4d00" />
<img width="1883" height="918" alt="Screenshot 2025-08-29 110046" src="https://github.com/user-attachments/assets/d74acf4c-c226-4d5e-b004-860d9fc45690" />




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

5. Open [http://localhost:8000](http://localhost:3000) with your browser to see the result.

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

### Vercel 
next step



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
