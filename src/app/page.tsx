import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Brands with
            <span className="block text-black">Authentic Influencers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our AI-powered platform matches brands with the perfect influencers and ushers 
            for impactful campaigns that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black hover:bg-gray-800">
              <a href="/auth/register">Get Started</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/chatbot">Try AI Assistant</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to run successful influencer campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered Matching */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">AI-Powered Matching</CardTitle>
                <CardDescription>
                  Our advanced AI analyzes campaign objectives and matches you with the perfect influencers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Smart recommendation engine</li>
                  <li>• Engagement prediction</li>
                  <li>• ROI forecasting</li>
                </ul>
              </CardContent>
            </Card>

            {/* Profile Verification */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Profile Verification</CardTitle>
                <CardDescription>
                  Automated verification system ensures authentic influencer profiles and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Social media validation</li>
                  <li>• Engagement authenticity</li>
                  <li>• Performance tracking</li>
                </ul>
              </CardContent>
            </Card>

            {/* Campaign Management */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Campaign Management</CardTitle>
                <CardDescription>
                  Complete campaign lifecycle management from creation to performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Campaign tracking</li>
                  <li>• Real-time analytics</li>
                  <li>• Performance reports</li>
                </ul>
              </CardContent>
            </Card>

            {/* Secure Payments */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Secure Payments</CardTitle>
                <CardDescription>
                  Integrated payment system with subscription management and secure transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Multiple payment gateways</li>
                  <li>• Subscription tiers</li>
                  <li>• Invoice generation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Analytics Dashboard */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Analytics Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics and insights for data-driven campaign decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Performance metrics</li>
                  <li>• Audience insights</li>
                  <li>• ROI analysis</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="border-2 hover:border-gray-300 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">AI Assistant</CardTitle>
                <CardDescription>
                  24/7 AI-powered support for platform guidance and campaign optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Instant support</li>
                  <li>• Campaign guidance</li>
                  <li>• Best practices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform caters to different user types with specialized features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <CardTitle>Influencers</CardTitle>
                <CardDescription>
                  Content creators looking to monetize their audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a href="/auth/register?role=influencer">Join as Influencer</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <CardTitle>Ushers</CardTitle>
                <CardDescription>
                  Event professionals and brand ambassadors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a href="/auth/register?role=usher">Join as Usher</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <CardTitle>Brands</CardTitle>
                <CardDescription>
                  Companies seeking authentic marketing partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a href="/auth/register?role=seeker">Start Campaign</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <CardTitle>Admins</CardTitle>
                <CardDescription>
                  Platform administrators managing operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <a href="/dashboard">Admin Portal</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of brands and influencers already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <a href="/auth/register">Get Started Free</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <a href="/chatbot">Talk to AI Assistant</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
