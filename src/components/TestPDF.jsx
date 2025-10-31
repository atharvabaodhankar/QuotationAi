import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Simple test PDF with minimal styling
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
  },
});

const TestPDF = ({ quote }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Test Quotation PDF</Text>
        <Text style={styles.text}>Project: {quote?.projectTitle || 'Test Project'}</Text>
        <Text style={styles.text}>Total: {quote?.totalCost || '$1000'}</Text>
        <Text style={styles.text}>Duration: {quote?.estimatedDuration || '2 weeks'}</Text>
        <Text style={styles.text}>Generated: {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
};

export default TestPDF;