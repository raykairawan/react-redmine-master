import { create } from 'zustand';

const useIssues = create((set) => ({
  issues: [],
  queueIssues: [],
  doingIssues: [],
  verifiedIssues: [],
  doneIssues: [],
  selectedStatus: 'Queue',
  isLoading: false,
  setIssues: (newIssues) => set({ issues: newIssues }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setQueueIssues: (data) => set({ queueIssues: data }),
  setDoingIssues: (data) => set({ doingIssues: data }),
  setVerifiedIssues: (data) => set({ verifiedIssues: data }),
  setDoneIssues: (data) => set({ doneIssues: data }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
}));

export default useIssues;