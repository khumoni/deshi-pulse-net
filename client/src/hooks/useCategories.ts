import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  category_id: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');

      if (subcategoriesError) throw subcategoriesError;

      // Combine categories with their subcategories and map to expected format
      const categoriesWithSubcategories = categoriesData.map(category => ({
        id: category.id,
        name: category.name,
        nameEn: category.name_en,
        icon: category.icon,
        subcategories: subcategoriesData
          .filter(sub => sub.category_id === category.id)
          .map(sub => ({
            id: sub.id,
            name: sub.name,
            nameEn: sub.name_en,
            category_id: sub.category_id
          }))
      }));

      setCategories(categoriesWithSubcategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};