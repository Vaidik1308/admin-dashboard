import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Bookmark, BarChart3, Moon, Sun, BookmarkCheck } from 'lucide-react';
import { useHRStore } from '@/lib/store';
import AnimatedElement from './common/AnimateElement';

interface NavigationProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ darkMode, onToggleDarkMode }) => {
  const pathname = usePathname();
  const { bookmarkedEmployees } = useHRStore();
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/bookmarks', label: 'Bookmarks', icon: BookmarkCheck, badge: bookmarkedEmployees.length },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];
  
  return (
    <nav className="bg-white dark:bg-black border-b border-gray-700 dark:border-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-5">
            <AnimatedElement className="flex-shrink-0" variant="fadeInLeft" delay={0.2} duration={0.5}>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-500 uppercase">
                  Flam
                </span>
              </h1>
            </AnimatedElement>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <AnimatedElement key={item.href} variant="bounce" delay={(index + 1) * 0.5} duration={0.5}> 
                    
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-4 rounded-sm hover:bg-blue-700 duration-300 p-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  </AnimatedElement>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button> */}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 