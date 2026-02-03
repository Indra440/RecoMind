'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountPage() {
  const { user, updatePlan } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const planDetails: Record<string, { name: string; price: string; color: string }> = {
    free: { name: 'Free Plan', price: '$0/month', color: 'bg-gray-100 text-gray-800' },
    basic: { name: 'Basic Plan', price: '$29/month', color: 'bg-blue-100 text-blue-800' },
    pro: { name: 'Pro Plan', price: '$99/month', color: 'bg-purple-100 text-purple-800' },
    enterprise: { name: 'Enterprise Plan', price: 'Custom', color: 'bg-indigo-100 text-indigo-800' },
  };

  const currentPlan = user.plan || 'free';
  const details = planDetails[currentPlan];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your subscription and account settings</p>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Full Name
              </label>
              <div className="text-lg font-semibold text-gray-900">{user.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Address
              </label>
              <div className="text-lg font-semibold text-gray-900">{user.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                User ID
              </label>
              <div className="text-lg font-semibold text-gray-900 font-mono">
                {user.id}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Account Status
              </label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Subscription</h2>
          
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">{details.name}</h3>
                <p className="text-indigo-100">Your active subscription plan</p>
              </div>
              <div className={`px-4 py-2 rounded-lg ${details.color} font-semibold`}>
                {details.price}
              </div>
            </div>
            
            <div className="border-t border-indigo-400 pt-4">
              <p className="text-sm text-indigo-100">
                {currentPlan === 'free' 
                  ? 'Upgrade to unlock more features and increase your limits'
                  : 'Thank you for being a valued customer!'}
              </p>
            </div>
          </div>

          {/* Plan Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPlan === 'free' && (
                <>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">10 AI requests per day</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Basic analytics</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Email support</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">1 project</span>
                  </div>
                </>
              )}
              {currentPlan === 'basic' && (
                <>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">1,000 AI requests per day</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Advanced analytics</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">API access</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Up to 5 projects</span>
                  </div>
                </>
              )}
              {currentPlan === 'pro' && (
                <>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Unlimited AI requests</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Real-time analytics</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">24/7 priority support</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Custom AI models</span>
                  </div>
                </>
              )}
              {currentPlan === 'enterprise' && (
                <>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Everything in Pro</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">On-premise deployment</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">SLA guarantee</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Upgrade Options */}
          {currentPlan !== 'enterprise' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Want more features?
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade your plan to unlock additional features and capabilities.
              </p>
              <a
                href="/#plans"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
              >
                View All Plans
              </a>
            </div>
          )}
        </div>

        {/* Usage Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {currentPlan === 'free' ? '10' : currentPlan === 'basic' ? '1,000' : '∞'}
              </div>
              <div className="text-sm text-gray-600">Daily API Requests</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {currentPlan === 'free' ? '1' : currentPlan === 'basic' ? '5' : '∞'}
              </div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Service Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
