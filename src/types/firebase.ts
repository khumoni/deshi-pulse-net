export interface Post {
  id: string;
  title: string;
  content: string;
  location: {
    division: string;
    district: string;
    upazila: string;
  };
  category: string;
  subcategory: string;
  authorId: string;
  authorName: string;
  phone?: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
  approvedAt?: number;
  feedback?: string;
  analytics: {
    views: number;
    likes: number;
    comments: number;
  };
}

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
}

export interface User {
  uid: string;
  email?: string;
  phone?: string;
  displayName: string;
  location: {
    division: string;
    district: string;
    upazila: string;
  };
  isVerified: boolean;
  contributionScore: number;
  createdAt: number;
}

export interface BangladeshLocation {
  divisions: {
    [key: string]: {
      name: string;
      districts: {
        [key: string]: {
          name: string;
          upazilas: string[];
        };
      };
    };
  };
}