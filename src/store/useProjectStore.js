import { create } from 'zustand';

const useProjectStore = create((set) => ({
  name: '',
  identifier: '',
  description: '',
  is_public: false,

  setProjectName: (name) => set({ name }),
  setProjectIdentifier: (identifier) => set({ identifier }),
  setProjectDescription: (description) => set({ description }),
  setProjectIsPublic: (isPublic) => set({ is_public: isPublic }),
  resetProjectData: () => set({
    name: '', identifier: '', description: '', is_public: false,
  }),
}));

export default useProjectStore;
