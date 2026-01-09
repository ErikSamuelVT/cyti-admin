import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TableLog } from '../lib/interfaces';

type Store = {
  records: TableLog[];
  addRecord: (record: TableLog) => void;
};

export const useLogStore = create<Store>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (record: TableLog) =>
        set((state) => {
          const newRecords = [...state.records, record].sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          return { records: newRecords };
        }),
    }),
    {
      name: 'logs-storage',
    },
  ),
);
