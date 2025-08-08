import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface Post {
  id: string;
  title: string;
  content: string;
  division: string;
  district: string;
  upazila: string;
  categoryId: string;
  subcategoryId: string;
  authorId: string;
  phone?: string;
  imageUrl?: string;
  status: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
  // Related data
  author: {
    displayName: string;
  };
  category: {
    name: string;
    nameEn: string;
  };
  subcategory: {
    name: string;
    nameEn: string;
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
  const queryClient = useQueryClient();
  
  // Build query parameters
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  
  const queryString = params.toString();
  const url = `/api/posts${queryString ? `?${queryString}` : ''}`;

  const {
    data: posts = [],
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['/api/posts', filters],
    queryFn: () => apiRequest(url),
  });

  // Like post mutation
  const likePostMutation = useMutation({
    mutationFn: (postId: string) => apiRequest(`/api/posts/${postId}/like`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    }
  });

  // View post mutation
  const viewPostMutation = useMutation({
    mutationFn: (postId: string) => apiRequest(`/api/posts/${postId}/view`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    }
  });

  const likePost = async (postId: string) => {
    try {
      await likePostMutation.mutateAsync(postId);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to like post' };
    }
  };

  const viewPost = async (postId: string) => {
    try {
      await viewPostMutation.mutateAsync(postId);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to update view count' };
    }
  };

  return {
    posts,
    loading,
    error: error?.message || null,
    likePost,
    viewPost
  };
};