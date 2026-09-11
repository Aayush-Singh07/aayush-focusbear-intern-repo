import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

/**
 * CoreComponentsScreen (Issue #29)
 * 
 * Demonstrates:
 * 1. Core Native Primitives: <View>, <Text>, <Image>, <FlatList>, <TouchableOpacity>.
 * 2. Virtualized Lists (<FlatList>): High performance rendering for large datasets
 *    (unlike web <div> lists that render all nodes in the DOM).
 * 3. Text Requirements: Every string must reside strictly inside a <Text> component.
 * 4. Image Dimensions: Network images require explicit width and height.
 */
const SAMPLE_HABITS = [
  { id: '1', title: 'Morning Hydration', duration: '5 mins', icon: '💧', category: 'Health' },
  { id: '2', title: 'Deep Work Session', duration: '45 mins', icon: '🧠', category: 'Focus' },
  { id: '3', title: 'Stretching Routine', duration: '10 mins', icon: '🧘', category: 'Wellbeing' },
  { id: '4', title: 'Daily Milestone Review', duration: '15 mins', icon: '📝', category: 'Productivity' },
  { id: '5', title: 'Evening Digital Sunset', duration: '30 mins', icon: '🌙', category: 'Sleep' },
];

export default function CoreComponentsScreen() {
  const [selectedId, setSelectedId] = useState('1');

  const renderHabitItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.7}
        style={[styles.card, isSelected && styles.selectedCard]}
      >
        <Text style={styles.cardIcon}>{item.icon}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category} • {item.duration}</Text>
        </View>
        <View style={[styles.badge, isSelected && styles.selectedBadge]}>
          <Text style={[styles.badgeText, isSelected && styles.selectedBadgeText]}>
            {isSelected ? 'Active' : 'Select'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Core Components & Primitives</Text>
        <Text style={styles.headerTitle}>Focus Bear Habit List</Text>
      </View>

      {/* Hero Banner with Native Image */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTag}>MOBILE PRIMITIVES DEMO</Text>
          <Text style={styles.bannerHeadline}>Native UI without HTML DOM</Text>
        </View>
      </View>

      {/* Virtualized FlatList */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Available Daily Habits ({SAMPLE_HABITS.length})</Text>
        <FlatList
          data={SAMPLE_HABITS}
          keyExtractor={(item) => item.id}
          renderItem={renderHabitItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          💡 FlatList only renders what is on-screen, providing massive memory savings over web DOM.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    padding: 14,
    justifyContent: 'flex-end',
  },
  bannerTag: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerHeadline: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  cardIcon: {
    fontSize: 26,
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardCategory: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  selectedBadge: {
    backgroundColor: '#6366F1',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  selectedBadgeText: {
    color: '#FFFFFF',
  },
  footerNote: {
    padding: 14,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 16,
  },
});
