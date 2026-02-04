import { create } from 'zustand';

import { OperatorResult } from '../lib/interfaces';

type Store = {
  payroll: OperatorResult[];
  addPayroll: (payroll: OperatorResult[]) => void;
};

export const usePayrollStore = create<Store>()((set) => ({
  payroll: [],
  addPayroll: (payroll: OperatorResult[]) => set({ payroll }),
}));
