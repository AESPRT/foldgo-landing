'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  referenceNumber?: string;
  planId?: string;
  billingCycle?: string;
  smsCreditBalance?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Resolve your baseline configuration URL path structure
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      
      // 2. Fetch targeting the explicitly mounted /v1/laundry module system path configuration
      const response = await fetch(`${baseUrl}/v1/laundry/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // 3. Fallback extraction utilizing the backend controller signature property structure
        throw new Error(data.error || 'Login verification rejected.');
      }

      // 4. Extract data payload properties to match incoming database keys
      const loggedUser: User = {
        id: data.operator.id,
        email: data.operator.email,
        name: data.operator.name,
        referenceNumber: data.operator.referenceNumber,
        planId: data.operator.planId,
        billingCycle: data.operator.billingCycle,
        smsCreditBalance: data.operator.smsCreditBalance
      };

      setUser(loggedUser);
      setToken(data.token);
      
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(loggedUser));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  const value: AuthContextType = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be run inside an AuthProvider');
  return context;
};