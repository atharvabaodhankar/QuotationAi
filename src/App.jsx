import { useState } from 'react'
import useQuotationAI from './hooks/useQuotationAI'
import QuotationForm from './components/QuotationForm'
import QuotationDisplay from './components/QuotationDisplay'
import SampleExamples from './components/SampleExamples'
import LoadingSpinner from './components/LoadingSpinner'
import StatsPanel from './components/StatsPanel'

function App() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [selectedExample, setSelectedExample] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            QuotationAI ⚡
          </h1>
          <p className="text-gray-600">
            Free & Open Source AI-powered quotation generator
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Generate professional project quotations instantly
          </p>
        </div>

        {/* Sample Examples */}
        <SampleExamples 
          onSelectExample={setSelectedExample} 
          loading={loading} 
        />

        {/* Form */}
        <QuotationForm 
          onGenerate={generateQuote} 
          loading={loading} 
          initialValue={selectedExample}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Quotation Display */}
        {!loading && <QuotationDisplay quote={quote} />}

        {/* Footer */}
        <footer className="text-center mt-12 py-6 text-gray-500 text-sm">
          <p>🚀 Free & Open Source • Powered by Google Gemini AI</p>
          <p className="mt-1">Built with React + Tailwind CSS • No signup required</p>
          <div className="mt-2">
            <a 
              href="https://github.com/yourusername/quotationai" 
              className="text-blue-600 hover:text-blue-800 mx-2"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-800 mx-2"
            >
              Documentation
            </a>
          </div>
        </footer>
      </div>

      {/* Floating Stats Panel */}
      <StatsPanel />
    </div>
  )
}

export default App
