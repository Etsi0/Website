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
					setSongJson(null);
					const data = await CreateRecommendations(formData);
					if (data) {
						setSongJson(data);
					}
				}}
				className='grid items-end gap-3 lg:flex'
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
							countryCodes[1].map((country: any, index: number) => (
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
					className='my-2 basis-1/6 rounded-md bg-green-500 p-1 text-slate-50 lg:my-0'
					type='submit'
				>
					Explore
				</button>
			</form>
		</>
	);
}
