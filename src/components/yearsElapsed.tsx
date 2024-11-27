'use client';
/**
 * Calculates the complete years elapsed from a given start date to the current date.
 * It considers the exact day and month to ensure only full years are counted.
 * If the current date is before the anniversary of the start date in the current year, it subtracts one year from the difference.
 * @param { Date } startDate - The date you wish to calculate the elapse from.
 * @returns { number } The number of full years that have elapsed since the start date.
 * @example
 * // If today's date is 2024 May 13th and the start date is 2000 May 15th
 * console.log(YearsElapsed(new Date("2000-05-15"))); // returns 23
 * @example
 * // If today's date is 2024 May 13th and the start date is 2000 May 10th
 * console.log(YearsElapsed(new Date("2000-05-10"))); // returns 24
 */
export function YearsElapsed({ startDate }: { startDate: Date }): number {
	const endDate = new Date();
	let diff = endDate.getFullYear() - startDate.getFullYear();

	const monthCheck = endDate.getMonth() < startDate.getMonth();
	const dayCheck = endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate();
	if (monthCheck || dayCheck) {
		return --diff;
	}

	return diff;
}
