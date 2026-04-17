import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

function getServiceAccountKey() {
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!rawKey) {
    return undefined;
  }

  const normalized = rawKey
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");

  const keyBody = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const wrappedBody = keyBody.match(/.{1,64}/g)?.join("\n") ?? keyBody;

  return `-----BEGIN PRIVATE KEY-----\n${wrappedBody}\n-----END PRIVATE KEY-----\n`;
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
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = getServiceAccountKey();
  const year = parseYear(new URL(request.url).searchParams.get("year"));

  if (!calendarId || !clientEmail || !privateKey) {
    return NextResponse.json(
      { error: "Configuracao do Google Calendar incompleta no .env" },
      { status: 500 }
    );
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

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
