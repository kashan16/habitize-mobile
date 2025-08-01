import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePage } from "./src/context/PageContext";
import Habits from "./src/components/Habits";
import Moments from "./src/components/Moments";
import SleepGraph from "./src/components/SleepGraph";
import Stats from "./src/components/Stats";
import { KeyboardAvoidingView, Platform, View, ScrollView } from "react-native";
import Header from "./src/components/Header";


interface MainLayoutProps {
    children ?: React.ReactNode;
}

export const MainLayout : React.FC<MainLayoutProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    const { activePage } = usePage();

    const renderCurrentPage = () => {
        switch(activePage) {
            case 'Habit' : return <Habits/>
            case 'Moments' : return <Moments/>
            case 'Sleep' : return <SleepGraph/>
            case 'Stats' : return <Stats/>
            default : return <Habits/>    
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-50 dark:bg-gray-900"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* Header - Always visible */}
            <Header />

            {/* Main Content Area */}
            <View className="flex-1">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ 
                    paddingBottom: 80,
                    minHeight: '100%' }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
            <View className="flex-1 px-4 py-6">
                {children || renderCurrentPage()}
            </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );        
};

export default MainLayout;