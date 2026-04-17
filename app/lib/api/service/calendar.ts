import type { CalendarDatesResponse } from "../../types/calendar";

export async function getCalendarDates(year: number): Promise<CalendarDatesResponse> {
  const response = await fetch(`/api/google-calendar/dates?year=${year}`);

  if (!response.ok) {
    const fallbackMessage = `${response.status} ${response.statusText}`;
    let message = fallbackMessage;

    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // Keep fallback status text when response isn't JSON.
    }

    throw new Error(`Erro ao buscar datas do Google Calendar: ${message}`);
  }

  return response.json() as Promise<CalendarDatesResponse>;
}
