export type CalendarDatesResponse = {
  year: number;
  dates: string[];
  monthsWithEvents: number[];
};

export type AppointmentData = {
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientId: number;
  service: string;
}
