import { clsx, ClassValue } from 'clsx';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export const whenHovering = 'hover:opacity-85 hover:active:opacity-50';
export const whenFocusing = 'ring-primary-500 ring-offset-2 ring-offset-body-100 focus-visible:outline-hidden focus-visible:ring-2';

export function cn(...input: ClassValue[]) {
	return twMerge(clsx(...input));
}

export function createCounter() {
	let index = 0;
	return () => index++;
}

export function validateData<T>(input: unknown, schema: z.ZodType<T>): T | false {
	const result = schema.safeParse(input);
	return result.success ? result.data : false;
}

type TRequest = {
	method?: HTTP_METHOD;
	headers?: Record<string, string>;
	body?: Record<string, string>;
	timeout?: number;
};

export async function apiFetch<T>(url: string, params: TRequest, schema: z.ZodType<T>) {
	const { method = 'GET', headers = {}, body, timeout = 60000, ...restConfig } = params;

	if (!headers['Content-Type']) {
		headers['Content-Type'] = 'application/json';
	}

	try {
		const isGetRequest = method === 'GET';
		const stringifiedBody = new URLSearchParams(body).toString();
		const queryParams = isGetRequest && body ? `?${stringifiedBody}` : '';

		const finalBody = !isGetRequest && body ? (headers['Content-Type'] === 'application/x-www-form-urlencoded' ? stringifiedBody : JSON.stringify(body)) : undefined;

		const response = await fetch(`${url}${queryParams}`, {
			method,
			headers,
			body: finalBody,
			signal: AbortSignal.timeout(timeout),
			...restConfig,
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			console.error(`API Error: ${response.status} ${response.statusText}`);
			return false;
		}

		const data: unknown = await response.json();
		const result = schema.safeParse(data);

		if (!result.success) {
			console.error('Schema validation failed:', result.error.issues);
			return false;
		}

		return result.data;
	} catch (error) {
		console.error('API request failed:', error);
		return false;
	}
}