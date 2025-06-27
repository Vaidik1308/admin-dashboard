'use client';

import { ProtectedRoute } from './ProtectedRoute';
import Navigation from '../Navigation';
import { useTheme } from '@/hooks/useTheme';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation darkMode={theme === 'dark'} onToggleDarkMode={toggleTheme} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}; 