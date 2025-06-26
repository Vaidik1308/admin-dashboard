'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHRStore } from '@/lib/store';
import { fetchEmployees } from '@/lib/api';
import EmployeeCard from '@/components/EmployeeCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import Navigation from '@/components/Navigation';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Loader2, Users, TrendingUp, Star } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { 
    employees, 
    setEmployees, 
    filteredEmployees, 
    isLoading, 
    setLoading, 
    error, 
    setError 
  } = useHRStore();
  
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    };
    
    if (employees.length === 0) {
      loadEmployees();
    }
  }, [employees.length, setEmployees, setLoading, setError]);
  
  const handleViewEmployee = (id: number) => {
    router.push(`/employee/${id}`);
  };
  
  const filteredEmployeesList = filteredEmployees();
  
  // Calculate stats
  const totalEmployees = employees.length;
  const averageRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)
    : '0.0';
  const highPerformers = employees.filter(emp => emp.performance >= 4).length;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track employee performance across your organization
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Performers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{highPerformers}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter />
        </div>
        
        {/* Employee Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">Loading employees...</span>
            </div>
          </div>
        ) : filteredEmployeesList.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployeesList.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={handleViewEmployee}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
