import { GetCountryCodes } from '@/api/countries';
import SongsContext from '@/context/songsContext';
import TrackCards from '@/components/spotify/recommendations/trackCards';
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
					<p>
						To allow the application to scan your playlist, set it to public. If you are
						unable to play the track, it is because there is no preview track.
					</p>
				</div>
				<SongsContext>
					<SubmitForm countryCodes={countryCodes} />
					<TrackCards />
				</SongsContext>
			</section>
		</>
	);
}
