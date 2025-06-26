import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useHRStore } from '@/lib/store';
import Button from './ui/Button';

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
    setSearchQuery('');
  };
  
  const hasActiveFilters = searchQuery || departmentFilter.length > 0 || ratingFilter.length > 0;
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {(departmentFilter.length > 0 || ratingFilter.length > 0) && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {departmentFilter.length + ratingFilter.length}
            </span>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
          {/* Department Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </h3>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => handleDepartmentToggle(dept)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    departmentFilter.includes(dept)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
          
          {/* Rating Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Performance Rating
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingToggle(rating)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    ratingFilter.includes(rating)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {rating} Star{rating !== 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter; 