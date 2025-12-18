export const ExtractHoursAndMinuts = (time: string) => {
  return time.split(':').map(Number);
};

export const ConstructLocalDate = (date: Date, time: number[]) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1], 0, 0);
};

export const ConvertFromLocalToIso = (localDate: Date) => {
  return localDate.toISOString();
};
