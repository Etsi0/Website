'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { cn } from '@/lib/util';
import { useSongJsonContext } from '@/context/songsContext';
import { countriesDataSchema } from '@/api/countries';
import { CreateRecommendations } from '@/components/spotify/recommendations/action';
import { GetIPInfo, ipInfoSchema } from '@/api/ip';

export default function SubmitForm({
	countryCodes,
}: {
	countryCodes: z.infer<typeof countriesDataSchema>;
}) {
	const { songJson, setSongJson } = useSongJsonContext();

	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [defaultCountry, setDefaultCountry] = useState<z.infer<typeof ipInfoSchema> | null>(null);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('http://ip-api.com/json/');
			try {
				const data = await response.json();
				const parsedData = ipInfoSchema.safeParse(data);
				if (!parsedData.success) {
					return false;
				}

				setDefaultCountry(parsedData.data);
			} catch {
				return false;
			}
			setIsMounted(true);
		}

		fetchData();
	}, []);

	useEffect(() => {}, [isLoading]);

	if (!isMounted) {
		return;
	}

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
						defaultValue={
							defaultCountry?.countryCode ? defaultCountry?.countryCode : 'SE'
						}
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
				<button
					className={cn(
						'my-2 basis-1/6 rounded-md bg-green-500 p-1 text-slate-50 lg:my-0',
						isLoading && 'animate-pulse bg-slate-500 text-slate-300 '
					)}
					disabled={isLoading}
					type='submit'
				>
					Explore
				</button>
			</form>
		</>
	);
}
