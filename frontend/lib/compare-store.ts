import { create } from 'zustand';

interface CollegeCompare {
  id: string;
  name: string;
  slug: string;
}

interface CompareStore {
  colleges: CollegeCompare[];
  addCollege: (college: CollegeCompare) => void;
  removeCollege: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  colleges: [],
  addCollege: (college) => {
    const { colleges } = get();
    if (colleges.length >= 3) return;
    if (colleges.find((c) => c.id === college.id)) return;
    set({ colleges: [...colleges, college] });
  },
  removeCollege: (id) => {
    set({ colleges: get().colleges.filter((c) => c.id !== id) });
  },
  clearAll: () => set({ colleges: [] }),
  isInCompare: (id) => {
    return get().colleges.some((c) => c.id === id);
  },
}));
