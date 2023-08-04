import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projectName: '',
  projectDescription: '',
  projectIdentifier: '',
  isPublic: false,
  projectModule: '',

  setProjectName: (name) => set({ projectName: name }),
  setProjectDescription: (description) => set({ projectDescription: description }),
  setProjectIdentifier: (identifier) => set({ projectIdentifier: identifier }),
  setIsPublic: (isPublic) => set({ isPublic }),
  setProjectModule: (module) => set({ projectModule: module }),

  resetForm: () => set({
    projectName: '',
    projectDescription: '',
    projectIdentifier: '',
    isPublic: false,
    projectModule: '',
  }),
}));

export default useProjectStore;
