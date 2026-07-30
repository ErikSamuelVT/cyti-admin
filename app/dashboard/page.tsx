'use client';
import { Grid } from '@mui/material';

import TableComponent from '@/app/ui/table/table';

export default function Dashboard() {
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, md: 3 }} className="p-4">
          <TableComponent
            title="Viajes por operador"
            headers={['Operador', 'Número de viajes']}
            tableType="operators"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} className="p-4">
          <TableComponent
            title="Viajes por unidad"
            headers={['Unidad', 'Número de viajes']}
            tableType="units"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} className="p-4">
          <TableComponent
            title="Viajes por destino"
            headers={['Destino', 'Número de viajes']}
            tableType="destinations"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} className="p-4">
          <TableComponent
            title="Viajes por número de tiros"
            headers={['Número de tiros', 'Viajes']}
            tableType="refrigeratedTrips"
          />
        </Grid>
      </Grid>
    </>
  );
}
