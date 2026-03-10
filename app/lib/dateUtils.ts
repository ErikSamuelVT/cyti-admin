import { capitalize } from '@mui/material';

import { OperatorResult, TableLog } from './interfaces';

export function parseDate(date: string) {
  const [year, month, day] = date.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export const getDayName = (date: Date) => {
  return date.toLocaleDateString('es-MX', { weekday: 'long' });
};

export const filterByDateRange = (records: TableLog[], start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return records.filter((record) => {
    const recordDate = parseDate(record.date!);
    return recordDate >= startDate && recordDate <= endDate;
  });
};

export const summaryByOperator = (records: TableLog[]): OperatorResult[] => {
  const groupByOperator: Record<string, TableLog[]> = {};

  records.forEach((record) => {
    if (!groupByOperator[record.operator]) groupByOperator[record.operator] = [];
    groupByOperator[record.operator].push(record);
  });

  return Object.entries(groupByOperator).map(([operator, trips]) => {
    const countByDestinity: Record<string, number> = {};

    trips.forEach((e) => {
      countByDestinity[e.destinity] = (countByDestinity[e.destinity] || 0) + 1;
    });

    const summary = Object.entries(countByDestinity)
      .map(([destinity, nTrips]) => `${nTrips} ${destinity}`)
      .join(', ');

    const tripsByDay = trips.map((trip) => {
      const day = getDayName(parseDate(trip.date!));
      return trip.destinity === 'Puebla refrigerado'
        ? `- ${capitalize(day)} ${trip.nDestinations} ${(trip.nDestinations ?? 0) > 1 ? 'tiros' : 'tiro'} / Tarifa ${(trip.nDestinations ?? 0) > 2 ? 'B' : 'A'}`
        : `- ${capitalize(day)} ${trip.destinity}`;
    });

    return {
      operator,
      summary,
      tripsByDay,
    };
  });
};
