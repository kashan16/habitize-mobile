import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthModal } from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { ActivePage, usePage } from '../context/PageContext';
import { useSupabase } from '../context/SupabaseContext';

interface NavItem {
  name: string;
  page: ActivePage;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function Header() {
  const { activePage, setActivePage } = usePage();
  const { user, loading } = useAuth();
  const supabase = useSupabase();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Habit', page: 'Habit', icon: 'checkmark-circle' },
    { name: 'Sleep', page: 'Sleep', icon: 'moon' },
    { name: 'Moments', page: 'Moments', icon: 'happy' },
    { name: 'Stats', page: 'Stats', icon: 'stats-chart' },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSignOut:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleSignIn = () => {
    setIsAuthOpen(true);
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: handleSignOut },
      ]
    );
  };

  const userName = user?.email?.split('@')[0] || 'User';

  const onNavClick = (page: ActivePage) => {
    setActivePage(page);
    setShowUserMenu(false); // Close user menu when navigating
  };

  return (
    <>
      <SafeAreaView className="bg-white/90 dark:bg-black/90"
        style={{
          paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Top Header */}
        <View className="bg-white/30 dark:bg-black/30 border-b border-gray-100 dark:border-gray-800">
          <View className="flex-row justify-between items-center h-16 px-4">
            {/* Logo */}
            <TouchableOpacity onPress={() => setActivePage('Habit')}>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                Habitize
              </Text>
            </TouchableOpacity>

            {/* User Actions */}
            <View className="flex-row items-center space-x-2">
              {loading ? (
                <View className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <ActivityIndicator size="small" className="flex-1" />
                </View>
              ) : user ? (
                <TouchableOpacity
                  onPress={() => setShowUserMenu(!showUserMenu)}
                  className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2"
                >
                  <Ionicons name="person" size={20} color="#6B7280" />
                  <Ionicons 
                    name={showUserMenu ? "chevron-up" : "chevron-down"} 
                    size={16} 
                    color="#6B7280" 
                    className="ml-1"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleSignIn}
                  className="flex-row items-center bg-blue-600 rounded-full px-4 py-2 space-x-2"
                >
                  <Ionicons name="log-in" size={16} color="white" />
                  <Text className="text-white font-medium">Sign In</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* User Menu Dropdown */}
          {showUserMenu && user && (
            <View 
              className="absolute top-16 right-4 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 z-50"
              style={[styles.dropdownShadow]}
            >
              {/* User Info */}
              <View className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400" numberOfLines={1}>
                  {user.email}
                </Text>
              </View>

              {/* Sign Out Button */}
              <TouchableOpacity
                onPress={confirmSignOut}
                className="flex-row items-center px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Ionicons name="log-out" size={20} color="#DC2626" />
                <Text className="ml-3 text-sm text-red-600 dark:text-red-400 font-medium">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/30 dark:bg-black/30 border-t border-gray-100 dark:border-gray-800 h-20 flex-row justify-around items-center z-40">
        {navItems.map((item) => {
          const isActive = activePage === item.page;
          
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => onNavClick(item.page)}
              className={`flex-1 flex-col items-center justify-center h-full ${
                isActive ? 'border-t-2 border-blue-600 dark:border-blue-300' : ''
              }`}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isActive ? '#3B82F6' : '#6B7280'}
                className="mb-1"
              />
              <Text
                className={`text-xs font-medium ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Auth Modal */}
      <AuthModal visible={isAuthOpen} onClose={() => setIsAuthOpen(false)}/>

      {/* Overlay to close user menu when tapping outside */}
      {showUserMenu && (
        <TouchableOpacity
          className="absolute inset-0 z-40"
          onPress={() => setShowUserMenu(false)}
          activeOpacity={1}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dropdownShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 10, // Android support
  },
});

