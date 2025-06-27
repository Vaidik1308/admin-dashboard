'use client';

import React from 'react';
import { useHRStore } from '@/lib/store';
import { AppWrapper } from '@/components/common/AppWrapper';
import { useTheme } from '@/hooks/useTheme';
import { BarChart3, TrendingUp, Users, Star } from 'lucide-react';
import AnimatedElement from '@/components/common/AnimateElement';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { theme } = useTheme();
  const { employees, bookmarkedEmployees, isLoading } = useHRStore();
  
  // Show loading state if employees are not loaded yet
  if (isLoading && employees.length === 0) {
    return (
      <AppWrapper>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
          </div>
        </div>
      </AppWrapper>
    );
  }
  
  // Calculate department stats
  const departmentStats = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = {
        total: 0,
        ratings: [],
        bookmarked: 0
      };
    }
    acc[employee.department].total += 1;
    acc[employee.department].ratings.push(employee.performance);
    
    if (bookmarkedEmployees.some(bm => bm.id === employee.id)) {
      acc[employee.department].bookmarked += 1;
    }
    
    return acc;
  }, {} as Record<string, { total: number; ratings: number[]; bookmarked: number }>);
  
  const departmentData = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept,
    averageRating: stats.ratings.length > 0 
      ? (stats.ratings.reduce((sum, rating) => sum + rating, 0) / stats.ratings.length).toFixed(1)
      : '0.0',
    employeeCount: stats.total,
    bookmarkedCount: stats.bookmarked
  }));
  
  // Generate mock bookmark trends (last 7 days)
  const generateBookmarkTrends = () => {
    const trends = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock data - in real app this would come from API
      const mockCount = Math.floor(Math.random() * 10) + bookmarkedEmployees.length;
      
      trends.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: mockCount
      });
    }
    
    return trends;
  };
  
  const bookmarkTrends = generateBookmarkTrends();
  
  // Chart configurations
  const departmentChartData = {
    labels: departmentData.map(d => d.department),
    datasets: [
      {
        label: 'Average Rating',
        data: departmentData.map(d => parseFloat(d.averageRating)),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Employee Count',
        data: departmentData.map(d => d.employeeCount),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  const bookmarkChartData = {
    labels: bookmarkTrends.map(t => t.date),
    datasets: [
      {
        label: 'Bookmarked Employees',
        data: bookmarkTrends.map(t => t.count),
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };
  
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        }
      },
      title: {
        display: true,
        text: 'Department Performance Overview',
        color: theme === 'dark' ? '#f9fafb' : '#111827'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb'
        }
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb'
        }
      }
    }
  };
  
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        }
      },
      title: {
        display: true,
        text: 'Bookmark Trends (Last 7 Days)',
        color: theme === 'dark' ? '#f9fafb' : '#111827'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb'
        }
      },
      x: {
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151'
        },
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb'
        }
      }
    }
  };
  
  // Calculate overall stats
  const totalEmployees = employees.length;
  const averageRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length).toFixed(1)
    : '0.0';
  const totalBookmarks = bookmarkedEmployees.length;
  const departmentsCount = Object.keys(departmentStats).length;
  
  return (
    <div className="min-h-screen bg-background">
      <AppWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <AnimatedElement className="mb-8" variant="fadeInUp" delay={0.2} duration={0.5}>
            <div className="flex items-center gap-1 mb-2">
              <BarChart3 className="md:size-8 size-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight flex gap-2">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Analytics
                </span>
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                  Dashboard
                </span>
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-tight text-sm md:text-base md:leading-relaxed">
              Comprehensive insights into employee performance and engagement
            </p>
          </AnimatedElement>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Bookmarks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBookmarks}</p>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-800 bg-purple-600 hover:bg-purple-700 text-gray-900 dark:text-white flex items-center justify-start rounded-lg shadow p-6" variant="fadeInUp" delay={0.8} duration={0.5}>
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-700 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-800 dark:text-purple-200" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Departments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{departmentsCount}</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Department Performance Chart */}
            <AnimatedElement className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" variant="fadeInUp" delay={1.0} duration={0.5}>
              <Bar data={departmentChartData} options={chartOptions} />
            </AnimatedElement>
            
            {/* Bookmark Trends Chart */}
            <AnimatedElement className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" variant="fadeInUp" delay={1.2} duration={0.5}>
              <Line data={bookmarkChartData} options={lineChartOptions} />
            </AnimatedElement>
          </div>
          
          {/* Department Details Table */}
          <AnimatedElement className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow" variant="fadeInUp" delay={1.4} duration={0.5}>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Department Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Avg Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Bookmarked
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {departmentData.map((dept) => (
                    <tr key={dept.department} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {dept.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {dept.employeeCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <span className="mr-2">{dept.averageRating}</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= parseFloat(dept.averageRating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {dept.bookmarkedCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedElement>
        </div>
      </AppWrapper>
    </div>
  );
} 