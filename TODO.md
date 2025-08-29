# TODO: Stripe Payment Integration & Plan Upgrade Workflows

## Phase 2 Implementation Plan

### 1. Setup and Dependencies

- [ ] Add Stripe SDK dependency to package.json
- [ ] Add Stripe environment variables to env.example
- [ ] Create .env.local with actual Stripe keys (user to provide)
- [ ] Create Stripe utility functions and client setup

### 2. API Routes Implementation

- [ ] Create `/api/stripe/checkout` - Create checkout session for new subscriptions
- [ ] Create `/api/stripe/webhook` - Handle Stripe webhook events
- [ ] Create `/api/stripe/upgrade` - Handle plan upgrade/downgrade with proration
- [ ] Create `/api/stripe/cancel` - Handle subscription cancellation

### 3. Frontend Components Updates

- [ ] Update PaymentForm.tsx - Replace simulation with real Stripe integration
- [ ] Update Subscriptions page - Integrate with Stripe checkout
- [ ] Update Billing page - Show real subscription data from Stripe
- [ ] Add loading states and error handling

### 4. Plan Upgrade Workflows

- [ ] Implement immediate upgrade with proration calculation
- [ ] Implement downgrade handling (end of billing period)
- [ ] Add confirmation dialogs for plan changes
- [ ] Handle subscription status changes via webhooks

### 5. Testing and Validation

- [ ] Test payment flows with Stripe test cards
- [ ] Test plan upgrade/downgrade scenarios
- [ ] Verify webhook event handling
- [ ] Test error handling and edge cases

### 6. Security and Best Practices

- [ ] Validate webhook signatures
- [ ] Implement proper error handling
- [ ] Add input validation
- [ ] Ensure PCI compliance (no card data on frontend)

## Current Progress: Phase 2 - API Routes Complete

### Completed:

- [x] Add Stripe SDK dependency to package.json
- [x] Add Stripe environment variables to env.example
- [x] Create Stripe utility functions and client setup
- [x] Create `/api/stripe/checkout` - Create checkout session for new subscriptions
- [x] Create `/api/stripe/webhook` - Handle Stripe webhook events
- [x] Create `/api/stripe/upgrade` - Handle plan upgrade/downgrade with proration
- [x] Create `/api/stripe/cancel` - Handle subscription cancellation

### Next Steps:

- [ ] Update PaymentForm.tsx - Replace simulation with real Stripe integration
- [ ] Update Subscriptions page - Integrate with Stripe checkout
- [ ] Update Billing page - Show real subscription data from Stripe
- [ ] Add loading states and error handling
- [ ] Test payment flows with Stripe test cards
