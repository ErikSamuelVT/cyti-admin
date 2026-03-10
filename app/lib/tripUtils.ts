import { operators, units } from './constants';
import { OperatorTrip, TableLog, UnitTrip } from './interfaces';

export const getTripsByUnits = (records: TableLog[]): UnitTrip[] => {
  return units
    .map((unit) => ({
      unit,
      trips: records.filter((item) => item.unit === unit).length,
    }))
    .sort((a, b) => b.trips - a.trips);
};

export const getTripsByOperators = (records: TableLog[]): OperatorTrip[] => {
  return operators
    .map((operator) => ({
      operator,
      trips: records.filter((item) => item.operator === operator).length,
    }))
    .sort((a, b) => b.trips - a.trips);
};
