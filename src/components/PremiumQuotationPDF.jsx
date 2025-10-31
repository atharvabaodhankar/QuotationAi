import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Using built-in fonts for better compatibility

// Premium color palette
const colors = {
  primary: '#FF4742',
  primaryLight: '#FF6B68',
  secondary: '#263238',
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A'
  },
  white: '#FFFFFF',
  green: '#10B981',
  blue: '#3B82F6'
};

// Premium styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.gray[800],
    backgroundColor: colors.white,
    padding: 0,
  },
  
  // Header Section
  header: {
    backgroundColor: colors.primary,
    padding: 40,
    color: colors.white,
  },
  
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  logoText: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.white,
    marginLeft: 12,
  },
  
  companyInfo: {
    alignItems: 'flex-end',
  },
  
  companyName: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 4,
  },
  
  companyDetails: {
    fontSize: 10,
    opacity: 0.9,
    lineHeight: 1.4,
  },
  
  // Title Section
  titleSection: {
    padding: 40,
    backgroundColor: colors.gray[50],
    borderBottom: `2px solid ${colors.gray[200]}`,
  },
  
  quotationTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: colors.gray[900],
    marginBottom: 8,
  },
  
  projectTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.primary,
    marginBottom: 16,
  },
  
  projectDescription: {
    fontSize: 12,
    color: colors.gray[600],
    lineHeight: 1.6,
    maxWidth: '70%',
  },
  
  // Stats Section
  statsSection: {
    flexDirection: 'row',
    padding: 40,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.gray[200]}`,
  },
  
  statCard: {
    flex: 1,
    marginRight: 20,
    padding: 20,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    borderLeft: `4px solid ${colors.primary}`,
  },
  
  statLabel: {
    fontSize: 10,
    color: colors.gray[500],
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  
  statValue: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.gray[900],
  },
  
  // Content Section
  contentSection: {
    padding: 40,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.gray[900],
    marginBottom: 20,
    paddingBottom: 8,
    borderBottom: `2px solid ${colors.primary}`,
  },
  
  // Services Table
  table: {
    marginBottom: 30,
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 8,
    marginBottom: 2,
  },
  
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.gray[700],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottom: `1px solid ${colors.gray[200]}`,
    alignItems: 'flex-start',
  },
  
  serviceCell: {
    flex: 3,
    paddingRight: 20,
  },
  
  serviceName: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.gray[900],
    marginBottom: 4,
  },
  
  serviceDescription: {
    fontSize: 10,
    color: colors.gray[600],
    lineHeight: 1.4,
  },
  
  priceCell: {
    flex: 1,
    alignItems: 'flex-end',
  },
  
  price: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.gray[900],
  },
  
  // Summary Section
  summarySection: {
    marginTop: 30,
    padding: 24,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    border: `1px solid ${colors.gray[200]}`,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  summaryLabel: {
    fontSize: 11,
    color: colors.gray[600],
  },
  
  summaryValue: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.gray[800],
  },
  
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTop: `2px solid ${colors.primary}`,
    marginTop: 12,
  },
  
  totalLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.gray[900],
  },
  
  totalValue: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.primary,
  },
  
  // Notes Section
  notesSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    borderLeft: `4px solid ${colors.blue}`,
  },
  
  notesTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.blue,
    marginBottom: 8,
  },
  
  notesText: {
    fontSize: 10,
    color: colors.gray[700],
    lineHeight: 1.5,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTop: `1px solid ${colors.gray[300]}`,
  },
  
  footerText: {
    fontSize: 9,
    color: colors.gray[500],
  },
  
  footerBrand: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.primary,
  },
  
  // Timeline Section
  timelineSection: {
    marginTop: 30,
  },
  
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
    marginTop: 4,
  },
  
  timelineContent: {
    flex: 1,
  },
  
  timelineTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.gray[800],
    marginBottom: 2,
  },
  
  timelineDescription: {
    fontSize: 10,
    color: colors.gray[600],
    lineHeight: 1.4,
  },
});

const PremiumQuotationPDF = ({ quote, discount = 0, currency = 'INR' }) => {
  // Extract numeric value from price strings
  const extractPrice = (priceStr) => {
    const match = priceStr.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const totalOriginal = extractPrice(quote.totalCost);
  const discountAmount = (totalOriginal * discount) / 100;
  const finalTotal = totalOriginal - discountAmount;

  // Currency symbols
  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const formatCurrency = (amount) => {
    return `${currencySymbols[currency] || '₹'}${amount.toLocaleString()}`;
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const validityDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logo}>
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: colors.white,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ color: colors.primary, fontSize: 16, fontWeight: 800 }}>Q</Text>
              </View>
              <Text style={styles.logoText}>QuotationAI</Text>
            </View>
            
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>Professional Quotation</Text>
              <Text style={styles.companyDetails}>Generated on {currentDate}</Text>
              <Text style={styles.companyDetails}>Valid until {validityDate}</Text>
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.quotationTitle}>Project Quotation</Text>
          <Text style={styles.projectTitle}>{quote.projectTitle}</Text>
          <Text style={styles.projectDescription}>
            {quote.clientRequirementSummary}
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Investment</Text>
            <Text style={styles.statValue}>{formatCurrency(finalTotal)}</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Timeline</Text>
            <Text style={styles.statValue}>{quote.estimatedDuration}</Text>
          </View>
          
          <View style={[styles.statCard, { marginRight: 0 }]}>
            <Text style={styles.statLabel}>Services</Text>
            <Text style={styles.statValue}>{quote.services.length} Items</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Services Breakdown */}
          <Text style={styles.sectionTitle}>Service Breakdown</Text>
          
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Service Description</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'right' }]}>Investment</Text>
            </View>
            
            {quote.services.map((service, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.serviceCell}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <View style={styles.priceCell}>
                  <Text style={styles.price}>{formatCurrency(extractPrice(service.price))}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Summary */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalOriginal)}</Text>
            </View>
            
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.green }]}>
                  Discount ({discount}%)
                </Text>
                <Text style={[styles.summaryValue, { color: colors.green }]}>
                  -{formatCurrency(discountAmount)}
                </Text>
              </View>
            )}
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Investment</Text>
              <Text style={styles.totalValue}>{formatCurrency(finalTotal)}</Text>
            </View>
          </View>

          {/* Project Timeline */}
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Project Timeline</Text>
          <View style={styles.timelineSection}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Project Kickoff</Text>
                <Text style={styles.timelineDescription}>
                  Initial project setup, requirements finalization, and team onboarding
                </Text>
              </View>
            </View>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Development Phase</Text>
                <Text style={styles.timelineDescription}>
                  Core development work based on agreed specifications and milestones
                </Text>
              </View>
            </View>
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Testing & Delivery</Text>
                <Text style={styles.timelineDescription}>
                  Quality assurance, final testing, and project delivery within {quote.estimatedDuration}
                </Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          {quote.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>Additional Notes</Text>
              <Text style={styles.notesText}>{quote.notes}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This quotation is valid for 30 days from the date of generation.
          </Text>
          <Text style={styles.footerBrand}>
            Generated by QuotationAI • Free & Open Source
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PremiumQuotationPDF;