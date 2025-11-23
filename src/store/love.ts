import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoveItem = {
  id: string;
};

type LoveStore = {
  loves: LoveItem[];
  toggleLove: (LoveItem: LoveItem) => void;
  clearLoveList: () => void;
  getLoveCount: () => number;
};

export const useLoveStore = create<LoveStore>()(
  persist(
    (set, get) => ({
      loves: [],
      toggleLove: (i) =>
        set((state) => {
          const exist = state.loves.some((item) => item.id === i.id);
          if (exist)
            return { loves: state.loves.filter((item) => item.id !== i.id) };
          return { loves: [...state.loves, i] };
        }),
      clearLoveList: () =>
        set(() => {
          return { loves: [] };
        }),
      getLoveCount: () => get().loves.length,
    }),
    { name: 'love-list' }
  )
);
