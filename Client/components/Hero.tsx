'use client';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Transform Your Business
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              with AI Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to automate workflows,
            gain insights, and accelerate growth. Join thousands of companies
            already transforming their business.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="#plans"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-100">Active Users</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-100">Uptime SLA</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-100">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
