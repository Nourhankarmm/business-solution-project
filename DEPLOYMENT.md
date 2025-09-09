# Deployment Guide

This guide provides detailed instructions for deploying the Business Solution Platform to various platforms.

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- A GitHub repository with your project
- API keys for required services:
  - OpenAI API key
  - Stripe account (for payment features)

## Environment Variables

Create the following environment variables in your deployment platform:

### Required Variables

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### Optional Variables

```env
NEXT_PUBLIC_APP_NAME=Business Solution Platform
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

#### Step 1: Prepare Your Repository

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

#### Step 3: Configure Environment Variables

1. In your Vercel project dashboard, go to "Settings" > "Environment Variables"
2. Add each environment variable from the list above
3. Click "Save"

#### Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

#### Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings" > "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions

### Option 2: Netlify

#### Step 1: Build Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

#### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in "Site settings" > "Environment variables"
6. Click "Deploy site"

### Option 3: Railway

#### Step 1: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a Next.js project

#### Step 2: Configure Environment Variables

1. In your Railway project, go to "Variables"
2. Add all required environment variables
3. Redeploy the project

### Option 4: AWS Amplify

#### Step 1: Deploy to AWS Amplify

1. Go to AWS Amplify Console
2. Click "New app" > "Host web app"
3. Choose "GitHub" as your source
4. Connect your GitHub repository
5. Configure build settings:
   - Frontend framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

#### Step 2: Configure Environment Variables

1. In Amplify Console, go to "App settings" > "Environment variables"
2. Add all required environment variables
3. Save and redeploy

### Option 5: Manual Deployment

#### Step 1: Build the Application

```bash
npm run build
```

#### Step 2: Start Production Server

```bash
npm run start
```

The app will be available on port 3000 by default.

#### Step 3: Use a Process Manager (PM2)

For production deployment on a server:

```bash
npm install -g pm2
pm2 start npm --name "business-solution" -- run start
pm2 save
pm2 startup
```

## Post-Deployment Checklist

After deployment, verify:

- [ ] Application loads correctly
- [ ] Authentication works
- [ ] AI features function (if API key is configured)
- [ ] Payment processing works (if Stripe is configured)
- [ ] All pages are accessible
- [ ] Responsive design works on mobile devices
- [ ] Environment variables are properly set

## Troubleshooting

### Build Failures

- Check that all dependencies are installed
- Verify Node.js version is 18+
- Ensure all environment variables are set correctly

### Runtime Errors

- Check browser console for JavaScript errors
- Verify API endpoints are working
- Confirm environment variables are accessible

### Performance Issues

- Enable caching headers
- Optimize images
- Use CDN for static assets

## Security Considerations

- Never commit API keys to version control
- Use HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities

## Support

If you encounter issues during deployment:

1. Check the deployment platform's documentation
2. Review the application logs
3. Open an issue in the GitHub repository
4. Contact the development team

## Continuous Deployment

For automatic deployments on code changes:

1. Connect your repository to the deployment platform
2. Configure the platform to watch the main branch
3. Set up environment variables in the platform's dashboard
4. Push changes to trigger automatic deployments

This ensures your application stays up-to-date with the latest changes.
