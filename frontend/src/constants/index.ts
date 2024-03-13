interface ShoeSize {
  us: number;
  eu: number;
  uk: number;
  inches: number;
  cm: number;
}

export const shoeSizes: Record<number, ShoeSize> = {
  6: { us: 6, eu: 39, uk: 5.5, inches: 9.25, cm: 23.5 },
  6.5: { us: 6.5, eu: 39, uk: 6, inches: 9.5, cm: 24.1 },
  7: { us: 7, eu: 40, uk: 6.5, inches: 9.625, cm: 24.4 },
  7.5: { us: 7.5, eu: 40, uk: 7, inches: 9.75, cm: 24.8 }, // This line might need correction
  8: { us: 8, eu: 41, uk: 7.5, inches: 9.9375, cm: 25.4 },
  8.5: { us: 8.5, eu: 41, uk: 8, inches: 10.125, cm: 25.7 }, // This line might need correction
  9: { us: 9, eu: 42, uk: 8.5, inches: 10.25, cm: 26 },
  9.5: { us: 9.5, eu: 42, uk: 9, inches: 10.4375, cm: 26.7 }, // This line might need correction
  10: { us: 10, eu: 43, uk: 9.5, inches: 10.5625, cm: 27 },
  10.5: { us: 10.5, eu: 43, uk: 10, inches: 10.75, cm: 27.3 }, // This line might need correction
  11: { us: 11, eu: 44, uk: 10.5, inches: 10.9375, cm: 27.9 },
  11.5: { us: 11.5, eu: 44, uk: 11, inches: 11.125, cm: 28.3 }, // This line might need correction
  12: { us: 12, eu: 45, uk: 11.5, inches: 11.25, cm: 28.6 },
  13: { us: 13, eu: 46, uk: 12.5, inches: 11.5625, cm: 29.4 },
  14: { us: 14, eu: 47, uk: 13.5, inches: 11.875, cm: 30.2 },
  15: { us: 15, eu: 48, uk: 14.5, inches: 12.1875, cm: 31 },
  16: { us: 16, eu: 49, uk: 15.5, inches: 12.5, cm: 31.8 },
};

export const usSizes: number[] = Object.values(shoeSizes)
  .map(size => size.us)
  .sort((a, b) => a - b);

export const euSizes: number[] = Object.values(shoeSizes)
  .map(size => size.eu)
  .sort((a, b) => a - b);

export const ukSizes: number[] = Object.values(shoeSizes)
  .map(size => size.uk)
  .sort((a, b) => a - b);

export const cmSizes: number[] = Object.values(shoeSizes)
  .map(size => size.cm)
  .sort((a, b) => a - b);
