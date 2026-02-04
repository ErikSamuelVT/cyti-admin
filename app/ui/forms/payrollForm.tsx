'use client';

import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

import { filterByDateRange, summaryByOperator } from '@/app/lib/parseDate';
import { useLogStore } from '@/app/store/logStore';
import { usePayrollStore } from '@/app/store/payrollStore';

export default function PayRollForm() {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');

  const { records } = useLogStore();
  const { addPayroll } = usePayrollStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredRecords = filterByDateRange(records, start, end);
    const payrollGeneral = summaryByOperator(filteredRecords);
    const payrollOrdered = payrollGeneral.sort((a: any, b: any) =>
      a.operator.localeCompare(b.operator),
    );
    addPayroll(payrollOrdered);
    setStart('');
    setEnd('');
  };

  return (
    <>
      <h3 className="text-2xl font-semibold">Generar nómina</h3>
      <form className="flex flex-col gap-4 mt-2 max-h-[430]" onSubmit={handleSubmit}>
        <DatePicker
          name="to"
          label="Desde"
          value={start ? dayjs(start, 'YYYY-MM-DD') : null}
          onChange={(value) => setStart(value?.format('YYYY/MM/DD') || '')}
        />
        <DatePicker
          name="from"
          label="Hasta"
          value={end ? dayjs(end, 'YYYY/MM/DD') : null}
          onChange={(value) => setEnd(value?.format('YYYY/MM/DD') || '')}
        />
        <Button variant="contained" type="submit">
          Generar
        </Button>
      </form>
    </>
  );
}
