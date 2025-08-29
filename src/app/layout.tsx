import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Influencer & Usher Platform',
  description: 'Connect brands with influencers and ushers for impactful campaigns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          {/* Navigation Header */}
          <nav className="bg-black text-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link href="/" className="text-xl font-bold">
                    Influencer Platform
                  </Link>
                </div>
                
                {/* Navigation Links */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    <Link href="/" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Home
                    </Link>
                    <Link href="/auth/login" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Login
                    </Link>
                    <Link href="/auth/register" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Register
                    </Link>
                    <Link href="/profile" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Profile
                    </Link>
                    <Link href="/campaign-request" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Campaigns
                    </Link>
                    <Link href="/dashboard" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/subscriptions" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Subscriptions
                    </Link>
                    <Link href="/chatbot" className="bg-white text-black hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      AI Assistant
                    </Link>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="hover:bg-gray-800 p-2 rounded-md">
                    <span className="sr-only">Open main menu</span>
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                      <span className="block w-5 h-0.5 bg-white mb-1"></span>
                      <span className="block w-5 h-0.5 bg-white mb-1"></span>
                      <span className="block w-5 h-0.5 bg-white"></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2024 Influencer & Usher Platform. All rights reserved.</p>
                <p className="mt-2 text-sm">Connecting brands with authentic voices</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
