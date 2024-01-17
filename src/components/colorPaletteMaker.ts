const HsbColors = generateColorsOnCurve(11, { x: 61, y: 88 });
const HslColors = HsbColors.map((HsbColor) => HSBtoHSL(HsbColor[0], HsbColor[1]));
console.log('Here is your saturation and brightness, happy coloring 😘:', HslColors.reverse());

interface midCords {
	x: number;
	y: number;
}
function generateColorsOnCurve(numberOfColors: number, middle: midCords): number[][] | undefined {
	if (numberOfColors % 2 !== 1) {
		console.error('numberOfColors must be odd.');
		return undefined;
	}

	const MAX_VALUE = 100;
	const oneHalf = (numberOfColors - 1) / 2;
	function NumbersBetweenTwoPoints(num: number, add: number): number[] {
		let values = [];
		for (let i = 0; i != oneHalf; i++) {
			values.push((num / (oneHalf + 1)) * (i + 1) + add);
		}
		return values;
	}

	const afterMidX = NumbersBetweenTwoPoints(MAX_VALUE - middle.x, middle.x);
	const beforeMidX = NumbersBetweenTwoPoints(middle.x - 10, 10);
	const xValues = [...beforeMidX, middle.x, ...afterMidX];

	const beforeMidY = NumbersBetweenTwoPoints(middle.y - 10, 10);
	const afterMidY = NumbersBetweenTwoPoints(MAX_VALUE - middle.y, middle.y);
	const yValues = [...beforeMidY, middle.y, ...afterMidY];

	return xValues.reverse().map((x, i) => [x, yValues[i]]);
}

function HSBtoHSL(s: number, b: number) {
	// Convert from 0-100 range to 0-1
	s /= 100;
	b /= 100;

	let l = ((2 - s) * b) / 2;

	if (l !== 0) {
		if (l === 1) {
			s = 0;
		} else if (l < 0.5) {
			s = (s * b) / (l * 2);
		} else {
			s = (s * b) / (2 - l * 2);
		}
	}

	// Convert back to 0-100 range
	s *= 100;
	l *= 100;

	return { s, l };
}
