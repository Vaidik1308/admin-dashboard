'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, BookmarkCheck, Menu, X } from 'lucide-react';
import { useHRStore } from '@/lib/store';
import { UserMenu } from '@/components/common/UserMenu';
import AnimatedElement from './common/AnimateElement';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const pathname = usePathname();
  const { bookmarkedEmployees } = useHRStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/bookmarks', label: 'Bookmarks', icon: BookmarkCheck, badge: bookmarkedEmployees.length },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <>
      <nav className="bg-white dark:bg-black border-b border-gray-700 dark:border-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-5 justify-start w-full">
              <AnimatedElement className="flex-shrink-0" variant="fadeInLeft" delay={0.2} duration={0.5}>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 uppercase">
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
                        href={item.href}
                        className={`  inline-flex items-center px-4 rounded-sm hover:bg-blue-700 duration-300 p-2 text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                        {(item.badge && item.badge > 0) ? (
                          <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        ): null}
                      </Link>
                    </AnimatedElement>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-0">
              {/* User Menu */}
              <UserMenu />
              
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Menu
              </h2>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="p-4">
              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeSidebar}
                        className={`flex items-center px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                        {(item.badge && item.badge > 0) ? (
                          <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                            {item.badge}
                          </span>
                        ): null}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 