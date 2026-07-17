'use client';

import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { filterByDateRange, filterByName, summaryByOperator } from '@/app/lib/dateUtils';
import { useLogStore } from '@/app/store/logStore';
import { usePayrollStore } from '@/app/store/payrollStore';
import Title from '@/app/ui/title/title';

type PayRollFormProps = {
  start: string;
  end: string;
  setStart: (value: string) => void;
  setEnd: (value: string) => void;
};

export default function PayRollForm({ start, end, setStart, setEnd }: PayRollFormProps) {
  const { records } = useLogStore();
  const { addPayroll } = usePayrollStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredRecords = filterByDateRange(records, start, end);
    const payrollGeneral = summaryByOperator(filteredRecords);
    const payrollOrdered = filterByName(payrollGeneral);

    addPayroll(payrollOrdered);
  };

  return (
    <>
      <Title title="Generar nómina" />
      <form className="flex flex-col gap-4 mt-2 max-h-[430]" onSubmit={handleSubmit}>
        <DatePicker
          name="from"
          label="Desde"
          value={start ? dayjs(start, 'YYYY-MM-DD') : null}
          onChange={(value) => setStart(value?.format('YYYY/MM/DD') || '')}
        />
        <DatePicker
          name="to"
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
