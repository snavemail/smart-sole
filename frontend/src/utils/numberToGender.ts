export const numberToGender = (number: number) => {
  switch (number) {
    case 0:
      return 'Male';
    case 1:
      return 'Female';
    case 2:
      return 'Other';
    case 3:
      return 'Prefer not to say';
    default:
      return 'Unknown';
  }
};
