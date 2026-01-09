'use client';
import { Grid } from '@mui/material';

import TableComponent from '@/app/ui/table/table';

import { getTripsByOperators, getTripsByUnits } from '../lib/getNTrips';
import { useLogStore } from '../store/logStore';

export default function Dashboard() {
  const { records } = useLogStore();

  const operator = getTripsByOperators(records);
  const units = getTripsByUnits(records);

  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }} className="p-4">
          <TableComponent
            title="Viajes por operador"
            structureTable={{
              headers: ['Operador', 'Número de viajes'],
              rowsData: operator,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} className="p-4">
          <TableComponent
            title="Viajes por unidad"
            structureTable={{
              headers: ['Unidad', 'Número de viajes'],
              rowsData: units,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
