import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  SafeAreaView,
} from 'react-native';

/**
 * StylingScreen (Issue #28)
 * 
 * Demonstrates:
 * 1. StyleSheet.create vs Inline Styles: Static validation & performance memory cache.
 * 2. Yoga Flexbox Engine: Column default, justifyContent, alignItems, flexWrap.
 * 3. Responsive Screen Design: Dynamically adapting to viewport width with useWindowDimensions.
 * 4. Platform Specifics: Shadow styles per OS (iOS shadow properties vs Android elevation).
 */
export default function StylingScreen() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 600;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Styling & Layout Engine</Text>
          <Text style={styles.title}>StyleSheet vs Inline & Flexbox</Text>
        </View>

        {/* Device Dimensions Card */}
        <View style={styles.dimensionCard}>
          <Text style={styles.dimensionTitle}>Active Screen Metrics</Text>
          <View style={styles.metricRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Width</Text>
              <Text style={styles.metricValue}>{Math.round(width)} px</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Height</Text>
              <Text style={styles.metricValue}>{Math.round(height)} px</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Platform</Text>
              <Text style={styles.metricValue}>{Platform.OS.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Comparison Section: StyleSheet vs Inline */}
        <Text style={styles.sectionHeader}>1. StyleSheet.create() vs Inline Styles</Text>
        
        {/* StyleSheet Card */}
        <View style={styles.styleSheetCard}>
          <Text style={styles.cardHeading}>StyleSheet.create() [Optimized]</Text>
          <Text style={styles.cardDesc}>
            Compiled once when module loads. Validated by React Native tooling, avoiding garbage collection overhead.
          </Text>
        </View>

        {/* Inline Style Card */}
        <View style={{
          backgroundColor: '#FFFBEB',
          borderRadius: 14,
          padding: 16,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: '#FDE68A',
        }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#B45309' }}>
            Inline Style Object [Unoptimized]
          </Text>
          <Text style={{ fontSize: 13, color: '#78350F', marginTop: 4, lineHeight: 18 }}>
            Re-allocates a brand new JavaScript object on every single render cycle, creating GC memory pressure.
          </Text>
        </View>

        {/* Flexbox Layout Showcase */}
        <Text style={styles.sectionHeader}>2. Mobile Flexbox Grid (Wrap & Ratio)</Text>
        <View style={[styles.flexGrid, isWide && styles.flexGridWide]}>
          <View style={[styles.gridBox, { backgroundColor: '#818CF8' }]}>
            <Text style={styles.gridText}>flex: 1</Text>
          </View>
          <View style={[styles.gridBox, { backgroundColor: '#6366F1' }]}>
            <Text style={styles.gridText}>flex: 1</Text>
          </View>
          <View style={[styles.gridBox, { backgroundColor: '#4F46E5' }]}>
            <Text style={styles.gridText}>flex: 1</Text>
          </View>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            💡 React Native uses camelCase (e.g. <Text style={styles.codeText}>backgroundColor</Text>) because styles are native JS object literals, not hyphenated CSS strings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  dimensionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dimensionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  metricRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#334155',
    marginTop: 8,
    marginBottom: 10,
  },
  styleSheetCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3730A3',
  },
  cardDesc: {
    fontSize: 13,
    color: '#4338CA',
    marginTop: 4,
    lineHeight: 18,
  },
  flexGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  flexGridWide: {
    gap: 16,
  },
  gridBox: {
    flex: 1,
    height: 64,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  tipBox: {
    padding: 14,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    marginTop: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '700',
    color: '#4F46E5',
  },
});
