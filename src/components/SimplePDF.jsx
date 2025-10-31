import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
});

const SimplePDF = ({ quote }) => {
  console.log('SimplePDF received quote:', quote);
  
  if (!quote) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>No Quote Data</Text>
          <View style={styles.section}>
            <Text>Error: No quote data provided</Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Quotation</Text>
        <View style={styles.section}>
          <Text>Project: {quote.projectTitle || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text>Total: {quote.totalCost || 'N/A'}</Text>
        </View>
        <View style={styles.section}>
          <Text>Duration: {quote.estimatedDuration || 'N/A'}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SimplePDF;