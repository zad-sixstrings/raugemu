import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
 
  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('token');
  }

  function initializeAuth() {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Here you would typically:
      // 1. Validate the token
      // 2. Fetch the user data from your API
      // 3. Set the user in the store
      
      // For now, we'll just set a basic user object
      // Replace this with actual API call to get user data
      try {
        // You can add your API call here
        // const response = await fetchUserProfile(token);
        // setUser(response.data);
        
        // Temporary solution until you add the API call:
        setUser({
          id: 'temp-id',
          username: 'temp-username',
          email: 'temp-email'
        } as User);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        logout(); // Clear invalid token/user data
      }
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
    initializeAuth, // Don't forget to expose the new method
  };
});