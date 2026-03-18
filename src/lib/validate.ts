import { z } from 'zod';

export function validate<T>(input: unknown, schema: z.ZodType<T>): z.ZodSafeParseResult<T> {
	return schema.safeParse(input);
}
