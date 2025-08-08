import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
  categoryId: string;
}

export const useCategories = () => {
  const {
    data: categories = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: () => apiRequest('/api/categories'),
  });

  return {
    categories,
    loading,
    error: error?.message || null,
    refetch
  };
};