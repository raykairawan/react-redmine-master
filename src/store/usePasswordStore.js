import { create } from 'zustand';

const usePasswordStore = create((set) => ({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  passwordError: '',
  successMessage: '',

  setOldPassword: (value) => set({ oldPassword: value }),
  setNewPassword: (value) => set({ newPassword: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),
  setPasswordError: (error) => set({ passwordError: error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
}));

export default usePasswordStore;
