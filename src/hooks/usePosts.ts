import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Post {
  id: string;
  title: string;
  content: string;
  division: string;
  district: string;
  upazila: string;
  category_id: string;
  subcategory_id: string;
  author_id: string;
  phone?: string;
  image_url?: string;
  status: string;
  views: number;
  likes: number;
  comments: number;
  created_at: string;
  approved_at?: string;
  feedback?: string;
  profiles?: {
    display_name: string;
  };
  categories?: {
    name: string;
    name_en: string;
  };
  subcategories?: {
    name: string;
    name_en: string;
  };
}

interface PostFilters {
  category_id?: string;
  subcategory_id?: string;
  division?: string;
  district?: string;
  upazila?: string;
  search?: string;
  status?: string;
}

export const usePosts = (filters: PostFilters = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_author_id_fkey (display_name),
          categories!posts_category_id_fkey (name, name_en),
          subcategories!posts_subcategory_id_fkey (name, name_en)
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      } else {
        // Default to approved posts only
        query = query.eq('status', 'approved');
      }

      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      if (filters.subcategory_id) {
        query = query.eq('subcategory_id', filters.subcategory_id);
      }

      if (filters.division) {
        query = query.eq('division', filters.division);
      }

      if (filters.district) {
        query = query.eq('district', filters.district);
      }

      if (filters.upazila) {
        query = query.eq('upazila', filters.upazila);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId: string, updates: Partial<Post>) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId);

      if (error) throw error;

      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      ));

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const likePost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    return updatePost(postId, { likes: post.likes + 1 });
  };

  const viewPost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    return updatePost(postId, { views: post.views + 1 });
  };

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    updatePost,
    likePost,
    viewPost
  };
};