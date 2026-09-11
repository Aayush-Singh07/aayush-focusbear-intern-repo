import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

/**
 * DetailsScreen (Issue #27)
 * 
 * Demonstrates:
 * 1. Reading Route Parameters: Extracting data passed from the parent screen via `route.params`.
 * 2. Programmatic Back Navigation: Popping the top screen off the stack via `navigation.goBack()`.
 */
export default function DetailsScreen({ route, navigation }) {
  const { habitId, habitName, duration, streak } = route.params || {
    habitId: 'N/A',
    habitName: 'Custom Habit',
    duration: '10m',
    streak: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detailCard}>
          <Text style={styles.badge}>PARAM ID: #{habitId}</Text>
          <Text style={styles.title}>{habitName}</Text>
          <Text style={styles.desc}>
            Focus Bear helps users build positive daily routines through guided micro-habits and smart distraction blocking.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Target Time</Text>
              <Text style={styles.statValue}>{duration}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Current Streak</Text>
              <Text style={styles.statValue}>{streak} Days 🔥</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Pop Stack (Go Back)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
