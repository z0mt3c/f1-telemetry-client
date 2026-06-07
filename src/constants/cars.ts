/**
 * Number of cars present in per-car packet arrays for a given packet format.
 * 2026 raised the grid from 22 to 24 (cs_maxNumCarsInUDPData).
 */
export const carCount = (packetFormat: number): number => (packetFormat >= 2026 ? 24 : packetFormat >= 2020 ? 22 : 20)
