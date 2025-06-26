import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getPerformanceColor(rating: number): string {
  if (rating >= 4) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
  if (rating >= 3) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
  return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'completed':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    case 'on-hold':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
  }
} 