'use client';
import { Grid } from '@mui/material';
import { useState } from 'react';

import PayrollBox from '../ui/box/payrollBox';
import PayRollForm from '../ui/forms/payrollForm';

export default function PayRoll() {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 4 }} className="p-4">
        <PayRollForm start={start} setStart={setStart} end={end} setEnd={setEnd} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} className="p-4">
        <PayrollBox start={start} end={end} />
      </Grid>
    </Grid>
  );
}
