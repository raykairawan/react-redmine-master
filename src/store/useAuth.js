import { create } from 'zustand';

const useAuth = create((set) => ({
  auth: null,
  isPreload: true,
  setAuth: (authData) => set({ auth: authData }),
  setIsPreload: () => set({ isPreload: false }),
}));

export default useAuth;