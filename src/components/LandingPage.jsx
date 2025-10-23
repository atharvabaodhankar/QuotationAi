import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-4">
              <span className="text-2xl font-bold">Q</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            QuotationAI
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Free & Open Source AI-powered quotation generator
          </p>
          <p className="text-gray-500">
            Generate professional project quotations instantly using Google Gemini AI
          </p>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Stop wasting time on manual quotations
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your project requirements into professional, detailed quotations in seconds. 
              No signup required, completely free, and open source.
            </p>
            
            <Link 
              to="/tool" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">🚀</span>
              Try QuotationAI Now
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Why Choose QuotationAI?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h4>
              <p className="text-gray-600">Generate detailed quotations in seconds, not hours. AI-powered efficiency at its best.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Professional Quality</h4>
              <p className="text-gray-600">Get industry-standard quotations with detailed breakdowns, timelines, and pricing.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔓</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Completely Free</h4>
              <p className="text-gray-600">No hidden costs, no subscriptions, no signup required. Open source and free forever.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h4>
              <p className="text-gray-600">Simple interface - just describe your project and get a professional quotation instantly.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Mobile Friendly</h4>
              <p className="text-gray-600">Works perfectly on all devices - desktop, tablet, or mobile. Generate quotes anywhere.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Open Source</h4>
              <p className="text-gray-600">Built by developers, for developers. Contribute, customize, and make it your own.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to streamline your quotation process?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals who trust QuotationAI for their project quotations.
          </p>
          <Link 
            to="/tool" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started - It's Free!
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-200">
          <p className="mb-2">🚀 Free & Open Source • Powered by Google Gemini AI</p>
          <p className="mb-4">Built with React + Tailwind CSS • No signup required</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/yourusername/quotationai" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Documentation
            </a>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Report Issues
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;