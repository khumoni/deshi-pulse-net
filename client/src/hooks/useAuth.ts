import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    // For now, just simulate successful signup
    const mockUser = { id: '1', email };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    return { data: mockUser, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // For now, just simulate successful login
    const mockUser = { id: '1', email };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    return { data: mockUser, error: null };
  };

  const signOut = async () => {
    localStorage.removeItem('user');
    setUser(null);
    return { error: null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };
};