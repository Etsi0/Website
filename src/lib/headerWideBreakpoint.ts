import { createCanvas } from '@napi-rs/canvas';
import { measureNaturalWidth, prepareWithSegments } from '@chenglou/pretext';
import { HEADER_NAV_LINKS } from '@/components/Header/navLinks';

const FONT_SPEC = '16px Inter';
let cachedRem: number | undefined;

if (typeof globalThis.OffscreenCanvas === 'undefined') {
	function OffscreenCanvasPolyfill(width: number, height: number) {
		return createCanvas(width, height);
	}

	Object.assign(globalThis, { OffscreenCanvas: OffscreenCanvasPolyfill });
}

export function getHeaderWideBreakpointRem(): number {
	if (cachedRem !== undefined) {
		return cachedRem;
	}

	const navWidths = Object.keys(HEADER_NAV_LINKS).map((label) => {
		const prepared = prepareWithSegments(label, FONT_SPEC);
		return measureNaturalWidth(prepared);
	});
	const totalNavWidth = navWidths.reduce((a, b) => a + b, 0);
	const gaps = (navWidths.length - 1) * 24;
	const sides = Math.max(75.95, 24) * 2;
	const padding = 2 * 1.5 * 24;
	const containerGaps = 2 * 32;
	cachedRem = (sides + totalNavWidth + gaps + padding + containerGaps) / 16;
	return cachedRem;
}
