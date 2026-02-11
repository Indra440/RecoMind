'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Dummy business data
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
    monthlyLimit: -1, // Unlimited
    usedThisMonth: 125678
  }
]

export default function BusinessPage() {
  const router = useRouter()
  const [businesses, setBusinesses] = useState(DUMMY_BUSINESSES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    description: '',
    website: ''
  })

  const handleAddBusiness = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Add new business (UI only - no backend)
    const business = {
      id: String(businesses.length + 1),
      name: newBusiness.name,
      plan: 'Free',
      status: 'Active',
      recommendations: 0,
      createdDate: new Date().toISOString().split('T')[0],
      description: newBusiness.description,
      website: newBusiness.website,
      apiKey: `biz_live_${Math.random().toString(36).substring(7)}`,
      monthlyLimit: 1000,
      usedThisMonth: 0
    }
    
    setBusinesses([...businesses, business])
    setIsModalOpen(false)
    setNewBusiness({ name: '', description: '', website: '' })
    
    // Store in localStorage for the detail page to access
    const allBusinesses = [...businesses, business]
    localStorage.setItem('businesses', JSON.stringify(allBusinesses))
  }

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Free': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'Pro': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Enterprise': return 'bg-purple-100 text-purple-800 border-purple-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getUsagePercentage = (business: any) => {
    if (business.monthlyLimit === -1) return 0 // Unlimited
    return Math.min((business.usedThisMonth / business.monthlyLimit) * 100, 100)
  }

  // Store businesses in localStorage on component mount
  useState(() => {
    localStorage.setItem('businesses', JSON.stringify(businesses))
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              My Businesses
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your registered businesses and their AI recommendation systems
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Business</span>
          </button>
        </div>

        {/* Business Cards Grid */}
        {businesses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16 px-6">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No businesses yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first business</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Business</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-500">Since {business.createdDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    business.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {business.status}
                  </span>
                </div>

                {/* Plan Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${getPlanColor(business.plan)}`}>
                    {business.plan} Plan
                  </span>
                </div>

                {/* Usage Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Usage this month</span>
                    <span className="font-semibold text-gray-900">
                      {business.usedThisMonth.toLocaleString()}
                      {business.monthlyLimit !== -1 && ` / ${business.monthlyLimit.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        getUsagePercentage(business) > 90 ? 'bg-red-500' :
                        getUsagePercentage(business) > 75 ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${business.monthlyLimit === -1 ? 50 : getUsagePercentage(business)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Total Recommendations</span>
                    <span className="font-semibold text-gray-900">
                      {business.recommendations.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    href={`/dashboard/business/${business.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Business Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Business</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddBusiness} className="space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome Store"
                    value={newBusiness.name}
                    onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your business"
                    value={newBusiness.description}
                    onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    id="website"
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                    value={newBusiness.website}
                    onChange={(e) => setNewBusiness({ ...newBusiness, website: e.target.value })}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your business will start with a Free plan. 
                    You can upgrade anytime from the business details.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                  >
                    Add Business
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}