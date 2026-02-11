'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Free',
    price: 0,
    recommendations: '1,000',
    features: ['1 business profile', 'Basic analytics', 'Community support'],
    color: 'gray'
  },
  {
    name: 'Pro',
    price: 49,
    recommendations: '50,000',
    features: ['5 business profiles', 'Advanced analytics', 'Priority support', 'API access'],
    color: 'blue',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    recommendations: 'Unlimited',
    features: ['Unlimited profiles', 'Custom AI training', 'Dedicated support', 'SLA guarantee'],
    color: 'purple'
  }
]

// Dummy business data - in a real app, this would come from an API
const DUMMY_BUSINESSES = [
  {
    id: '1',
    name: 'TechStyle E-commerce',
    plan: 'Pro',
    status: 'Active',
    recommendations: 45230,
    createdDate: '2024-01-15',
    description: 'Leading fashion e-commerce platform',
    website: 'https://techstyle.com',
    apiKey: 'ts_live_abc123xyz789',
    monthlyLimit: 50000,
    usedThisMonth: 45230
  },
  {
    id: '2',
    name: 'FitGear Online Store',
    plan: 'Free',
    status: 'Active',
    recommendations: 843,
    createdDate: '2024-02-20',
    description: 'Fitness equipment and apparel store',
    website: 'https://fitgear.com',
    apiKey: 'fg_live_def456uvw123',
    monthlyLimit: 1000,
    usedThisMonth: 843
  },
  {
    id: '3',
    name: 'BookWorm Library',
    plan: 'Enterprise',
    status: 'Active',
    recommendations: 125678,
    createdDate: '2023-11-05',
    description: 'Online bookstore and digital library',
    website: 'https://bookworm.com',
    apiKey: 'bw_live_ghi789rst456',
    monthlyLimit: -1,
    usedThisMonth: 125678
  }
]

export default function BusinessDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch from API
    // For now, get from localStorage or dummy data
    const storedBusinesses = localStorage.getItem('businesses')
    const businesses = storedBusinesses ? JSON.parse(storedBusinesses) : DUMMY_BUSINESSES
    
    const foundBusiness = businesses.find((b: any) => b.id === params.id)
    
    if (foundBusiness) {
      setBusiness(foundBusiness)
    }
    setLoading(false)
  }, [params.id])

  const handleChangePlan = (planName: string) => {
    if (business) {
      const updatedBusiness = {
        ...business,
        plan: planName,
        monthlyLimit: planName === 'Free' ? 1000 : planName === 'Pro' ? 50000 : -1
      }
      
      // Update localStorage
      const storedBusinesses = localStorage.getItem('businesses')
      const businesses = storedBusinesses ? JSON.parse(storedBusinesses) : DUMMY_BUSINESSES
      const updatedBusinesses = businesses.map((b: any) => 
        b.id === business.id ? updatedBusiness : b
      )
      localStorage.setItem('businesses', JSON.stringify(updatedBusinesses))
      
      setBusiness(updatedBusiness)
    }
  }

  const getUsagePercentage = () => {
    if (!business || business.monthlyLimit === -1) return 50 // Unlimited
    return Math.min((business.usedThisMonth / business.monthlyLimit) * 100, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Not Found</h2>
          <p className="text-gray-600 mb-6">The business you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard/business"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Back to Businesses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link 
            href="/dashboard/business"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Businesses
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {business.name}
              </h1>
              <p className="text-gray-600 text-lg">Business ID: {business.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              business.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {business.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Business Info & Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Description</span>
                  <span className="text-gray-900 font-semibold text-right">{business.description}</span>
                </div>
                <div className="flex items-start justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Website</span>
                  <a 
                    href={business.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {business.website}
                  </a>
                </div>
                <div className="flex items-start justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Created Date</span>
                  <span className="text-gray-900 font-semibold">{business.createdDate}</span>
                </div>
                <div className="flex items-start justify-between py-3">
                  <span className="text-gray-600 font-medium">API Key</span>
                  <div className="flex items-center space-x-2">
                    <code className="font-mono text-sm bg-gray-100 px-3 py-1.5 rounded border border-gray-300">
                      {business.apiKey}
                    </code>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Plan</h2>
              <div className={`rounded-xl p-6 border-2 ${
                business.plan === 'Free' ? 'border-gray-300 bg-gray-50' :
                business.plan === 'Pro' ? 'border-blue-300 bg-blue-50' :
                'border-purple-300 bg-purple-50'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{business.plan}</h3>
                    <p className="text-gray-600 text-lg">
                      {business.monthlyLimit === -1 
                        ? 'Unlimited recommendations' 
                        : `${business.monthlyLimit.toLocaleString()} recommendations/month`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">
                      {business.plan === 'Free' ? '$0' : 
                       business.plan === 'Pro' ? '$49' : 
                       'Custom'}
                    </p>
                    {business.plan !== 'Enterprise' && <p className="text-sm text-gray-600">/month</p>}
                  </div>
                </div>
                
                {/* Usage Statistics */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Usage this month</span>
                    <span className="font-bold text-gray-900">
                      {business.usedThisMonth.toLocaleString()}
                      {business.monthlyLimit !== -1 && ` / ${business.monthlyLimit.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all ${
                        getUsagePercentage() > 90 ? 'bg-red-500' :
                        getUsagePercentage() > 75 ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${business.monthlyLimit === -1 ? 50 : getUsagePercentage()}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-300">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Recommendations</p>
                      <p className="text-2xl font-bold text-gray-900">{business.recommendations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Remaining</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {business.monthlyLimit === -1 
                          ? '∞' 
                          : (business.monthlyLimit - business.usedThisMonth).toLocaleString()
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Available Plans */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Plan</h2>
              <div className="space-y-4">
                {PLANS.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      business.plan === plan.name
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {plan.popular && business.plan !== plan.name && (
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                        ⭐ Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                      {typeof plan.price === 'number' && <span className="text-sm text-gray-600">/mo</span>}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{plan.recommendations} recommendations</p>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {business.plan === plan.name ? (
                      <button 
                        disabled
                        className="w-full bg-gray-300 text-gray-600 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleChangePlan(plan.name)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
                      >
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Switch to ' + plan.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}