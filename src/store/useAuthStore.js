import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authenticated: false,
  hasPermissions: false,
  token: null,
  setAuthenticated: (value) => set({ authenticated: value }),
  setHasPermissions: (value) => set({ hasPermissions: value }),
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
