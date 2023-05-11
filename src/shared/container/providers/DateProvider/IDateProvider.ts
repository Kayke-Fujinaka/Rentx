interface IDateProvider {
  dateNow(): Date;
  addDays(days: number): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
}

export { IDateProvider };
