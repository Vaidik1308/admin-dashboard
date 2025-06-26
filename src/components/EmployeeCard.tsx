'use client';

import React, { useState } from 'react';
import { Bookmark, Eye, TrendingUp, MapPin, Building, MailIcon, BookmarkCheck } from 'lucide-react';
import { Employee } from '@/types';
import Button from './ui/Button';
import Rating from './ui/Rating';
import Badge from './ui/Badge';
import { useHRStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface EmployeeCardProps {
  employee: Employee;
  onView: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onView }) => {
  const { toggleBookmark, bookmarkedEmployees } = useHRStore();
  const isBookmarked = bookmarkedEmployees.some(emp => emp.id === employee.id);
  const [isVibrating, setIsVibrating] = useState(false);
  
  const handleBookmark = () => {
    setIsVibrating(true);
    toggleBookmark(employee.id);
    
    // Reset vibration after animation completes
    setTimeout(() => {
      setIsVibrating(false);
    }, 600);
  };
  
  const handlePromote = () => {
    // Mock promotion action
    alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`);
  };
  
  return (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-none">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
              <MailIcon className="size-3 text-red-500" />
              {employee.email}
            </p>
          </div>
          <motion.button
            onClick={handleBookmark}
            animate={isVibrating ? {
              x: [-2, 2, -2, 2, -2, 2, -2, 2, 0],
              y: [-1, 1, -1, 1, -1, 1, -1, 1, 0],
              rotate: [-1, 1, -1, 1, -1, 1, -1, 1, 0],
              scale: [1, 1.1, 1, 1.1, 1, 1.1, 1, 1.05, 1]
            } : {}}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className={`md:size-6 size-5 ${isBookmarked ? 'fill-current' : ''}`} /> : <Bookmark className={`md:size-6 size-5 ${isBookmarked ? 'fill-current' : ''}`} />}
          </motion.button>
        </div>
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Building className="w-4 h-4" />
            <span>{employee.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{employee.age} years</span>
          </div>
        </div>
        
        {/* Performance Rating */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Performance Rating
            </span>
            <Badge 
              variant={employee.performance >= 4 ? 'success' : employee.performance >= 3 ? 'warning' : 'danger'}
              size="sm"
            >
              {employee.performance}/5
            </Badge>
          </div>
          <Rating rating={employee.performance} size="sm" />
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(employee.id)}
            className="flex-1 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 border-gray-700 bg-gray-100 hover:bg-gray-200 text-gray-900 dark:text-white cursor-pointer"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePromote}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 border-blue-800 bg-blue-600 hover:bg-blue-700 text-gray-900 dark:text-white cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard; 