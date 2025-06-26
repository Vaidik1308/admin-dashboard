import { create } from 'zustand';
import { Employee } from '@/types';
import { toast } from 'react-toastify';

interface HRStore {
  employees: Employee[];
  bookmarkedEmployees: Employee[];
  searchQuery: string;
  departmentFilter: string[];
  ratingFilter: number[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  hasMore: boolean;
  
  // Actions
  setEmployees: (employees: Employee[]) => void;
  addEmployees: (employees: Employee[]) => void;
  toggleBookmark: (employeeId: number) => void;
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (departments: string[]) => void;
  setRatingFilter: (ratings: number[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  resetPagination: () => void;
  
  // Computed
  filteredEmployees: () => Employee[];
  paginatedEmployees: () => Employee[];
}

export const useHRStore = create<HRStore>((set, get) => ({
  employees: [],
  bookmarkedEmployees: [],
  searchQuery: '',
  departmentFilter: [],
  ratingFilter: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,
  hasMore: true,
  
  setEmployees: (employees) => set({ employees, currentPage: 1, hasMore: employees.length > 12 }),
  
  addEmployees: (newEmployees) => {
    const { employees } = get();
    const updatedEmployees = [...employees, ...newEmployees];
    set({ 
      employees: updatedEmployees,
      hasMore: newEmployees.length === get().itemsPerPage
    });
  },
  
  toggleBookmark: (employeeId) => {
    const { employees, bookmarkedEmployees } = get();
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (!employee) return;
    
    const isBookmarked = bookmarkedEmployees.some(emp => emp.id === employeeId);
    
    if (isBookmarked) {
      set({
        bookmarkedEmployees: bookmarkedEmployees.filter(emp => emp.id !== employeeId)
      });
      toast.success(`${employee.firstName} ${employee.lastName} removed from bookmarks`);
    } else {
      set({
        bookmarkedEmployees: [...bookmarkedEmployees, { ...employee, isBookmarked: true }]
      });
      toast.success(`${employee.firstName} ${employee.lastName} added to bookmarks`);
    }
  },
  
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  
  setDepartmentFilter: (departmentFilter) => set({ departmentFilter, currentPage: 1 }),
  
  setRatingFilter: (ratingFilter) => set({ ratingFilter, currentPage: 1 }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  setHasMore: (hasMore) => set({ hasMore }),
  
  resetPagination: () => set({ currentPage: 1, hasMore: true }),
  
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
  },
  
  paginatedEmployees: () => {
    const { currentPage, itemsPerPage } = get();
    const filtered = get().filteredEmployees();
    return filtered.slice(0, currentPage * itemsPerPage);
  }
})); 