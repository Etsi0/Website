'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/util';
import { useSongJsonContext } from '@/context/songsContext';
import { countriesDataSchema } from '@/api/countries';
import { CreateRecommendations } from '@/components/spotify/recommendations/action';

export default function SubmitForm({
	countryCodes,
}: {
	countryCodes: z.infer<typeof countriesDataSchema>[1];
}) {
	const { songJson, setSongJson } = useSongJsonContext();

	// indicates if you are waiting for a response from the server
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
						id='countryCode'
						className='w-full !min-w-0 rounded-md p-1'
						name='countryCode'
						defaultValue={'SE'}
						required
					>
						{countryCodes &&
							countryCodes.map((country: any, index: number) => (
								<option key={index} value={country.iso2Code}>
									{country.name}
								</option>
							))}
					</select>
				</div>
				<div className='grid basis-2/6'>
					<label htmlFor='playlist'>Playlist</label>
					<input
						id='playlist'
						className='!min-w-0 rounded-md p-1'
						type='text'
						name='playlist'
						placeholder='https://open.spotify.com/playlist/4acywhPUSvtCIOd1FnwOA7?si=9248199106f446de'
						required
					/>
				</div>
				<div className='grid basis-2/6'>
					<label htmlFor='limit'>Limit</label>
					<input
						id='limit'
						className='!min-w-0 rounded-md p-1'
						type='number'
						name='limit'
						placeholder='limit'
						min={0}
						defaultValue={20}
						max={100}
						required
					/>
				</div>
				<button
					className={cn(
						'my-2 basis-1/6 rounded-md bg-green-500 p-1 text-slate-50 lg:my-0',
						isLoading && 'animate-pulse bg-slate-500 text-slate-300 '
					)}
					type='submit'
					disabled={isLoading}
				>
					Explore
				</button>
			</form>
		</>
	);
}
