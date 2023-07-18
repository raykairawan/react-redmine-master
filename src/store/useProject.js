import { create } from 'zustand';

const useProject = create((set) => ({
  projects: [],
  filteredProjects: [],
  setProjects: (projectsData) => set({ projects: projectsData }),
  setFilteredProjects: (filteredProjects) => set(() => ({ filteredProjects })),
}));

export default useProject;
