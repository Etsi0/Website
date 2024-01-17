'use client';

const range = [220, 260];
const diff = Math.abs(range[0] - range[1] + 1);

const randomFloat = Math.random() * diff;
const randomFloatInRange = randomFloat + range[0];
const randomIntInRange = Math.floor(randomFloatInRange);

const root = document.querySelector(':root') as HTMLElement;
root.style.setProperty('--hue-color', randomIntInRange.toString() + 'deg');
