import { useState } from 'react';
import { Link } from 'react-router-dom';
import useQuotationAI from '../hooks/useQuotationAI';
import QuotationForm from './QuotationForm';
import QuotationDisplay from './QuotationDisplay';
import SampleExamples from './SampleExamples';
import LoadingSpinner from './LoadingSpinner';
import StatsPanel from './StatsPanel';

function QuotationTool() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [selectedExample, setSelectedExample] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Home
          </Link>
          
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              QuotationAI ⚡
            </h1>
            <p className="text-gray-600">
              Generate professional quotations instantly with AI
            </p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
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
        </footer>
      </div>

      {/* Floating Stats Panel */}
      <StatsPanel />
    </div>
  );
}

export default QuotationTool;