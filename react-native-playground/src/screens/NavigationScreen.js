import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

/**
 * NavigationScreen (Issue #27)
 * 
 * Demonstrates:
 * 1. Stack Navigation: Pushing new screens onto the visual navigation stack.
 * 2. Parameter Passing: Passing payload objects via `navigation.navigate('Details', { habitId, title })`.
 * 3. Screen Preservations: The source screen stays mounted in memory.
 */
export default function NavigationScreen({ navigation }) {
  const habits = [
    { id: '101', name: 'Pomodoro Focus Block', duration: '25m', streak: 12 },
    { id: '102', name: 'Mindful Breathing', duration: '5m', streak: 5 },
    { id: '103', name: 'Cold Shower Recharge', duration: '3m', streak: 21 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>React Navigation Architecture</Text>
          <Text style={styles.title}>Stack & Tab Navigators</Text>
        </View>

        <Text style={styles.sectionHeader}>Tap an item to push Details onto the Stack:</Text>

        {habits.map((h) => (
          <TouchableOpacity
            key={h.id}
            onPress={() =>
              navigation.navigate('Details', {
                habitId: h.id,
                habitName: h.name,
                duration: h.duration,
                streak: h.streak,
              })
            }
            activeOpacity={0.7}
            style={styles.navCard}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{h.name}</Text>
              <Text style={styles.cardMeta}>Duration: {h.duration} • Streak: {h.streak} days 🔥</Text>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Navigation Lifecycles in Mobile:</Text>
          <Text style={styles.infoText}>
            Unlike web where URLs discard the previous page DOM, React Navigation retains the previous screen state in memory so popping back is instant.
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
  content: {
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
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  arrowIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginLeft: 10,
  },
  infoCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3730A3',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#4338CA',
    lineHeight: 18,
  },
});
