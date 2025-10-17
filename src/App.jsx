import useQuotationAI from './hooks/useQuotationAI'
import QuotationForm from './components/QuotationForm'
import QuotationDisplay from './components/QuotationDisplay'

function App() {
  const { loading, quote, error, generateQuote } = useQuotationAI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            QuotationAI ⚡
          </h1>
          <p className="text-gray-600">
            Generate professional quotations instantly with AI
          </p>
        </div>

        {/* Form */}
        <QuotationForm onGenerate={generateQuote} loading={loading} />

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Quotation Display */}
        <QuotationDisplay quote={quote} />
      </div>
    </div>
  )
}

export default App
