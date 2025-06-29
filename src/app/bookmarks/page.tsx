'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useHRStore } from '@/lib/store';
import Navigation from '@/components/Navigation';
import Button from '@/components/ui/Button';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Bookmark, Users, TrendingUp, Star, Trash2, BookmarkCheck } from 'lucide-react';
import AnimatedElement from '@/components/common/AnimateElement';
import { Employee } from '@/types';

export default function Bookmarks() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { bookmarkedEmployees, toggleBookmark } = useHRStore();
  
  const handleViewEmployee = (id: number) => {
    router.push(`/employee/${id}`);
  };
  
  const handleRemoveBookmark = (id: number) => {
    toggleBookmark(id);
  };
  
  const handleAssignToProject = (employee: Employee) => {
    alert(`Assigning ${employee.firstName} ${employee.lastName} to a new project...`);
  };
  
  const handlePromote = (employee: Employee) => {
    alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`);
  };
  
  // Calculate stats
  const totalBookmarks = bookmarkedEmployees.length;
  const averageRating = bookmarkedEmployees.length > 0 
    ? (bookmarkedEmployees.reduce((sum, emp) => sum + emp.performance, 0) / bookmarkedEmployees.length).toFixed(1)
    : '0.0';
  const highPerformers = bookmarkedEmployees.filter(emp => emp.performance >= 4).length;
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedElement className="mb-8" variant="fadeInUp" delay={0.2} duration={0.5}>
          <div className="flex items-center gap-1 mb-2">
            <BookmarkCheck className="md:size-8 size-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight flex gap-2">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Bookmarked
              </span>
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                Employees
              </span>
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-tight text-sm md:text-base md:leading-relaxed">
            Manage your saved employees and take quick actions
          </p>
        </AnimatedElement>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedElement className="bg-gradient-to-r from-blue-700 to-blue-800 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.2} duration={0.5}>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookmarkCheck className="w-6 h-6 text-blue-800 dark:text-blue-200" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Total Bookmarks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBookmarks}</p>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement className="bg-gradient-to-r from-green-600 to-green-700 border-green-800 bg-green-600 hover:bg-green-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.4} duration={0.5}>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-700 rounded-lg">
                <Star className="w-6 h-6 text-green-800 dark:text-green-200" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating}</p>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-800 bg-yellow-600 hover:bg-yellow-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.6} duration={0.5}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-700 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-800 dark:text-yellow-200" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">High Performers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{highPerformers}</p>
              </div>
            </div>
          </AnimatedElement>
        </div>
        
        {/* Bookmarked Employees */}
        {bookmarkedEmployees.length === 0 ? (
          <AnimatedElement className="text-center py-12" variant="fadeInUp" delay={0.8} duration={0.5}>
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No bookmarked employees
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start bookmarking employees from the dashboard to see them here
            </p>
            <Button onClick={() => router.push('/')}>
              <Users className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </AnimatedElement>
        ) : (
          <div className="space-y-6">
            <AnimatedElement className="flex items-center justify-between" variant="fadeInUp" delay={0.8} duration={0.5}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Bookmarks ({bookmarkedEmployees.length})
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  bookmarkedEmployees.forEach(emp => toggleBookmark(emp.id));
                }}
                className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedEmployees.map((employee, index) => (
                <AnimatedElement
                  key={employee.id}
                  variant="fadeInUp"
                  delay={0.1 * (index % 12)}
                  duration={0.5}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {employee.email}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveBookmark(employee.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Department:</span> {employee.department}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Age:</span> {employee.age} years
                        </div>
                      </div>
                      
                      {/* Performance */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Performance Rating
                          </span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            employee.performance >= 4 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            employee.performance >= 3 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {employee.performance}/5
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= employee.performance
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewEmployee(employee.id)}
                          className="flex-1"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handlePromote(employee)}
                          className="flex-1"
                        >
                          Promote
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAssignToProject(employee)}
                          className="w-full"
                        >
                          Assign to Project
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 