'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useHRStore } from '@/lib/store';
import { generatePerformanceHistory, generateProjects, generateFeedback } from '@/lib/api';
import { PerformanceHistory, Project, Feedback } from '@/types';
import Navigation from '@/components/Navigation';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import { useDarkMode } from '@/hooks/useDarkMode';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  TrendingUp,
  Bookmark,
  Star,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

type TabType = 'overview' | 'projects' | 'feedback';

export default function EmployeeDetail() {
  const params = useParams();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  
  const { employees, toggleBookmark, bookmarkedEmployees } = useHRStore();
  const employeeId = parseInt(params.id as string);
  const employee = employees.find(emp => emp.id === employeeId);
  const isBookmarked = bookmarkedEmployees.some(emp => emp.id === employeeId);
  
  useEffect(() => {
    if (employeeId) {
      setPerformanceHistory(generatePerformanceHistory(employeeId));
      setProjects(generateProjects());
      setFeedback(generateFeedback());
    }
  }, [employeeId]);
  
  const handleBookmark = () => {
    if (employee) {
      toggleBookmark(employee.id);
    }
  };
  
  const handlePromote = () => {
    alert(`Promotion request sent for ${employee?.firstName} ${employee?.lastName}`);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'on-hold':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };
  
  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Employee not found
            </h1>
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
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
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </h1>
                  <Badge 
                    variant={employee.performance >= 4 ? 'success' : employee.performance >= 3 ? 'warning' : 'danger'}
                  >
                    {employee.performance}/5 Rating
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Building className="w-4 h-4" />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{employee.age} years old</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                  variant={isBookmarked ? 'primary' : 'outline'}
                  onClick={handleBookmark}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button variant="primary" onClick={handlePromote}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Promote
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'projects', label: 'Projects' },
                { id: 'feedback', label: 'Feedback' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Bio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {employee.bio}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Address
                  </h3>
                  <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <div>
                      <p>{employee.address.address}</p>
                      <p>{employee.address.city}, {employee.address.state} {employee.address.postalCode}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance History
                  </h3>
                  <div className="space-y-3">
                    {performanceHistory.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{record.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{record.feedback}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Reviewed by {record.reviewer}</p>
                        </div>
                        <Rating rating={record.rating} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <span>Started: {formatDate(project.startDate)}</span>
                      {project.endDate && <span>Ended: {formatDate(project.endDate)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            item.type === 'positive' ? 'success' : 
                            item.type === 'constructive' ? 'warning' : 'default'
                          }
                          size="sm"
                        >
                          {item.type}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          from {item.from}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 