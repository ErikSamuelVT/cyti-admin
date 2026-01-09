import { operators, units } from './constants';
import { TableLog } from './interfaces';

export const getTripsByUnits = (records: TableLog[]) => {
  return units
    .map((unit) => {
      const count = records.filter((item) => item.unit === unit).length;
      return {
        id: crypto.randomUUID(),
        unit: unit,
        nTripsUnit: count,
      };
    })
    .sort((a, b) => b.nTripsUnit - a.nTripsUnit);
};

export const getTripsByOperators = (records: TableLog[]) => {
  return operators
    .map((op) => {
      const count = records.filter((item) => item.operator === op).length;
      return {
        id: crypto.randomUUID(),
        operator: op,
        nTrips: count,
      };
    })
    .sort((a, b) => b.nTrips - a.nTrips);
};
