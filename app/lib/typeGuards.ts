import { TableLog, TableOperators, TableUnits } from './interfaces';

export function isTableLogArray(rowsData: any[]): rowsData is TableLog[] {
  return 'date' in (rowsData[0] ?? {});
}

export function isTableOperatorsArray(rowsData: any[]): rowsData is TableOperators[] {
  return 'nTrips' in (rowsData[0] ?? {});
}

export function isTableUnitsArray(rowsData: any[]): rowsData is TableUnits[] {
  return 'nTripsUnit' in (rowsData[0] ?? {});
}
