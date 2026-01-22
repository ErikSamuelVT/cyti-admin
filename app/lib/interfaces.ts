import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

export interface TableLog {
  type: 'log';
  id: string;
  date: string | null;
  operator: string;
  unit: string;
  destinity: string;
  nDestinations?: number;
}

interface Trips {
  trips: number;
}

export interface OperatorTrip extends Trips {
  operator: string;
}

export interface UnitTrip extends Trips {
  unit: string;
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
