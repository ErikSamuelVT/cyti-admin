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

  const startParts = start.split('/');
  const endParts = end.split('/');
  const startDate = startParts.length === 3 ? new Date(+startParts[0], +startParts[1] - 1, +startParts[2]) : null;
  const endDate = endParts.length === 3 ? new Date(+endParts[0], +endParts[1] - 1, +endParts[2]) : null;

  const isSameMonth = startDate && endDate && startDate.getMonth() === endDate.getMonth();

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
        {payroll.length > 0 && startDate && endDate && (
          <Box sx={{ mb: 2 }}>
            <Typography>Buen día, esta es la nómina de la semana</Typography>
            <Typography>
              {isSameMonth
                ? `Del ${startDate.getDate()} al ${endDate.getDate()} de ${months[startDate.getMonth()]} del ${startDate.getFullYear()}`
                : `Del ${startDate.getDate()} de ${months[startDate.getMonth()]} al ${endDate.getDate()} de ${months[endDate.getMonth()]} del ${endDate.getFullYear()}`}
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
