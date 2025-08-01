import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import "./global.css"
import React from 'react';
import AppProvider from './AppProvider';
import MainLayout from './MainLaytout';

export default function App() {
  return (
/*     <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-xl font-bold text-blue-500'>Habitize</Text>
      <StatusBar style="auto" />
    </View> */
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style='auto'/>
        <MainLayout/>
      </AppProvider>
    </SafeAreaProvider>
  );
}
