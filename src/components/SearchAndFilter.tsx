'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useHRStore } from '@/lib/store';
import Button from './ui/Button';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Product'
];

const SearchAndFilter: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    departmentFilter, 
    setDepartmentFilter,
    ratingFilter,
    setRatingFilter 
  } = useHRStore();
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleDepartmentToggle = (dept: string) => {
    if (departmentFilter.includes(dept)) {
      setDepartmentFilter(departmentFilter.filter(d => d !== dept));
    } else {
      setDepartmentFilter([...departmentFilter, dept]);
    }
  };
  
  const handleRatingToggle = (rating: number) => {
    if (ratingFilter.includes(rating)) {
      setRatingFilter(ratingFilter.filter(r => r !== rating));
    } else {
      setRatingFilter([...ratingFilter, rating]);
    }
  };
  
  const clearFilters = () => {
    setDepartmentFilter([]);
    setRatingFilter([]);
    toast.success('Filters cleared');
    setSearchQuery('');
  };
  
  const hasActiveFilters = searchQuery || departmentFilter.length > 0 || ratingFilter.length > 0;
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </motion.div>
      
      {/* Filter Toggle */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Filter className="w-4 h-4" />
          </motion.div>
          Filters
          {(departmentFilter.length > 0 || ratingFilter.length > 0) && (
            <motion.span 
              className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {departmentFilter.length + ratingFilter.length}
            </motion.span>
          )}
        </Button>
        
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="cursor-pointer hover:text-gray-700  dark:hover:text-gray-200 bg-gradient-to-r from-red-500 via-red-600 to-red-700 border-red-700 bg-red-100 hover:bg-red-200 text-gray-900 dark:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4 overflow-hidden"
          >
            {/* Department Filter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                Department
              </h3>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept, index) => (
                  <motion.button
                    key={dept}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.2 + (index * 0.05),
                      type: "spring",
                      stiffness: 300
                    }}
                    onClick={() => handleDepartmentToggle(dept)}
                    className={`px-3 py-1 rounded-sm text-xs font-medium transition-colors ${
                      departmentFilter.includes(dept)
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {dept}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Rating Filter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                Performance Rating
              </h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((rating, index) => (
                  <motion.button
                    key={rating}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.3 + (index * 0.05),
                      type: "spring",
                      stiffness: 300
                    }}
                    onClick={() => handleRatingToggle(rating)}
                    className={`px-3 py-1 rounded-sm text-xs font-medium transition-colors ${
                      ratingFilter.includes(rating)
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilter; 