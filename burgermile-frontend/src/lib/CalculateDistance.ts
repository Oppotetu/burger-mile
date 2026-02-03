export function calculateDistance(
  lng2: number,
  lng1: number,
  lat2: number,
  lat1: number
): number {
  return Number(
    Math.round(
      Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2)) * 1000
    ) / 10
  )
}
