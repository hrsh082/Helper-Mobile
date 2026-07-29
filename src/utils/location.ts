export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineDistanceKm(
  a: { lat: number; lon: number } | null,
  b: { lat: number; lon: number } | null
): number {
  if (!a || !b) return Infinity;

  const aLat = typeof a.lat === 'string' ? parseFloat(a.lat) : a.lat;
  const aLon = typeof a.lon === 'string' ? parseFloat(a.lon) : a.lon;
  const bLat = typeof b.lat === 'string' ? parseFloat(b.lat) : b.lat;
  const bLon = typeof b.lon === 'string' ? parseFloat(b.lon) : b.lon;

  if (isNaN(aLat) || isNaN(aLon) || isNaN(bLat) || isNaN(bLon)) return Infinity;

  const R = 6371; // Earth radius in km
  const dLat = toRadians(bLat - aLat);
  const dLon = toRadians(bLon - aLon);
  const lat1 = toRadians(aLat);
  const lat2 = toRadians(bLat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return 'Not selected';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDisplayTime(timeStr: string): string {
  if (!timeStr) return 'Not selected';
  if (timeStr === 'morning') return 'Morning (8 AM - 12 PM)';
  if (timeStr === 'afternoon') return 'Afternoon (12 PM - 4 PM)';
  if (timeStr === 'evening') return 'Evening (4 PM - 8 PM)';
  return timeStr;
}
