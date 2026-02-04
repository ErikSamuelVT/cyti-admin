import { Grid } from '@mui/material';

import PayrollBox from '../ui/box/payrollBox';
import PayRollForm from '../ui/forms/payrollForm';

export default function PayRoll() {
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 4 }} className="p-4">
        <PayRollForm />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }} className="p-4">
        <PayrollBox />
      </Grid>
    </Grid>
  );
}
