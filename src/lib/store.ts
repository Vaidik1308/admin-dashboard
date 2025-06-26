import { create } from 'zustand';
import { Employee } from '@/types';

interface HRStore {
  employees: Employee[];
  bookmarkedEmployees: Employee[];
  searchQuery: string;
  departmentFilter: string[];
  ratingFilter: number[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setEmployees: (employees: Employee[]) => void;
  toggleBookmark: (employeeId: number) => void;
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (departments: string[]) => void;
  setRatingFilter: (ratings: number[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  filteredEmployees: () => Employee[];
}

export const useHRStore = create<HRStore>((set, get) => ({
  employees: [],
  bookmarkedEmployees: [],
  searchQuery: '',
  departmentFilter: [],
  ratingFilter: [],
  isLoading: false,
  error: null,
  
  setEmployees: (employees) => set({ employees }),
  
  toggleBookmark: (employeeId) => {
    const { employees, bookmarkedEmployees } = get();
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (!employee) return;
    
    const isBookmarked = bookmarkedEmployees.some(emp => emp.id === employeeId);
    
    if (isBookmarked) {
      set({
        bookmarkedEmployees: bookmarkedEmployees.filter(emp => emp.id !== employeeId)
      });
    } else {
      set({
        bookmarkedEmployees: [...bookmarkedEmployees, { ...employee, isBookmarked: true }]
      });
    }
  },
  
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  setDepartmentFilter: (departmentFilter) => set({ departmentFilter }),
  
  setRatingFilter: (ratingFilter) => set({ ratingFilter }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  filteredEmployees: () => {
    const { employees, searchQuery, departmentFilter, ratingFilter } = get();
    
    return employees.filter(employee => {
      // Search filter
      const matchesSearch = !searchQuery || 
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Department filter
      const matchesDepartment = departmentFilter.length === 0 || 
        departmentFilter.includes(employee.department);
      
      // Rating filter
      const matchesRating = ratingFilter.length === 0 || 
        ratingFilter.includes(employee.performance);
      
      return matchesSearch && matchesDepartment && matchesRating;
    });
  }
})); 