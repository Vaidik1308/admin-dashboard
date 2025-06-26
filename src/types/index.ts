export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number; // 1-5 rating
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  bio: string;
  isBookmarked?: boolean;
}

export interface PerformanceHistory {
  id: number;
  date: string;
  rating: number;
  feedback: string;
  reviewer: string;
}

export interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  role: string;
  description: string;
}

export interface Feedback {
  id: number;
  date: string;
  type: 'positive' | 'constructive' | 'neutral';
  message: string;
  from: string;
}

export interface DepartmentStats {
  department: string;
  averageRating: number;
  employeeCount: number;
}

export interface BookmarkTrend {
  date: string;
  count: number;
} 