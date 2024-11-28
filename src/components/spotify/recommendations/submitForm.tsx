'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/util';
import { useSongJsonContext } from '@/context/songsContext';
import { countriesDataSchema } from '@/schema/countries';
import { CreateRecommendations } from '@/components/spotify/recommendations/action';

export default function SubmitForm({
	countryCodes,
}: {
	countryCodes: z.infer<typeof countriesDataSchema>;
}) {
	const { setSongJson } = useSongJsonContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {}, [isLoading]);

	return (
		<>
			<form
				action={async (formData: FormData) => {
					try {
						const data = await CreateRecommendations(formData);
						if (data) {
							setSongJson(data);
						}
					} finally {
						setIsLoading(false);
					}
				}}
				className='grid items-end gap-3 lg:flex'
				onSubmit={() => {
					setIsLoading(true);
					setSongJson(null);
				}}
			>
				<div className='basis-1/6'>
					<label htmlFor='countryCode'>Market</label>
					<select
						className='w-full !min-w-0 rounded-md p-1'
						defaultValue='SE'
						id='countryCode'
						name='countryCode'
						required
					>
						{countryCodes.map((country, index) => (
							<option key={index} value={country.cca2}>
								{country.name.common} {country.flag}
							</option>
						))}
					</select>
				</div>
				<div className='grid basis-2/6'>
					<label htmlFor='playlist'>Playlist</label>
					<input
						className='!min-w-0 rounded-md p-1'
						id='playlist'
						name='playlist'
						placeholder='https://open.spotify.com/playlist/4acywhPUSvtCIOd1FnwOA7?si=9248199106f446de'
						required
						type='text'
					/>
				</div>
				<div className='grid basis-2/6'>
					<label htmlFor='limit'>Limit</label>
					<input
						className='!min-w-0 rounded-md p-1'
						defaultValue={20}
						id='limit'
						max={100}
						min={0}
						name='limit'
						placeholder='limit'
						required
						type='number'
					/>
				</div>
				<div className='grid basis-1/6'>
					<label htmlFor='submit'>Submit</label>
					<button
						className={cn(
							'rounded-md bg-green-500 p-1 text-slate-50',
							isLoading && 'animate-pulse bg-slate-500 text-slate-300'
						)}
						disabled={isLoading}
						id='submit'
						type='submit'
					>
						Explore
					</button>
				</div>
			</form>
		</>
	);
}
