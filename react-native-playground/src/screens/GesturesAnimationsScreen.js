import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';

/**
 * GesturesAnimationsScreen (Issue #26)
 * 
 * Demonstrates:
 * 1. `Animated` API: Spring and timing animations executed on the Native UI thread (`useNativeDriver: true`).
 * 2. Gestures: PressIn/PressOut scale gestures and onLongPress event handling.
 * 3. InteractionManager: Deferring heavy non-critical JavaScript work until active touch/animations finish.
 */
export default function GesturesAnimationsScreen() {
  // Animation Values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const [gestureStatus, setGestureStatus] = useState('Idle');
  const [heavyTaskLoaded, setHeavyTaskLoaded] = useState(false);

  // Trigger Native Driver Spring Animation on Press
  const handlePressIn = () => {
    setGestureStatus('Pressing Down (Scaling Down)...');
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setGestureStatus('Released (Springing Back)!');
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleLongPress = () => {
    setGestureStatus('🎯 LONG PRESS TRIGGERED (Haptic / Action Initiated)!');
    // Pulse animation
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
    ]).start();
  };

  // InteractionManager: Wait until initial screen animations finish before rendering heavy work
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setHeavyTaskLoaded(true);
    });
    return () => task.cancel();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Motion & Touch Interaction</Text>
          <Text style={styles.title}>Gestures & Animated API</Text>
        </View>

        {/* Animated Interactive Card */}
        <Text style={styles.sectionHeader}>1. Native Driver Scale & Pulse</Text>
        <Animated.View
          style={[
            styles.interactiveCard,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={handleLongPress}
            delayLongPress={600}
            activeOpacity={1}
            style={styles.cardTouchArea}
          >
            <Text style={styles.bearEmoji}>🐻</Text>
            <Text style={styles.cardTitle}>Interactive Focus Bear</Text>
            <Text style={styles.cardInstruction}>
              Tap, hold, or long-press this card to trigger native spring animations.
            </Text>

            <Animated.View style={[styles.pulseBadge, { opacity: fadeAnim }]}>
              <Text style={styles.pulseText}>Animation Engine: UI Thread (Native Driver)</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Live Gesture Status Badge */}
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Gesture State:</Text>
          <Text style={styles.statusValue}>{gestureStatus}</Text>
        </View>

        {/* InteractionManager Section */}
        <Text style={styles.sectionHeader}>2. InteractionManager Scheduling</Text>
        <View style={styles.imCard}>
          <Text style={styles.imTitle}>Deferred Heavy Task Status:</Text>
          {heavyTaskLoaded ? (
            <View style={styles.loadedRow}>
              <Text style={styles.checkIcon}>✅</Text>
              <Text style={styles.loadedText}>
                Loaded seamlessly after screen interactions and animations completed!
              </Text>
            </View>
          ) : (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#6366F1" size="small" />
              <Text style={styles.loadingText}>Waiting for interactions to settle...</Text>
            </View>
          )}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 Setting <Text style={styles.codeText}>useNativeDriver: true</Text> offloads animation frame calculations to the native thread, preventing JS thread bottlenecks from causing frame drops.
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
    marginTop: 8,
    marginBottom: 10,
  },
  interactiveCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  cardTouchArea: {
    padding: 24,
    alignItems: 'center',
  },
  bearEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  cardInstruction: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  pulseBadge: {
    marginTop: 14,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pulseText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  statusBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  imCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  imTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  loadedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    fontSize: 16,
  },
  loadedText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    flex: 1,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 12,
    color: '#64748B',
  },
  tipCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  tipText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  codeText: {
    fontWeight: '700',
    color: '#6366F1',
  },
});
