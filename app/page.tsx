'use client';
import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useLogStore } from './store/logStore';
import Form from './ui/form/form';
import TableComponent from './ui/table/table';

export default function Home() {
  const { records } = useLogStore();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <Grid container>
          <Grid size={{ xs: 12, md: 4 }} className="p-4">
            <Form />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} className="p-4">
            <TableComponent
              title="Bitácora"
              structureTable={{
                headers: ['Fecha', 'Operador', 'Unidad', 'Destino'],
                rowsData: records,
              }}
            />
          </Grid>
        </Grid>
      </main>
    </LocalizationProvider>
  );
}
