/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in kilometers
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Sort problems by distance from a given location
 * @param problems Array of problems with place information
 * @param userLat User's latitude
 * @param userLng User's longitude
 * @param places Array of places with coordinates
 * @returns Sorted problems by distance
 */
export function sortByDistance<T extends { placeId: string }>(
  problems: T[],
  userLat: number,
  userLng: number,
  places: Array<{ id: string; lat: number; lng: number }>
): T[] {
  return problems
    .map(problem => {
      const place = places.find(p => p.id === problem.placeId);
      if (!place) return { ...problem, distance: Infinity };
      
      const distance = haversineDistance(
        userLat,
        userLng,
        place.lat,
        place.lng
      );
      
      return { ...problem, distance };
    })
    .sort((a, b) => a.distance - b.distance);
}