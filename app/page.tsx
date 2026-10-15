'use client';
import { Grid } from '@mui/material';
import { useState } from 'react';

import { TableLog } from './lib/interfaces';
import RegistrationForm from './ui/forms/registrationForm';
import TableComponent from './ui/table/table';

export default function Home() {
  const [recordToUpdate, setRecordToUpdate] = useState<TableLog | null>(null);

  return (
    <main>
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }} className="p-4">
          <RegistrationForm recordToUpdate={recordToUpdate} setRecordToUpdate={setRecordToUpdate} />
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
  );
}
