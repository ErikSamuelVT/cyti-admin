'use client';

import 'dayjs/locale/es';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

import ThemeRegistry from './theme-registry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        {children}
      </LocalizationProvider>
    </ThemeRegistry>
  );
}
