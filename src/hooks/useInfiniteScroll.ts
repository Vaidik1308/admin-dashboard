import { useState,  useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useInfiniteScroll = (
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '100px', enabled = true } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !enabled) return;
    
    setIsLoading(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, enabled, onLoadMore]);

  const observer = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !enabled) return;

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && hasMore && !isLoading) {
              loadMore();
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      intersectionObserver.observe(node);

      return () => {
        intersectionObserver.disconnect();
      };
    },
    [loadMore, hasMore, isLoading, enabled, threshold, rootMargin]
  );

  return {
    observer,
    isLoading,
    hasMore,
    setHasMore,
  };
}; 