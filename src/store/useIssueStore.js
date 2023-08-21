import { create } from 'zustand';

const useIssueStore = create((set) => ({
  tracker: '',
  subject: '',
  description: '',
  priority: '',
  started: '',
  dueDate: '',
  done: '',
  trackers: [],
  priorities: [],
  users: [],
  assignedTo: null,
  setField: (name, value) => {
    set({ [name]: value });
  },
  resetFields: () => set({
    tracker: '', subject: '', description: '', priority: '', started: '', dueDate: '', done: '',
  }),
}));

export default useIssueStore;
