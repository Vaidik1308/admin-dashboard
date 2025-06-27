'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import AnimatedElement from './AnimateElement';

export const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        {/* <div className="hidden md:block text-left">
          <p className="text-xs font-medium text-gray-900 dark:text-white">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user.role}
          </p>
        </div> */}
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <AnimatedElement className="absolute bg-gradient-to-br from-blue-800 to-purple-700 right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50" variant="fadeInDown" delay={0.2} duration={0.2}>
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 capitalize mt-1">
              {user.role}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add settings functionality here
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </AnimatedElement>
      )}
    </div>
  );
}; 