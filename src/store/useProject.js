import { create } from 'zustand';

const useProject = create((set) => ({
  projects: [],
  setProjects: (projectsData) => set({ projects: projectsData }),
}));

export default useProject;
