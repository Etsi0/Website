'use client';
import { useSongJsonContext } from '@/context/songsContext';
import { CreateRecommendations } from './action';

export default function SubmitForm(props: any) {
	const { countryCodes } = props;
	const { SongJson, setSongJson } = useSongJsonContext();

	return (
		<>
			<form
				action={async (formData: FormData) => {
					const data = await CreateRecommendations(formData);
					if (data) {
						setSongJson(data);
					}
				}}
				className='grid grid-cols-6 gap-x-3'
			>
				<label htmlFor='countryCode'>Market</label>
				<label className='col-span-2' htmlFor='Album'>
					Playlist
				</label>
				<label className='col-span-2' htmlFor='limit'>
					Limit
				</label>
				<label></label>
				<select
					id='countryCode'
					className='w-full rounded-md p-1'
					name='countryCode'
					defaultValue={'SE'}
					required
				>
					{countryCodes &&
						countryCodes[1].map((country: any, index: number) => (
							<option key={index} value={country.iso2Code}>
								{country.name}
							</option>
						))}
				</select>
				<input
					id='playlist'
					className='col-span-2 rounded-md p-1'
					type='text'
					name='playlist'
					placeholder='https://open.spotify.com/playlist/4acywhPUSvtCIOd1FnwOA7?si=9248199106f446de'
					required
				/>
				<input
					id='limit'
					className='col-span-2 rounded-md p-1'
					type='number'
					name='limit'
					placeholder='limit'
					min={0}
					defaultValue={20}
					max={100}
					required
				/>
				<button className='rounded-md bg-green-500 text-slate-50' type='submit'>
					Explore
				</button>
			</form>
		</>
	);
}
