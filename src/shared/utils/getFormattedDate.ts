export const getFormattedDate = (date: Date | null) => {
  if (!date) return null;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayStr = day < 10 ? `0${day}` : `${day}`;
  const monthStr = month < 10 ? `0${month}` : `${month}`;

  return `${dayStr}.${monthStr}.${year}`;
};
