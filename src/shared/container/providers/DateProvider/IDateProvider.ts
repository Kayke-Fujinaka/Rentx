interface IDateProvider {
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  convertToUTC(date: Date): string;
}

export { IDateProvider };
