declare const self: Worker;

let timeoutId: NodeJS.Timeout | null = null;
let startTime: number | null = null;
let remainingTime: number = 0;

function tick() {
	if (startTime === null) return;

	const currentTime = performance.now();
	const elapsedTime = Math.floor((currentTime - startTime) / 1000);
	const newRemainingTime = remainingTime - elapsedTime;

	if (newRemainingTime <= 0) {
		startTime = null;
		timeoutId = null;
		self.postMessage({ type: 'COMPLETE' });
		return;
	}

	self.postMessage({
		type: 'TICK',
		remainingTime: newRemainingTime,
	});

	// Schedule next tick in 100ms
	timeoutId = setTimeout(tick, 100);
}

self.addEventListener('message', (e: MessageEvent) => {
	const { type, duration } = e.data;

	if (type === 'START') {
		remainingTime = duration;
		startTime = performance.now();
		timeoutId = setTimeout(tick, 100);
	} else if (type === 'STOP') {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		startTime = null;
	}
});

// Cleanup on worker termination
self.addEventListener('beforeunload', () => {
	if (timeoutId !== null) {
		clearTimeout(timeoutId);
	}
});

export {};
