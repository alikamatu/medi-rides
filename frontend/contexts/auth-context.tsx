'use client';

import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [accessToken, setAccessToken] = useLocalStorage<string | null>('access_token', null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refresh_token', null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    if (accessToken && !user) {
      loadUserProfile();
    }
  }, [accessToken]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const userProfile = await authService.getProfile();
      setUser(userProfile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // Clear invalid tokens
      setAccessToken(null);
      setRefreshToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      setAccessToken(response.tokens.access_token);
      setRefreshToken(response.tokens.refresh_token);
      setUser(response.user);
      navigation.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.register(credentials);
      
      setAccessToken(response.tokens.access_token);
      setRefreshToken(response.tokens.refresh_token);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsLoading(false);
    }
  };

  const refreshAuthToken = async () => {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const tokens = await authService.refreshToken(refreshToken);
      setAccessToken(tokens.access_token);
      setRefreshToken(tokens.refresh_token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    login,
    register,
    logout,
    refreshToken: refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};