import { destinations } from './constants';
import { DestinationTrip, RefrigeratedTrip, TableLog } from './interfaces';

const refrigeratedDestinies = ['Puebla refrigerado', 'Tlapa refrigerado'];

export const getTripsByDestination = (records: TableLog[]): DestinationTrip[] => {
  return destinations
    .map((destiny) => ({
      destiny,
      trips: records.filter((item) => item.destiny === destiny).length,
    }))
    .sort((a, b) => b.trips - a.trips);
};

export const getRefrigeratedTripsByNDestinations = (
  records: TableLog[],
): RefrigeratedTrip[] => {
  const refrigerated = records.filter((item) => refrigeratedDestinies.includes(item.destiny));

  const counts: Record<string, number> = { '1': 0, '2': 0, '3+': 0 };

  refrigerated.forEach((item) => {
    const n = item.nDestinations ?? 0;
    const key = n >= 3 ? '3+' : String(n);
    if (counts[key] !== undefined) counts[key]++;
  });

  return Object.entries(counts).map(([nDestinations, trips]) => ({
    nDestinations,
    trips,
  }));
};
