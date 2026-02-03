'use client';

import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

interface Plan {
  name: 'free' | 'basic' | 'pro' | 'enterprise';
  displayName: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'free',
    displayName: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI',
    features: [
      '10 AI requests per day',
      'Basic analytics',
      'Email support',
      'Access to community',
      '1 project',
    ],
  },
  {
    name: 'basic',
    displayName: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Great for small teams and projects',
    features: [
      '1,000 AI requests per day',
      'Advanced analytics',
      'Priority email support',
      'API access',
      'Up to 5 projects',
      'Custom integrations',
      'Data export',
    ],
  },
  {
    name: 'pro',
    displayName: 'Pro',
    price: '$99',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      'Unlimited AI requests',
      'Real-time analytics',
      '24/7 priority support',
      'Advanced API access',
      'Unlimited projects',
      'Custom AI models',
      'Team collaboration',
      'White-label options',
      'Advanced security',
    ],
    popular: true,
  },
  {
    name: 'enterprise',
    displayName: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom AI training',
      'On-premise deployment',
      'SLA guarantee',
      'Advanced compliance',
      'Custom integrations',
      'Unlimited team members',
      'Priority feature requests',
    ],
  },
];

export default function Plans() {
  const { user, updatePlan } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleSelectPlan = (planName: 'basic' | 'pro' | 'enterprise') => {
    if (!user) {
      setSelectedPlan(planName);
      setShowAuthPrompt(true);
    } else {
      updatePlan(planName);
      alert(`Successfully subscribed to ${planName} plan!`);
    }
  };

  return (
    <section id="plans" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Scale up or down anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'ring-4 ring-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.displayName}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.name === 'free' ? (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleSelectPlan(plan.name as 'basic' | 'pro' | 'enterprise')
                    }
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } ${
                      user?.plan === plan.name ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={user?.plan === plan.name}
                  >
                    {user?.plan === plan.name ? 'Current Plan' : 'Get Started'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Auth Prompt Modal */}
        {showAuthPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Login Required
              </h3>
              <p className="text-gray-600 mb-6">
                Please login or create an account to subscribe to the {selectedPlan}{' '}
                plan.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowAuthPrompt(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
