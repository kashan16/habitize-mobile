import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { PageProvider } from './src/context/PageContext';
import { SupabaseProvider } from './src/context/SupabaseContext';


interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <PageProvider>
          {children}
        </PageProvider>
      </AuthProvider>
    </SupabaseProvider>
  );
};

export default AppProvider;