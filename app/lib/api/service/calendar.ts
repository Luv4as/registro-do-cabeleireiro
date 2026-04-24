import type { AppointmentData, CalendarDatesResponse } from "../../types/calendar";

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

export async function createCalendarEvent(data: AppointmentData){
  const response = await fetch("/api/google-calendar/dates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const fallback = response.status + " " + response.statusText;
    let message = fallback;
    try{
      const payload = (await response.json()) as { error?: string};
      if (payload.error) message = payload.error;
    }catch{}

    throw new Error("Erro ao criar agendamento: " + message);
  }

  return response.json();
}
