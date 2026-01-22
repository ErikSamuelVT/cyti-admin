'use client';
import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

import { TableLog } from './lib/interfaces';
import Form from './ui/form/form';
import TableComponent from './ui/table/table';

export default function Home() {
  const [recordToUpdate, setRecordToUpdate] = useState<TableLog | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main>
        <Grid container>
          <Grid size={{ xs: 12, md: 4 }} className="p-4">
            <Form recordToUpdate={recordToUpdate} setRecordToUpdate={setRecordToUpdate} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} className="p-4">
            <TableComponent
              title="Bitácora"
              headers={['Fecha', 'Operador', 'Unidad', 'Destino']}
              tableType="log"
              setRecordToUpdate={setRecordToUpdate}
            />
          </Grid>
        </Grid>
      </main>
    </LocalizationProvider>
  );
}
