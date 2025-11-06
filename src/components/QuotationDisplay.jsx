import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  ChevronDown,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Settings,
  Loader,
  Sparkles,
} from "lucide-react";
import ExportButton from "./ExportButton";
import useCurrencyConverter from "../hooks/useCurrencyConverter";
import { GoogleGenerativeAI } from "@google/generative-ai";

function QuotationDisplay({ quote }) {
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    breakdown: true,
    timeline: false,
  });
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const { convertCurrency, rates } = useCurrencyConverter();

  // Generate AI-powered app name suggestions
  const generateAIAppNameSuggestions = async () => {
    setLoadingSuggestions(true);
    
    const prompt = `You are a creative app naming expert. Based on the following project description, generate exactly 6 unique, catchy, and professional app names with short descriptions.

Project Description: "${currentQuote.clientRequirementSummary}"

Requirements:
- Names should be modern, memorable, and relevant to the project
- Each name should be 1-2 words, easy to pronounce
- Avoid generic names like "App", "System", "Platform" at the end
- Make them brandable and unique
- Include a brief 3-5 word description for each

Return ONLY a JSON array in this exact format:
[
  {"name": "AppName1", "desc": "Brief description here"},
  {"name": "AppName2", "desc": "Brief description here"},
  {"name": "AppName3", "desc": "Brief description here"},
  {"name": "AppName4", "desc": "Brief description here"},
  {"name": "AppName5", "desc": "Brief description here"},
  {"name": "AppName6", "desc": "Brief description here"}
]`;

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean the response text to extract JSON
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const suggestions = JSON.parse(cleanText);
      
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to generate AI suggestions:", error);
      // Fallback to a few generic suggestions if AI fails
      setAiSuggestions([
        { name: "AppCraft", desc: "Custom application solution" },
        { name: "DigitalEdge", desc: "Modern digital platform" },
        { name: "SmartFlow", desc: "Intelligent workflow system" },
        { name: "ProActive", desc: "Professional productivity tool" },
        { name: "InnovateLab", desc: "Innovation-driven platform" },
        { name: "TechCore", desc: "Technology foundation" },
      ]);
    }
    
    setLoadingSuggestions(false);
  };

  if (!quote) return null;

  // Extract numeric value from price strings
  const extractPrice = (priceStr) => {
    const match = priceStr.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  };

  const totalOriginal = extractPrice(quote.totalCost);
  const discountAmount = (totalOriginal * discount) / 100;
  const finalTotal = totalOriginal - discountAmount;

  // Currency conversion using real-time rates
  const formatCurrency = (amount) => convertCurrency(amount, currency);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row justify-between gap-4 items-start"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-gray-800 font-display">
                Your Project Quotation
              </h1>
              <p className="text-base font-normal leading-normal text-gray-500">
                For Project: {currentQuote.projectTitle}
                {(currentQuote.projectTitle.includes("To be decided") ||
                  currentQuote.projectTitle.includes("TBD")) && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Name pending
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 size={16} />
                Share
              </motion.button>
              <motion.button
                className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors ${
                  currentQuote.projectTitle.includes("To be decided") ||
                  currentQuote.projectTitle.includes("TBD")
                    ? "text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 animate-pulse"
                    : "text-orange-600 bg-orange-50 border border-orange-200 hover:bg-orange-100"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  setShowNameSuggestions(true);
                  if (aiSuggestions.length === 0) {
                    await generateAIAppNameSuggestions();
                  }
                }}
              >
                <Sparkles size={16} />
                {currentQuote.projectTitle.includes("To be decided") ||
                currentQuote.projectTitle.includes("TBD")
                  ? "Choose App Name"
                  : "Suggest Names"}
              </motion.button>
              <motion.button
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-primary rounded-lg shadow-sm hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  console.log("PDF download clicked!");

                  // Extract numeric value from price strings
                  const extractPrice = (priceStr) => {
                    const match = priceStr.match(/[\d,]+/);
                    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
                  };

                  const totalOriginal = extractPrice(quote.totalCost);
                  const discountAmount = (totalOriginal * discount) / 100;
                  const finalTotal = totalOriginal - discountAmount;

                  // Currency formatting for PDF
                  const formatPDFCurrency = (amount) => {
                    const converted = amount * (rates[currency] || 1);
                    const currencyNames = {
                      INR: "Rs",
                      USD: "USD",
                      EUR: "EUR",
                      GBP: "GBP",
                    };
                    return `${currencyNames[currency]} ${Math.round(
                      converted
                    ).toLocaleString()}`;
                  };

                  try {
                    console.log("Attempting to import jsPDF...");
                    const jsPDFModule = await import("jspdf");
                    console.log("jsPDF module imported:", jsPDFModule);

                    const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;
                    console.log("jsPDF constructor:", jsPDF);

                    if (!jsPDF) {
                      throw new Error("jsPDF constructor not found");
                    }

                    const doc = new jsPDF();
                    console.log("jsPDF document created");

                    // Header with background
                    doc.setFillColor(255, 71, 66); // Red background
                    doc.rect(0, 0, 210, 40, "F");

                    doc.setTextColor(255, 255, 255); // White text
                    doc.setFontSize(24);
                    doc.setFont(undefined, "bold");
                    doc.text("PROJECT QUOTATION", 20, 25);

                    // Reset colors
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, "normal");

                    let yPos = 60;

                    // Project Title
                    doc.setFontSize(18);
                    doc.setFont(undefined, "bold");
                    doc.text(currentQuote.projectTitle, 20, yPos);
                    yPos += 15;

                    // Project details in a nice layout
                    doc.setFontSize(12);
                    doc.setFont(undefined, "normal");

                    // Create info boxes
                    const boxWidth = 55;
                    const boxHeight = 25;

                    // Duration box
                    doc.setFillColor(248, 249, 250);
                    doc.rect(20, yPos, boxWidth, boxHeight, "F");
                    doc.setFont(undefined, "bold");
                    doc.text("Duration", 22, yPos + 8);
                    doc.setFont(undefined, "normal");
                    doc.text(quote.estimatedDuration, 22, yPos + 16);

                    // Total cost box
                    doc.setFillColor(248, 249, 250);
                    doc.rect(80, yPos, boxWidth, boxHeight, "F");
                    doc.setFont(undefined, "bold");
                    doc.text("Total Investment", 82, yPos + 8);
                    doc.setFont(undefined, "normal");
                    doc.setFontSize(14);
                    doc.setTextColor(255, 71, 66);
                    doc.text(formatPDFCurrency(finalTotal), 82, yPos + 18);
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(12);

                    // Date box
                    doc.setFillColor(248, 249, 250);
                    doc.rect(140, yPos, boxWidth, boxHeight, "F");
                    doc.setFont(undefined, "bold");
                    doc.text("Generated", 142, yPos + 8);
                    doc.setFont(undefined, "normal");
                    doc.text(new Date().toLocaleDateString(), 142, yPos + 16);

                    yPos += 40;

                    // Client Requirements Section
                    doc.setFontSize(16);
                    doc.setFont(undefined, "bold");
                    doc.setTextColor(255, 71, 66);
                    doc.text("Project Overview", 20, yPos);
                    doc.setTextColor(0, 0, 0);
                    yPos += 10;

                    doc.setFontSize(11);
                    doc.setFont(undefined, "normal");
                    const reqLines = doc.splitTextToSize(
                      quote.clientRequirementSummary,
                      170
                    );
                    doc.text(reqLines, 20, yPos);
                    yPos += reqLines.length * 6 + 15;

                    // Services Section
                    doc.setFontSize(16);
                    doc.setFont(undefined, "bold");
                    doc.setTextColor(255, 71, 66);
                    doc.text("Service Breakdown", 20, yPos);
                    doc.setTextColor(0, 0, 0);
                    yPos += 15;

                    // Services table header
                    doc.setFillColor(240, 240, 240);
                    doc.rect(20, yPos - 5, 170, 12, "F");
                    doc.setFontSize(10);
                    doc.setFont(undefined, "bold");
                    doc.text("SERVICE", 22, yPos + 2);
                    doc.text("PRICE", 160, yPos + 2);
                    yPos += 15;

                    doc.setFont(undefined, "normal");
                    quote.services.forEach((service, index) => {
                      if (yPos > 250) {
                        doc.addPage();
                        yPos = 30;
                      }

                      // Service name
                      doc.setFontSize(11);
                      doc.setFont(undefined, "bold");
                      doc.text(`${index + 1}. ${service.name}`, 22, yPos);

                      // Price aligned right
                      doc.setFont(undefined, "bold");
                      doc.setTextColor(255, 71, 66);
                      doc.text(
                        formatPDFCurrency(extractPrice(service.price)),
                        185,
                        yPos,
                        { align: "right" }
                      );
                      doc.setTextColor(0, 0, 0);
                      yPos += 8;

                      // Service description
                      doc.setFontSize(10);
                      doc.setFont(undefined, "normal");
                      doc.setTextColor(100, 100, 100);
                      const descLines = doc.splitTextToSize(
                        service.description,
                        160
                      );
                      doc.text(descLines, 25, yPos);
                      doc.setTextColor(0, 0, 0);
                      yPos += descLines.length * 5 + 10;

                      // Add separator line
                      doc.setDrawColor(230, 230, 230);
                      doc.line(20, yPos - 5, 190, yPos - 5);
                    });

                    // Pricing Summary
                    if (yPos > 230) {
                      doc.addPage();
                      yPos = 30;
                    }

                    yPos += 15;
                    doc.setFillColor(248, 249, 250);
                    doc.rect(120, yPos, 70, discount > 0 ? 35 : 25, "F");

                    // Subtotal
                    doc.setFontSize(11);
                    doc.setFont(undefined, "normal");
                    doc.text("Subtotal:", 125, yPos + 8);
                    doc.text(formatPDFCurrency(totalOriginal), 185, yPos + 8, {
                      align: "right",
                    });

                    // Discount if applicable
                    if (discount > 0) {
                      doc.setTextColor(34, 197, 94); // Green color
                      doc.text(`Discount (${discount}%):`, 125, yPos + 16);
                      doc.text(
                        `-${formatPDFCurrency(discountAmount)}`,
                        185,
                        yPos + 16,
                        { align: "right" }
                      );
                      doc.setTextColor(0, 0, 0);
                      yPos += 8;
                    }

                    // Total
                    doc.setFont(undefined, "bold");
                    doc.setFontSize(12);
                    doc.setTextColor(255, 71, 66);
                    doc.text("Total:", 125, yPos + 16);
                    doc.text(formatPDFCurrency(finalTotal), 185, yPos + 16, {
                      align: "right",
                    });
                    doc.setTextColor(0, 0, 0);

                    // Footer
                    yPos += 35;
                    doc.setFillColor(248, 249, 250);
                    doc.rect(20, yPos - 5, 170, 25, "F");
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text(
                      "Generated by QuotationAI • Professional Quotation System",
                      22,
                      yPos + 5
                    );
                    doc.text(
                      `Valid for 30 days from ${new Date().toLocaleDateString()}`,
                      22,
                      yPos + 12
                    );
                    doc.text(
                      `Currency: ${currency} • All prices are inclusive of applicable taxes`,
                      22,
                      yPos + 19
                    );

                    // Save the PDF
                    console.log("Saving PDF...");
                    doc.save(
                      `quotation-${quote.projectTitle
                        .toLowerCase()
                        .replace(/\s+/g, "-")}.pdf`
                    );
                    console.log("PDF downloaded successfully!");
                  } catch (error) {
                    console.error("PDF generation failed:", error);
                    console.error("Error stack:", error.stack);

                    // Fallback to text download
                    const quotationText = `
PROFESSIONAL QUOTATION
======================

Project: ${quote.projectTitle}
Duration: ${quote.estimatedDuration}
Total Cost: ${quote.totalCost}

Client Requirements:
${quote.clientRequirementSummary}

Services Breakdown:
${quote.services
  .map(
    (service, index) =>
      `${index + 1}. ${service.name} - ${service.price}
   ${service.description}`
  )
  .join("\n\n")}

${quote.notes ? `\nAdditional Notes:\n${quote.notes}` : ""}

Generated by QuotationAI
Date: ${new Date().toLocaleDateString()}
                    `;

                    const blob = new Blob([quotationText], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `quotation-${quote.projectTitle
                      .toLowerCase()
                      .replace(/\s+/g, "-")}.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                    console.log("Fallback: Text file downloaded instead");
                  }
                }}
              >
                <Download size={16} />
                Download PDF
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                <p className="text-sm font-medium leading-normal text-gray-600">
                  Total Price
                </p>
              </div>
              <p className="text-2xl font-bold leading-tight text-gray-800">
                {formatCurrency(finalTotal)}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                <p className="text-sm font-medium leading-normal text-gray-600">
                  Estimated Timeline
                </p>
              </div>
              <p className="text-2xl font-bold leading-tight text-gray-800">
                {quote.estimatedDuration}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                <p className="text-sm font-medium leading-normal text-gray-600">
                  Quote Validity
                </p>
              </div>
              <p className="text-2xl font-bold leading-tight text-gray-800">
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </motion.div>
          </motion.div>

          {/* Accordion Sections */}
          <div className="flex flex-col gap-4">
            {/* Project Overview */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white shadow-sm"
              variants={itemVariants}
            >
              <motion.button
                className="w-full p-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("overview")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <h2 className="text-lg font-bold leading-tight text-gray-800 font-display">
                  Project Overview
                </h2>
                <motion.div
                  animate={{ rotate: expandedSections.overview ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSections.overview && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-gray-600 space-y-3">
                      <p>{quote.clientRequirementSummary}</p>
                      {quote.notes && (
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-blue-800">
                            <strong>Additional Notes:</strong> {quote.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Service Breakdown */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white shadow-sm"
              variants={itemVariants}
            >
              <motion.button
                className="w-full p-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("breakdown")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <h2 className="text-lg font-bold leading-tight text-gray-800 font-display">
                  Detailed Service Breakdown
                </h2>
                <motion.div
                  animate={{ rotate: expandedSections.breakdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSections.breakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {quote.services.map((service, index) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-start">
                                    <CheckCircle
                                      size={16}
                                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                                    />
                                    <div>
                                      <div className="text-sm font-medium text-gray-800">
                                        {service.name}
                                      </div>
                                      <div className="text-sm text-gray-600 mt-1">
                                        {service.description}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                                  {formatCurrency(extractPrice(service.price))}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Timeline & Terms */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white shadow-sm"
              variants={itemVariants}
            >
              <motion.button
                className="w-full p-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("timeline")}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <h2 className="text-lg font-bold leading-tight text-gray-800 font-display">
                  Timeline & Terms
                </h2>
                <motion.div
                  animate={{ rotate: expandedSections.timeline ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSections.timeline && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-gray-600 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Project Timeline
                        </h3>
                        <p>Estimated completion: {quote.estimatedDuration}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Payment Terms
                        </h3>
                        <p>
                          50% upfront to commence work, 50% upon project
                          completion and final delivery.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <motion.aside
          className="lg:col-span-1 space-y-6"
          variants={itemVariants}
        >
          {/* Configuration Panel */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={20} className="text-gray-600" />
              <h3 className="text-base font-bold text-gray-800">
                Configuration
              </h3>
            </div>

            {/* Currency Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="block w-full px-3 py-2 text-base border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg transition-colors"
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            {/* Discount Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply Discount
              </label>
              <select
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="block w-full px-3 py-2 text-base border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg transition-colors"
              >
                <option value={0}>No Discount</option>
                <option value={5}>5% Off</option>
                <option value={10}>10% Off</option>
                <option value={15}>15% Off</option>
                <option value={20}>20% Off</option>
              </select>
            </div>

            {/* Applied Discounts */}
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 p-3 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-green-800">
                    Discount Applied (-{discount}%)
                  </div>
                  <CheckCircle size={16} className="text-green-600" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Price Summary */}
          <motion.div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3"
            whileHover={{ boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(totalOriginal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount ({discount}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>
          </motion.div>

          {/* Export Buttons */}
          <ExportButton quote={quote} discount={discount} currency={currency} />
        </motion.aside>
      </div>

      {/* App Name Suggestions Modal */}
      <AnimatePresence>
        {showNameSuggestions && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNameSuggestions(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  ✨ AI-Generated App Names for Your Project
                </h3>
                <p className="text-gray-600">
                  Choose a name that captures your app's essence
                </p>
              </div>

              {loadingSuggestions ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <Loader size={32} className="text-red-500" />
                  </motion.div>
                  <p className="text-gray-600 mb-2">AI is crafting perfect names...</p>
                  <p className="text-sm text-gray-500">This may take a few seconds</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.name}
                      onClick={() => {
                        // Update the quote with the new name
                        const updatedQuote = {
                          ...currentQuote,
                          projectTitle: suggestion.name,
                        };
                        setCurrentQuote(updatedQuote);
                        setShowNameSuggestions(false);
                      }}
                      className="p-4 text-left rounded-xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-1">
                        {suggestion.name}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-red-500 transition-colors">
                        {suggestion.desc}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="text-center space-y-3">
                {!loadingSuggestions && aiSuggestions.length > 0 && (
                  <motion.button
                    onClick={generateAIAppNameSuggestions}
                    className="px-6 py-2 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔄 Generate New Names
                  </motion.button>
                )}
                <motion.button
                  onClick={() => setShowNameSuggestions(false)}
                  className="block mx-auto px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Keep current name
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuotationDisplay;
