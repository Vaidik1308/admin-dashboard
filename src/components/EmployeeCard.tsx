import React from 'react';
import { Bookmark, Eye, TrendingUp, Mail, MapPin, Building, MailIcon, BookmarkCheck } from 'lucide-react';
import { Employee } from '@/types';
import Button from './ui/Button';
import Rating from './ui/Rating';
import Badge from './ui/Badge';
import { useHRStore } from '@/lib/store';
import { getPerformanceColor } from '@/lib/utils';
import AnimatedElement from './common/AnimateElement';

interface EmployeeCardProps {
  employee: Employee;
  onView: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onView }) => {
  const { toggleBookmark, bookmarkedEmployees } = useHRStore();
  const isBookmarked = bookmarkedEmployees.some(emp => emp.id === employee.id);
  
  const handleBookmark = () => {
    toggleBookmark(employee.id);
  };
  
  const handlePromote = () => {
    // Mock promotion action
    alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`);
  };
  
  return (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
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
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} /> : <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />}
          </button>
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
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handlePromote}
            className="flex-1"
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