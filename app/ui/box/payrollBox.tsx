'use client';
import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

import { months } from '@/app/lib/constants';
import { usePayrollStore } from '@/app/store/payrollStore';

import Title from '../title/title';

type PayrollBoxProps = {
  start: string;
  end: string;
};

export default function PayrollBox({ start, end }: PayrollBoxProps) {
  const { payroll } = usePayrollStore();

  const currentMonth = new Date().getMonth();
  const initialDate = start.split('/')[2];
  const finalDate = end.split('/')[2];

  console.log(payroll);

  return (
    <>
      <Title title="Nómina" />
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
            <Typography>Buen día, esta es la nómina de la semana</Typography>
            <Typography>
              {initialDate > finalDate
                ? `Del ${initialDate} de ${months[currentMonth - 1]} al ${finalDate} de ${months[currentMonth]} del 2026`
                : `Del ${initialDate} al ${finalDate} de ${months[currentMonth]} del 2026`}
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
