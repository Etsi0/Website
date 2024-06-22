import { GetCountryCodes } from '@/api/countries';
import SongsContext from '@/context/songsContext';
import SongCards from '@/components/spotify/recommendations/songCards';
import SubmitForm from '@/components/spotify/recommendations/submitForm';

export default async function Page() {
	const countryCodes = await GetCountryCodes();
	if (!countryCodes) {
		return <>Something went wrong, please contact admin</>;
	}

	return (
		<>
			<section className='grid gap-16'>
				<div className='mt-16 grid place-items-center gap-3 text-center'>
					<h1 className='text-[clamp(1.5rem,_calc(35vw_-_128px),_3rem)]'>
						Spotify Recommendations
					</h1>
					<p>Your playlist must be public to be able to input it</p>
				</div>
				<SongsContext>
					<SubmitForm countryCodes={countryCodes} />
					<SongCards />
				</SongsContext>
			</section>
		</>
	);
}
