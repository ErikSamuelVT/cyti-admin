import { operators, units } from './constants';
import { OperatorTrip, TableLog, UnitTrip } from './interfaces';

export const getTripsByUnits = (records: TableLog[]): UnitTrip[] => {
  const counts = records.reduce<Record<string, number>>((acc, item) => {
    acc[item.unit] = (acc[item.unit] || 0) + 1;
    return acc;
  }, {});

  return units
    .map((unit) => ({ unit, trips: counts[unit] || 0 }))
    .sort((a, b) => b.trips - a.trips);
};

export const getTripsByOperators = (records: TableLog[]): OperatorTrip[] => {
  const counts = records.reduce<Record<string, number>>((acc, item) => {
    acc[item.operator] = (acc[item.operator] || 0) + 1;
    return acc;
  }, {});

  return operators
    .map((operator) => ({ operator, trips: counts[operator] || 0 }))
    .sort((a, b) => b.trips - a.trips);
};
