export type TDesignToolCompareRating = 'good' | 'neutral' | 'bad' | 'free' | 'purchase' | 'subscription';

const RATING_UI: Record<TDesignToolCompareRating, { symbol: string, label: string }> = {
	good: { symbol: '✅', label: 'Good' },
	neutral: { symbol: '➖', label: 'Neutral' },
	bad: { symbol: '❌', label: 'Bad' },
	free: { symbol: '🆓', label: 'Free' },
	purchase: { symbol: '💎', label: 'One-time purchase' },
	subscription: { symbol: '🔄', label: 'Subscription' },
};

type TDesignToolCompareCellProps = {
	rating: TDesignToolCompareRating;
	className?: string;
};

export function DesignToolCompareCell({ rating, className }: TDesignToolCompareCellProps) {
	const { symbol, label } = RATING_UI[rating];

	return (
		<span
			className={className}
			aria-label={label}
			title={label}
		>
			{symbol}
		</span>
	);
}

type TDesignToolCompareLegendProps = {
	variant: 'quality' | 'cost';
};

export function DesignToolCompareLegend({ variant }: TDesignToolCompareLegendProps) {
	if (variant === 'quality') {
		return (
			<>
				(
				<DesignToolCompareCell rating="good"/>
				<DesignToolCompareCell rating="neutral"/>
				<DesignToolCompareCell rating="bad"/>
				)
			</>
		);
	}

	return (
		<>
			(
			<DesignToolCompareCell rating="free"/>
			<DesignToolCompareCell rating="purchase"/>
			<DesignToolCompareCell rating="subscription"/>
			)
		</>
	);
}
