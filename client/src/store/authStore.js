import { create } from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  
  login: async (data) => {
    const user = await authService.login(data);
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },

  register: async (data) => {
    const user = await authService.register(data);
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  }
}));

export default useAuthStore;
