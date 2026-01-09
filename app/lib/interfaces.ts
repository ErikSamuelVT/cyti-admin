import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

export interface TableLog {
  id: string;
  date: string | null;
  operator: string;
  unit: string;
  destinity: string;
  nDestinations?: number;
}

export interface TableOperators {
  id: string;
  operator: string;
  nTrips: number;
}

export interface TableUnits {
  id: string;
  unit: string;
  nTripsUnit: number;
}

export interface SelectElementProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => void;
  elements: string[];
}
