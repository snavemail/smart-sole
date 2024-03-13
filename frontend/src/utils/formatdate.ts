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
