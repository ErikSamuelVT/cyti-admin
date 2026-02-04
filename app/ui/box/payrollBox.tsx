'use client';
import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

import { usePayrollStore } from '@/app/store/payrollStore';

export default function PayrollBox() {
  const { payroll } = usePayrollStore();

  const timestampDate = Date.now();
  const currentDate = new Date(timestampDate);
  const now = currentDate.getDate();
  currentDate.setDate(currentDate.getDay() - 6);
  const startDate = currentDate.getDate();

  return (
    <>
      <h3 className="text-2xl font-semibold">Nómina</h3>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: 3,
          p: 3,
          mt: 1,
          maxHeight: '520px',
          overflowY: 'auto',
        }}
      >
        {payroll.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography>Buen día, esta es la nomina de la semana</Typography>
            <Typography>
              Del {`${startDate}`} al {`${now}`} de enero 2026
            </Typography>
          </Box>
        )}

        {payroll.length > 0 ? (
          payroll.map((pr) => (
            <Stack key={pr.operator}>
              <Typography>
                {pr.operator}: {pr.summary}
              </Typography>

              <List>
                {pr.tripsByDay.map((trip) => (
                  <ListItem key={trip} disablePadding>
                    <ListItemText primary={`${trip}`} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          ))
        ) : (
          <Typography>No hay nómina generada aún.</Typography>
        )}
      </Box>
    </>
  );
}
