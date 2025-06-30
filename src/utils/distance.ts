/**
 * Calculate the Haversine distance between two geographic points
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in kilometers
 */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate Euclidean distance (simplified for geographic coordinates)
 */
export function euclideanDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  return Math.sqrt(dLat * dLat + dLng * dLng) * 111; // Approximate km per degree
}

/**
 * Calculate Manhattan distance (simplified for geographic coordinates)
 */
export function manhattanDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = Math.abs(lat2 - lat1);
  const dLng = Math.abs(lng2 - lng1);
  return (dLat + dLng) * 111; // Approximate km per degree
}