'use client';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/util';
import { NoScript } from '@/components/ui/noScript';

type MonthData = {
	month: number;
	frequency: number;
};

type DaysData = Record<number, number[]>;

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export function Client() {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [year, setYear] = useState<number>(2025);
	const [startMonth, setStartMonth] = useState<number>(1);
	const [totalMonths, setTotalMonths] = useState<number>(12);
	const [gap, setGap] = useState<number>(0.887);

	useEffect(() => {
		if (!isMounted) {
			const tempYear = Number(window.localStorage.getItem('year'));
			const tempStartMonth = Number(window.localStorage.getItem('startMonth'));
			const tempTotalMonths = Number(window.localStorage.getItem('totalMonths'));
			const tempGap = Number(window.localStorage.getItem('gap'));
			if (tempYear) {
				setYear(tempYear);
			}
			if (tempStartMonth) {
				setStartMonth(tempStartMonth);
			}
			if (tempTotalMonths) {
				setTotalMonths(tempTotalMonths);
			}
			if (tempGap) {
				setGap(tempGap);
			}
			setIsMounted(true);
		}
	}, [isMounted]);

	useEffect(() => {
		window.localStorage.setItem('year', JSON.stringify(year));
	}, [year]);

	useEffect(() => {
		window.localStorage.setItem('startMonth', JSON.stringify(startMonth));
	}, [startMonth]);

	useEffect(() => {
		window.localStorage.setItem('totalMonths', JSON.stringify(totalMonths));
	}, [totalMonths]);

	useEffect(() => {
		window.localStorage.setItem('gap', JSON.stringify(gap));
	}, [gap]);

	const results = useMemo(() => {
		function calculateFrequency(total: number): MonthData[] {
			total++;
			const data: MonthData[] = [];

			for (let month = 1; month <= total - 1; month++) {
				const currentMonth = startMonth + month - 1;
				const daysInMonth = new Date(year + Math.floor(currentMonth / 12), ((currentMonth - 1) % 11) + 1, 0).getDate();

				const rawFrequency = daysInMonth * Math.cos((month * Math.PI) / (2 * total)) * gap + 0.2;
				const frequency = Math.min(daysInMonth, Math.max(0, Math.round(rawFrequency)));

				data.push({
					month: currentMonth,
					frequency: frequency,
				});
			}

			return data;
		}

		const data = calculateFrequency(totalMonths);
		return data.reduce<DaysData>((acc, month) => {
			acc[month.month] = [];
			const daysInMonth = new Date(year + Math.floor((startMonth + month.month) / 12), month.month, 0).getDate();

			if (month.frequency === 0) return acc;

			if (month.frequency >= daysInMonth) {
				acc[month.month] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
				return acc;
			}

			const spacing = daysInMonth / month.frequency;
			const selectedDays = Array.from({ length: month.frequency }, (_, i) => {
				const day = Math.round(1 + i * spacing);
				return day <= daysInMonth ? day : null;
			}).filter((day): day is number => day !== null);

			acc[month.month] = [...new Set(selectedDays)].sort((a, b) => a - b);
			return acc;
		}, {});
	}, [year, startMonth, totalMonths, gap]);

	return (
		<>
			<NoScript />
			<div className={cn('space-x-4 text-center', !isMounted && 'hidden')}>
				<label className='inline-grid text-sm font-medium'>
					Year
					<input
						type='number'
						min='1970'
						max='9999'
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
						className='rounded border border-body-200 bg-body-50 p-2 dark:border-body-300 dark:bg-body-200'
					/>
				</label>
				<label className='inline-grid text-sm font-medium'>
					Start Month
					<input
						type='number'
						min='1'
						max='12'
						value={startMonth}
						onChange={(e) => setStartMonth(Number(e.target.value))}
						className='rounded border border-body-200 bg-body-50 p-2 dark:border-body-300 dark:bg-body-200'
					/>
				</label>
				<label className='inline-grid text-sm font-medium'>
					Total Months
					<input
						type='number'
						min='1'
						max='999'
						value={totalMonths}
						onChange={(e) => setTotalMonths(Number(e.target.value))}
						className='rounded border border-body-200 bg-body-50 p-2 dark:border-body-300 dark:bg-body-200'
					/>
				</label>
				<label className='inline-grid text-sm font-medium'>
					Frequency
					<input
						type='number'
						min='0'
						max='1'
						step='0.001'
						value={gap}
						onChange={(e) => setGap(Number(e.target.value))}
						className='rounded border border-body-200 bg-body-50 p-2 dark:border-body-300 dark:bg-body-200'
					/>
				</label>
			</div>
			<div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', !isMounted && 'hidden')}>
				{Object.entries(results).map(([monthNum, days]) => (
					<MonthGrid year={year} key={monthNum} monthNum={Number(monthNum)} days={days} />
				))}
			</div>
		</>
	);
}

function MonthGrid({ year, monthNum, days }: { year: number; monthNum: number; days: number[] }) {
	const currentYear = year + Math.floor((monthNum - 1) / 12);
	const currentMonth = ((monthNum - 1) % 12) + 1;
	const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
	const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

	const calendar = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) => {
		const day = i - firstDayOfMonth + 1;
		return day > 0 && day <= daysInMonth ? day : null;
	});

	return (
		<div key={monthNum} className='flex flex-col gap-2 rounded-lg border border-body-200 bg-body-50 p-4 dark:border-body-300 dark:bg-body-200'>
			<h3 className='font-medium'>
				{MONTH_NAMES[(Number(monthNum) - 1) % 12]} {year + Math.floor((Number(monthNum) - 1) / 12)}
			</h3>
			<div className='grow'>
				<div className='grid grid-cols-7 gap-x-1 gap-y-[0.375rem] text-center'>
					{WEEKDAYS.map((day) => (
						<div key={day} className='font-medium text-text-400'>
							{day}
						</div>
					))}
					{calendar.map((day, i) => (
						<div
							key={i}
							className={cn(
								'aspect-square content-center rounded text-center text-sm',
								day === null ? '' : days.includes(day) ? 'bg-primary-500 text-input' : 'bg-body-100 text-text-400 dark:bg-body-300'
							)}
						>
							{day}
						</div>
					))}
				</div>
			</div>
			<div className='text-sm'>Selected days: {days.length}</div>
		</div>
	);
}
