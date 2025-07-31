import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import "./global.css"

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-xl font-bold text-blue-500'>Habitize</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
