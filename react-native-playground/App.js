import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

// Screen Imports
import CoreComponentsScreen from './src/screens/CoreComponentsScreen';
import StylingScreen from './src/screens/StylingScreen';
import NavigationScreen from './src/screens/NavigationScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import GesturesAnimationsScreen from './src/screens/GesturesAnimationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Drill-Down Details
function NavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#0F172A',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen
        name="NavHome"
        component={NavigationScreen}
        options={{ title: 'Explore Habits' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Habit Details' }}
      />
    </Stack.Navigator>
  );
}

/**
 * Root Application Entry Point (Milestone 8)
 * 
 * Demonstrates:
 * 1. NavigationContainer wrapping the global hierarchy.
 * 2. BottomTabNavigator for primary sections.
 * 3. NativeStackNavigator nested inside the Navigation tab.
 */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'NavigationTab',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontWeight: '800', color: '#0F172A' },
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
          tabBarIcon: () => {
            const icons = {
              Primitives: '🧩',
              Styling: '🎨',
              NavigationTab: '🧭',
              Motion: '⚡',
            };
            return <Text style={{ fontSize: 18 }}>{icons[route.name] || '📱'}</Text>;
          },
        })}
      >
        <Tab.Screen
          name="Primitives"
          component={CoreComponentsScreen}
          options={{ title: 'Primitives' }}
        />
        <Tab.Screen
          name="Styling"
          component={StylingScreen}
          options={{ title: 'Styles' }}
        />
        <Tab.Screen
          name="NavigationTab"
          component={NavigationStack}
          options={{ title: 'Navigation' }}
        />
        <Tab.Screen
          name="Motion"
          component={GesturesAnimationsScreen}
          options={{ title: 'Motion' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
