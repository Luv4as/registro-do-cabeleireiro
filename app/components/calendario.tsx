"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getCalendarDates } from "../lib/api/service/calendar";
import Image from "next/image";

type CalendarCellProps = {
	dayLabel?: string;
	dayNumber?: number;
	value?: number;
	roundTopLeft?: boolean;
	roundBottomLeft?: boolean;
	hasEvent?: boolean;
};

const WEEK_DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
const MONTHS_PT = [
	"Janeiro",
	"Fevereiro",
	"Marco",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

function formatDateKey(year: number, month: number, day: number) {
	const date = new Date(Date.UTC(year, month, day));
	return date.toISOString().slice(0, 10);
}

function getVisibleGrid(year: number, month: number) {
	const firstDay = new Date(year, month, 1).getDay();
	const startDate = new Date(year, month, 1 - firstDay);

	return Array.from({ length: 35 }).map((_, index) => {
		const cellDate = new Date(startDate);
		cellDate.setDate(startDate.getDate() + index);
		return cellDate;
	});
}

function CalendarCell({
	dayLabel,
	dayNumber,
	value,
	roundTopLeft = false,
	roundBottomLeft = false,
	hasEvent = false,
}: CalendarCellProps) {
	const radiusClasses = [
		roundTopLeft ? "rounded-tl-[28px]" : "",
		roundBottomLeft ? "rounded-bl-[28px]" : "",
		hasEvent ? "bg-[#cfe3ff]" : "bg-[#d9d9d9]",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={`relative h-38.25 border border-[#c0c0c0] ${radiusClasses}`.trim()}>
			{dayLabel ? (
				<div className="absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center gap-1 text-center text-black">
					<p className="text-[10.56px] font-normal uppercase leading-none">{dayLabel}</p>
					<p className="text-[13px] font-normal leading-none">{dayNumber}</p>
				</div>
			) : (
				<p className="absolute left-1/2 top-4 -translate-x-1/2 text-[10.56px] font-normal leading-none text-black">
					{value}
				</p>
			)}
		</div>
	);
}

export default function Calendario() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentDate.getMonth());
	const [eventDates, setEventDates] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const didInitialMonthSelection = useRef(false);

	function goToPreviousMonth() {
		if (month === 0) {
			setYear((previousYear) => previousYear - 1);
			setMonth(11);
			return;
		}

		setMonth((previousMonth) => previousMonth - 1);
	}

	function goToNextMonth() {
		if (month === 11) {
			setYear((previousYear) => previousYear + 1);
			setMonth(0);
			return;
		}

		setMonth((previousMonth) => previousMonth + 1);
	}

	useEffect(() => {
		async function loadCalendarDates() {
			try {
				setLoading(true);
				setError(null);

				const response = await getCalendarDates(year);
				setYear(response.year);
				setEventDates(response.dates);

				if (!didInitialMonthSelection.current && response.monthsWithEvents.length > 0) {
					setMonth(response.monthsWithEvents[0] - 1);
					didInitialMonthSelection.current = true;
				}
			} catch (loadError) {
				const message = loadError instanceof Error ? loadError.message : "Erro ao carregar datas";
				setError(message);
			} finally {
				setLoading(false);
			}
		}

		loadCalendarDates();
	}, [year]);

	const eventDateSet = useMemo(() => new Set(eventDates), [eventDates]);
	const gridDates = useMemo(() => getVisibleGrid(year, month), [year, month]);
	const firstRow = gridDates.slice(0, 7);
	const remainingRows = gridDates.slice(7);

	return (
		<div className="w-full overflow-x-auto rounded-bl-[28px]">
			<div className="mb-3 flex items-center gap-6">
				<button
					type="button"
					onClick={goToPreviousMonth}
					className="flex justify-center items-center h-9 w-9 rounded-full border border-[#c0c0c0] bg-white text-lg leading-none text-black transition-colors hover:bg-[#efefef]"
					aria-label="Mes anterior">
					<Image src="/seta-esquerda.svg" alt="Mes anterior" width={16} height={16} />
				</button>

				<h1 className="text-2xl font-medium">
					{MONTHS_PT[month]} de {year}
				</h1>

				<button
					type="button"
					onClick={goToNextMonth}
					className="flex justify-center items-center h-9 w-9 rounded-full border border-[#c0c0c0] bg-white text-lg leading-none text-black transition-colors hover:bg-[#efefef]"
					aria-label="Proximo mes">
					<Image src="/seta-direita.svg" alt="Proximo mes" width={16} height={16} />
				</button>
			</div>

			{loading && <p className="mb-2 text-sm text-gray-600">Carregando datas do Google Agenda...</p>}
			{error && <p className="mb-2 text-sm text-red-600">{error}</p>}

			<div className="grid min-w-245 grid-cols-7" data-node-id="46:614">
				{firstRow.map((date, index) => {
					const dateKey = formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
					return (
						<CalendarCell
							key={`header-${dateKey}`}
							dayLabel={WEEK_DAYS[index]}
							dayNumber={date.getDate()}
							roundTopLeft={index === 0}
							hasEvent={eventDateSet.has(dateKey)}
						/>
					);
				})}

				{remainingRows.map((date, index) => {
					const dateKey = formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
					return (
						<CalendarCell
							key={`cell-${dateKey}`}
							value={date.getDate()}
							roundBottomLeft={index === 21}
							hasEvent={eventDateSet.has(dateKey)}
						/>
					);
				})}
			</div>
		</div>
	);
}
