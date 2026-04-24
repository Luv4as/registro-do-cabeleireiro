import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

function createOAuthClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return undefined;
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });

  return auth;
}

function parseYear(value: string | null): number {
  const currentYear = new Date().getFullYear();
  const year = Number(value ?? currentYear);

  if (!Number.isInteger(year) || year < 1970 || year > 2100) {
    return currentYear;
  }

  return year;
}

export async function GET(request: Request) {
  const calendarId = process.env.CALENDAR_ID;
  const auth = createOAuthClient();
  const year = parseYear(new URL(request.url).searchParams.get("year"));

  if (!calendarId || !auth) {
    return NextResponse.json(
      { error: "Configuracao OAuth do Google Calendar incompleta no .env" },
      { status: 500 }
    );
  }

  try {
    const calendar = google.calendar({ version: "v3", auth });
    const timeMin = `${year}-01-01T00:00:00.000Z`;
    const timeMax = `${year + 1}-01-01T00:00:00.000Z`;
    const uniqueDates = new Set<string>();
    let pageToken: string | undefined;

    do {
      const response = await calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        maxResults: 2500,
        singleEvents: true,
        orderBy: "startTime",
        pageToken,
      });

      response.data.items?.forEach((event) => {
        const start = event.start?.dateTime ?? event.start?.date;
        if (!start) {
          return;
        }

        uniqueDates.add(start.slice(0, 10));
      });

      pageToken = response.data.nextPageToken ?? undefined;
    } while (pageToken);

    const dates = Array.from(uniqueDates).sort();
    const monthsWithEvents = Array.from(
      new Set(
        dates
          .map((date) => Number(date.slice(5, 7)))
          .filter((month) => Number.isInteger(month) && month >= 1 && month <= 12)
      )
    ).sort((a, b) => a - b);

    return NextResponse.json({
      year,
      dates,
      monthsWithEvents,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao consultar Google Calendar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const calendarId = process.env.CALENDAR_ID;
  const auth = createOAuthClient();

  if (!calendarId || !auth) {
    return NextResponse.json(
      { error: "Configuracao OAuth do Google Calendar incompleta no .env" },
      { status: 500 }
    );
  }

  try {

    const payload = (await request.json()) as {
      date: string;
      time: string;
      clientEmail: string;
      clientName: string;
      clientId: number;
      service: string;
    };

    if (!payload.date || !payload.time || !payload.clientName || !payload.clientEmail || !payload.service || !Number.isInteger(payload.clientId) || payload.clientId<= 0) {
      return NextResponse.json(
        {error: "Dados de agendamento inválidos"},
        {status: 400}
      );
    }

    const calendar = google.calendar({version: "v3", auth});
    const start = new Date(payload.date + "T" + payload.time + ":00");
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const response = await calendar.events.insert({
      calendarId,
      sendUpdates: "all",
      requestBody: {
        summary: payload.service + " - " + payload.clientName,
        description: "ClientID: " + payload.clientId,
        attendees: [{email: payload.clientEmail, displayName: payload.clientName}],
        start: { dateTime: start.toISOString()},
        end: { dateTime: end.toISOString() },
      },
    });

    return NextResponse.json(
      {
        id: response.data.id,
        status: response.data.status,
        start: response.data.start,
        end: response.data.end,
      },
      {status: 201}
    );    
  }catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao criar evento";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
