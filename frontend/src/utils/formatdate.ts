export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const formattedDate = `${date.toLocaleDateString('en-US', options)}`;
  return formattedDate;
};

export function convertTimestampToDatetime(timestamp: number) {
  const seconds = timestamp / 1000;
  const date = new Date(seconds);
  const isoString = date.toISOString();
  return isoString;
}
