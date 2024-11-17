'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function App({ item }) {
	const [isMounted, setMounted] = useState(false);
	const [hash, setHash] = useState('');
	useEffect(() => {
		if (isMounted) {
			setHash(window.location.hash);
		} else {
			setMounted(true);
		}
	}, [isMounted]);
	useEffect(() => {
		window.location.hash = hash;
	}, [hash]);
	{
		/*==================================================
			Gets the page you are on
		==================================================*/
	}
	const pathname = usePathname();

	{
		/*==================================================
			Open / close modal
		==================================================*/
	}
	function changeModal() {
		let dialog = document.getElementById('dialog');
		if (!dialog.open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}

	{
		/*==================================================
			Add / remove tag to hash
		==================================================*/
	}
	let tags = hash
		.slice(1)
		.split('&')
		.filter((n) => n);
	function toggleTag(tag, action) {
		if (action === 'add') {
			if (!tags.includes(tag)) {
				tags.push(tag);
			}
		} else if (action === 'remove') {
			var tagIndex = tags.indexOf(tag);
			if (tagIndex != -1) {
				tags.splice(tagIndex, 1);
			}
		}
		setHash(tags.join('&'));
	}

	return (
		<div
			className='
				flex
				flex-col
				justify-between
				gap-1
				relative
				bg-body
				max-w-xs
				p-4
				rounded-2xl
				shadow-xl
				dark:shadow-[0px_5px_25px_-5px]
				dark:shadow-primary-500
			'
		>
			<div
				className='
					flex
					flex-col
					h-full
				'
			>
				{item.caution && (
					<button
						className='
							absolute
							top-5
							right-5
							aspect-square
							bg-warning
							text-input
							h-7
							rounded-full

							hover:bg-warning-lighter
							hover:text-warning-darker

							focus-visible:bg-warning-lighter
							focus-visible:text-warning-darker
							focus-visible:outline
							focus-visible:outline-2
							focus-visible:outline-warning
						'
						onClick={changeModal}
					>
						i
					</button>
				)}
				{item.img && (
					<Image
						className={`
							bg-transparent
							w-full
							object-cover
							rounded-md
							transition-[height]
							${pathname == '/wishlist' ? 'aspect-square' : 'h-full'}
						`}
						src={item.img}
						alt={`${item.name} image`}
						width={320}
						height={320}
						blurDataURL='data:...'
						placeholder='blur'
					/>
				)}
				{item.iframe && (
					<iframe
						className='
							w-full
							aspect-square
							rounded-md
						'
						src={item.iframe}
						title={`${item.name} iframe`}
						tabIndex='-1'
					></iframe>
				)}
				{item.name && <h4>{item.name}</h4>}
				{item.category && (
					<div className='flex flex-wrap gap-1'>
						{item.category.map((tag, index) => (
							<button
								key={index}
								className='
									bg-primary-50
									text-primary-500
									px-1
									rounded-md
									text-xs
									transition-transform

									hover:scale-110

									focus-visible:scale-110
								'
								onClick={() => toggleTag(tag, 'add')}
							>
								#{tag}
							</button>
						))}
					</div>
				)}
				{(item.description || pathname == '/cyberpunk') && (
					<ul
						className='
							list-disc
							list-inside
							marker:text-primary-500
						'
					>
						{item.description &&
							item.description.map((desc, index) => (
								<li
									key={index}
									className='
										text-base
										font-medium
										text-text-300
										font-Poppins
									'
								>
									{Array.isArray(desc) ? (
										<>
											{desc[0]} -{' '}
											<a
												className='text-primary-500'
												href={desc[1]}
												target='_blank'
												rel='noopener'
											>
												{desc[2]}
											</a>
											, {desc[3]}
										</>
									) : (
										desc
									)}
								</li>
							))}
						{pathname == '/cyberpunk' && (
							<li
								className='
									text-base
									font-medium
									text-text-300
									font-Poppins
								'
							>
								{item.requirements
									? 'This mod requires the installation of additional mods to function properly'
									: 'This mod is stand-alone and does not require additional mods to operate'}
							</li>
						)}
					</ul>
				)}
			</div>
			{(item.link || item.video) && (
				<nav className='flex gap-3'>
					{[item.link, item.video]
						.filter((value) => typeof value != 'undefined')
						.map((value, index) => (
							<a
								key={index}
								className={`
									bg-primary-500
									w-full
									even:w-[calc(0.75rem*2+1.5rem)]
									text-input
									text-center
									p-3
									rounded-md
									transition-colors

									hover:bg-primary-50
									hover:text-primary-500

									focus-visible:bg-primary-50
									focus-visible:text-primary-500
									focus-visible:outline
									focus-visible:outline-2
									focus-visible:outline-primary-500
								`}
								href={value}
								target='_blank'
							>
								{item.link == value ? 'Link' : '▶'}
							</a>
						))}
				</nav>
			)}
		</div>
	);
}
