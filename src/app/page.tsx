'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHRStore } from '@/lib/store';
import { fetchEmployees } from '@/lib/api';
import EmployeeCard from '@/components/EmployeeCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { AppWrapper } from '@/components/common/AppWrapper';
import { Loader2, Users, TrendingUp, Star } from 'lucide-react';
import AnimatedElement from '@/components/common/AnimateElement';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Dashboard() {
  const router = useRouter();
  const { 
    employees, 
    setEmployees, 
    addEmployees,
    paginatedEmployees, 
    isLoading, 
    setLoading, 
    error, 
    setError,
    currentPage,
    setCurrentPage,
    hasMore,
    setHasMore
  } = useHRStore();
  
  const loadMoreEmployees = async () => {
    if (isLoading || !hasMore) return;
    
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const { employees: newEmployees, hasMore: moreAvailable } = await fetchEmployees(nextPage, 12);
      
      addEmployees(newEmployees);
      setCurrentPage(nextPage);
      setHasMore(moreAvailable);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more employees');
    } finally {
      setLoading(false);
    }
  };

  const { observer, isLoading: infiniteLoading } = useInfiniteScroll(loadMoreEmployees, {
    enabled: hasMore && !isLoading,
    threshold: 0.1,
    rootMargin: '100px'
  });
  
  useEffect(() => {
    const loadInitialEmployees = async () => {
      if (employees.length === 0) {
        setLoading(true);
        try {
          const { employees: initialEmployees, hasMore: moreAvailable } = await fetchEmployees(1, 12);
          setEmployees(initialEmployees);
          setHasMore(moreAvailable);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load employees');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadInitialEmployees();
  }, [employees.length, setEmployees, setLoading, setError, setHasMore]);
  
  const handleViewEmployee = (id: number) => {
    router.push(`/employee/${id}`);
  };
  
  const paginatedEmployeesList = paginatedEmployees();
  
  // Calculate stats
  const totalEmployees = employees.length;
  const averageRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)
    : '0.0';
  const highPerformers = employees.filter(emp => emp.performance >= 4).length;
  
  if (error) {
    return (
      <AppWrapper>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </AppWrapper>
    );
  }
  
  return (
    <AppWrapper>
      {/* Header */}
      <AnimatedElement className="mb-8" variant="fadeInUp" delay={0.2} duration={0.5}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight  flex gap-2">
          <span className=" text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Employee
          </span>
          <span className=" text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-tight text-sm md:text-base md:leading-relaxed">
          Manage and track employee performance across your organization
        </p>
      </AnimatedElement>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnimatedElement className="bg-gradient-to-r from-blue-700 to-blue-800 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.2} duration={0.5}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-800 dark:text-blue-200" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees}</p>
            </div>
          </div>
        </AnimatedElement>
        
        <AnimatedElement className="bg-gradient-to-r from-green-600 to-green-700border-green-800 bg-green-600 hover:bg-green-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.4} duration={0.5}>
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
      
      {/* Search and Filter */}
      <AnimatedElement className="mb-8" variant="fadeInUp" delay={0.8} duration={0.5}>
        <SearchAndFilter />
      </AnimatedElement>
      
      {/* Employee Grid */}
      {isLoading && employees.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600 dark:text-gray-400">Loading employees...</span>
          </div>
        </div>
      ) : paginatedEmployeesList.length === 0 ? (
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEmployeesList.map((employee, index) => (
              <AnimatedElement
                key={employee.id}
                variant="fadeInUp"
                delay={0.1 * (index % 12)}
                duration={0.5}
              >
                <EmployeeCard
                  employee={employee}
                  onView={handleViewEmployee}
                />
              </AnimatedElement>
            ))}
          </div>
          
          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div 
              ref={observer}
              className="flex justify-center items-center py-8"
            >
              {infiniteLoading && (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">Loading more employees...</span>
                </div>
              )}
            </div>
          )}
          
          {/* End of Results */}
          {!hasMore && employees.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                You&apos;ve reached the end of the employee list
              </p>
            </div>
          )}
        </>
      )}
    </AppWrapper>
  );
}
