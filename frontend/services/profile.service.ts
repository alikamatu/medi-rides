import { UpdateProfileData, ChangePasswordData, Address, EmergencyContact } from '@/types/profile.types';
import { useAuth } from '@/hooks/useAuth';

class ProfileService {
  private baseURL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

   private async fetchWithAuth(url: string, options: RequestInit = {}) {
    let token = localStorage.getItem('access_token');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    // If token is expired, try to refresh it
    if (response.status === 401) {
      try {
        const { refreshToken } = useAuth();
        await refreshToken();
        
        // Get new token and retry request
        token = localStorage.getItem('access_token');
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
          },
        });
        
        return retryResponse;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('Session expired. Please log in again.');
      }
    }

    return response;
  }

async changePassword(data: ChangePasswordData): Promise<any> {
  console.log('🔄 Sending change password request...');
  console.log('Token exists:', !!localStorage.getItem('access_token'));
  console.log('Change password data:', data);

  const response = await this.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  console.log('📨 Change password response status:', response.status);
  console.log('📨 Change password response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Change password server error response:', errorText);
    
    if (response.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.message || 'Failed to change password');
    } catch {
      throw new Error(errorText || 'Failed to change password');
    }
  }

  const result = await response.json();
  console.log('✅ Password change successful:', result);
  return result;
}

  private async handleResponse(response: Response) {
    if (!response.ok) {
      let errorMessage = 'Request failed';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`;
      } catch (e) {
        errorMessage = `HTTP error! status: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }
    
    return response.json();
  }

  async getProfile(): Promise<any> {
    const response = await fetch(`${this.baseURL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return this.handleResponse(response);
  }

  // Add this to your profile.service.ts temporarily
async testAuth(): Promise<any> {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(`${this.baseURL}/test-auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Test auth response status:', response.status);
  
  if (!response.ok) {
    throw new Error(`Test auth failed: ${response.status}`);
  }

  return response.json();
}

async updateProfile(data: UpdateProfileData) {
    console.log('🔄 Sending profile update request...');
    console.log('Token exists:', !!localStorage.getItem('access_token'));
    console.log('Data to update:', data);

    const response = await this.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    console.log('📨 Response status:', response.status);
    console.log('📨 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server error response:', errorText);
      
      if (response.status === 401) {
        throw new Error('Session expired. Please log in again.');
      }
      
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.message || 'Failed to update profile');
      } catch {
        throw new Error(errorText || 'Failed to update profile');
      }
    }

    const result = await response.json();
    console.log('✅ Profile update successful:', result);
    return result;
  }

  async getAddresses(): Promise<Address[]> {
    // This would call your addresses endpoint
    const response = await fetch(`${this.baseURL}/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch addresses');
    }

    return response.json();
  }

  async addAddress(data: Omit<Address, 'id'>): Promise<Address> {
    const response = await fetch(`${this.baseURL}/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add address');
    }

    return response.json();
  }

  async updateAddress(id: number, data: Partial<Address>): Promise<Address> {
    const response = await fetch(`${this.baseURL}/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update address');
    }

    return response.json();
  }

  async deleteAddress(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete address');
    }
  }
}

export const profileService = new ProfileService();