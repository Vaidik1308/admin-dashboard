import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoginCredentials, AuthState } from '@/types';
import { toast } from 'react-toastify';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  // Hydration state
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

// Dummy admin credentials for demo
const DUMMY_ADMIN = {
  email: 'admin@example.com',
  password: 'admin123',
  user: {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
};

const DUMMY_MANAGER = {
  email: 'manager@example.com',
  password: 'manager123',
  user: {
    id: '2',
    email: 'manager@example.com',
    name: 'Manager User',
    role: 'manager' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: false,

      setHydrated: (isHydrated) => set({ isHydrated }),

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check credentials against dummy data
        if (credentials.email === DUMMY_ADMIN.email && credentials.password === DUMMY_ADMIN.password) {
          set({
            user: DUMMY_ADMIN.user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          toast.success(`Welcome back, ${DUMMY_ADMIN.user.name}!`);
          return true;
        } else if (credentials.email === DUMMY_MANAGER.email && credentials.password === DUMMY_MANAGER.password) {
          set({
            user: DUMMY_MANAGER.user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          toast.success(`Welcome back, ${DUMMY_MANAGER.user.name}!`);
          return true;
        } else {
          set({
            isLoading: false,
            error: 'Invalid email or password'
          });
          toast.error('Invalid email or password');
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
        toast.success('Logged out successfully');
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
); 