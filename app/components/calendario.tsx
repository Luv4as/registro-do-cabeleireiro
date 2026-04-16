type CalendarCellProps = {
	dayLabel?: string;
	dayNumber?: string;
	value?: string;
	roundTopLeft?: boolean;
	roundBottomLeft?: boolean;
};

const WEEK_DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

function CalendarCell({
	dayLabel,
	dayNumber,
	value,
	roundTopLeft = false,
	roundBottomLeft = false,
}: CalendarCellProps) {
	const radiusClasses = [
		roundTopLeft ? "rounded-tl-[28px]" : "",
		roundBottomLeft ? "rounded-bl-[28px]" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={`relative h-38.25 border border-[#c0c0c0] bg-[#d9d9d9] ${radiusClasses}`.trim()}>
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
	return (
		<div className="w-full overflow-x-auto rounded-bl-[28px]">
			<div className="grid min-w-245 grid-cols-7" data-node-id="46:614">
				{WEEK_DAYS.map((day, index) => (
					<CalendarCell
						key={`header-${day}`}
						dayLabel={day}
						dayNumber="29"
						roundTopLeft={index === 0}
					/>
				))}

				{Array.from({ length: 21 }).map((_, index) => (
					<CalendarCell key={`middle-${index}`} value="5" />
				))}

				{Array.from({ length: 7 }).map((_, index) => (
					<CalendarCell
						key={`bottom-${index}`}
						value="5"
						roundBottomLeft={index === 0}
					/>
				))}
			</div>
		</div>
	);
}
