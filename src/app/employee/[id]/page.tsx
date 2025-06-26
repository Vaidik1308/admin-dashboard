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
import AnimatedElement from '@/components/common/AnimateElement';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  TrendingUp,
  Bookmark,
  CheckCircle,
  Clock,
  AlertCircle,
  User
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
      setPerformanceHistory(generatePerformanceHistory());
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
      <div className="min-h-screen bg-background">
        <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedElement className="text-center" variant="fadeInUp" delay={0.2} duration={0.5}>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Employee not found
            </h1>
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </AnimatedElement>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedElement className="mb-8" variant="fadeInUp" delay={0.2} duration={0.5}>
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
                <div className="flex items-start md:items-center gap-4 mb-4 md:flex-row flex-col">
                  <div className="flex items-center gap-2">
                    <User className="md:size-8 size-6 text-blue-600 dark:text-blue-400" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight flex gap-2">
                      <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                        {employee.firstName}
                      </span>
                      <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                        {employee.lastName}
                      </span>
                    </h1>
                  </div>
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
              
              <div className="flex gap-2 mt-4 md:mt-0 md:flex-row flex-col w-full">
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
        </AnimatedElement>
        
        {/* Tabs */}
        <AnimatedElement className="bg-white dark:bg-gray-800 rounded-lg shadow" variant="fadeInUp" delay={0.4} duration={0.5}>
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
              <AnimatedElement className="space-y-6" variant="fadeInUp" delay={0.6} duration={0.5}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Bio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-tight text-sm md:text-base md:leading-relaxed">
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
                    {performanceHistory.map((record, index) => (
                      <AnimatedElement
                        key={record.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        variant="fadeInUp"
                        delay={0.8 + (index * 0.1)}
                        duration={0.3}
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{record.date}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{record.feedback}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Reviewed by {record.reviewer}</p>
                        </div>
                        <Rating rating={record.rating} size="sm" />
                      </AnimatedElement>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            )}
            
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <AnimatedElement className="space-y-4" variant="fadeInUp" delay={0.6} duration={0.5}>
                {projects.map((project, index) => (
                  <AnimatedElement
                    key={project.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    variant="fadeInUp"
                    delay={0.8 + (index * 0.1)}
                    duration={0.3}
                  >
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
                  </AnimatedElement>
                ))}
              </AnimatedElement>
            )}
            
            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <AnimatedElement className="space-y-4" variant="fadeInUp" delay={0.6} duration={0.5}>
                {feedback.map((item, index) => (
                  <AnimatedElement
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    variant="fadeInUp"
                    delay={0.8 + (index * 0.1)}
                    duration={0.3}
                  >
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
                  </AnimatedElement>
                ))}
              </AnimatedElement>
            )}
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
} 