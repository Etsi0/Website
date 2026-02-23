'use client'
import React, { forwardRef, useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber';
import { Color, Mesh, ShaderMaterial } from 'three';
import { IUniform } from 'three';
import { parse, rgb } from 'culori';

type TNormalizedRGB = [number, number, number];
type TResolvedTheme = 'light' | 'dark';
type TUniformValue<T = number | Color> = {
	value: T;
}

type TSilkUniforms = {
	uSpeed: TUniformValue<number>;
	uScale: TUniformValue<number>;
	uNoiseIntensity: TUniformValue<number>;
	uFg: TUniformValue<Color>;
	uBg: TUniformValue<Color>;
	uRotation: TUniformValue<number>;
	uTime: TUniformValue<number>;
	[uniform: string]: IUniform;
};

type TSilkPlaneProps = {
	uniforms: TSilkUniforms;
	resolvedFg: TNormalizedRGB;
	resolvedBg: TNormalizedRGB;
}

export type TSilkProps = {
	speed?: number;
	scale?: number;
	fg?: string;
	bg?: string;
	noiseIntensity?: number;
	rotation?: number;
}

const DEFAULT_FG = '#ffffff';
const DEFAULT_BG = '#000000';

const vertexShader = `
	varying vec2 vUv;
	varying vec3 vPosition;

	void main() {
		vPosition = position;
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

const fragmentShader = `
	varying vec2 vUv;
	varying vec3 vPosition;

	uniform float uTime;
	uniform vec3  uFg;
	uniform vec3  uBg;
	uniform float uSpeed;
	uniform float uScale;
	uniform float uRotation;
	uniform float uNoiseIntensity;

	const float e = 2.71828182845904523536;

	float noise(vec2 texCoord) {
		float G = e;
		vec2  r = (G * sin(G * texCoord));
		return fract(r.x * r.y * (1.0 + texCoord.x));
	}

	vec2 rotateUvs(vec2 uv, float angle) {
		float c = cos(angle);
		float s = sin(angle);
		mat2  rot = mat2(c, -s, s, c);
		return rot * uv;
	}

	void main() {
		float rnd        = noise(gl_FragCoord.xy);
		vec2  uv         = rotateUvs(vUv * uScale, uRotation);
		float tOffset    = uSpeed * uTime;

		uv.y += 0.03 * sin(8.0 * uv.x - tOffset);

		float pattern = 0.6 + 0.4 * sin(5.0 * (uv.x + uv.y + cos(3.0 * uv.x + 5.0 * uv.y) + 0.02 * tOffset) + sin(20.0 * (uv.x + uv.y - 0.1 * tOffset)));

		vec3 baseColor = mix(uBg, uFg, pattern);
		vec4 col = vec4(baseColor, 1.0) - rnd / 15.0 * uNoiseIntensity;
		col.a = 1.0;
		gl_FragColor = col;
	}
`;

const SilkPlane = forwardRef<Mesh, TSilkPlaneProps>(function SilkPlane({ uniforms, resolvedFg, resolvedBg }: TSilkPlaneProps, ref: React.Ref<Mesh>) {
	const { viewport } = useThree();

	useLayoutEffect(() => {
		uniforms.uFg.value.set(resolvedFg[0], resolvedFg[1], resolvedFg[2]);
		uniforms.uBg.value.set(resolvedBg[0], resolvedBg[1], resolvedBg[2]);
	}, [uniforms, resolvedFg, resolvedBg]);

	useLayoutEffect(() => {
		const meshRef = ref as { current: Mesh | null } | null;
		if (meshRef?.current) {
			meshRef.current.scale.set(viewport.width, viewport.height, 1);
		}
	}, [ref, viewport]);

	useFrame((_state: RootState, delta: number) => {
		const meshRef = ref as { current: Mesh | null } | null;
		if (meshRef?.current) {
			const material = meshRef.current.material as ShaderMaterial & {
				uniforms: TSilkUniforms;
			};
			material.uniforms.uTime.value += 0.1 * delta;
		}
	});

	return (
		<mesh ref={ref}>
			<planeGeometry args={[1, 1, 1, 1]} />
			<shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} />
		</mesh>
	);
});

function pickColorForTheme(colorString: string, theme: TResolvedTheme): string {
	const tokens = colorString.trim().split(/\s+/);
	let defaultVal = '';
	let lightVal = '';
	let darkVal = '';
	for (const token of tokens) {
		if (token.startsWith('dark:')) {
			darkVal = token.slice(5).trim();
		} else if (token.startsWith('light:')) {
			lightVal = token.slice(6).trim();
		} else {
			defaultVal = token.trim();
		}
	}
	if (theme === 'dark') return darkVal || defaultVal;
	return lightVal || defaultVal;
}

function resolveColorToRgb(value: string): TNormalizedRGB | null {
	if (typeof document === 'undefined') return null;

	let cssValue: string;
	const varMatch = value.match(/^var\(\s*--color-(.+?)\s*\)$/);
	const key = varMatch ? varMatch[1].trim() : value.startsWith('#') ? null : value;

	if (key !== null) {
		const el = document.createElement('div');
		el.style.color = `var(--color-${key})`;
		el.setAttribute('aria-hidden', 'true');
		document.body.appendChild(el);
		cssValue = getComputedStyle(el).color;
		document.body.removeChild(el);
		if (!cssValue || cssValue === 'rgba(0, 0, 0, 0)') return null;
	} else {
		cssValue = value;
	}

	const parsed = parse(cssValue);
	if (!parsed) return null;
	const rgbColor = rgb(parsed);
	if (!rgbColor) return null;
	return [rgbColor.r, rgbColor.g, rgbColor.b];
}

function getInitialRgb(value: string, fallbackHex: string): TNormalizedRGB {
	const toTry = value.startsWith('#') ? value : fallbackHex;
	const parsed = parse(toTry);
	if (!parsed) return [1, 1, 1];
	const rgbColor = rgb(parsed);
	if (!rgbColor) return [1, 1, 1];
	return [rgbColor.r, rgbColor.g, rgbColor.b];
}

export default function Silk({ speed = 5, scale = 1, fg = DEFAULT_FG, bg = DEFAULT_BG, noiseIntensity = 1.5, rotation = 0 }: TSilkProps) {
	const meshRef = useRef<Mesh>(null);
	const { resolvedTheme } = useTheme();
	const theme: TResolvedTheme = (resolvedTheme === 'dark' || resolvedTheme === 'light') ? resolvedTheme : 'light';

	const effectiveFg = useMemo(() => pickColorForTheme(fg, theme), [fg, theme]);
	const effectiveBg = useMemo(() => pickColorForTheme(bg, theme), [bg, theme]);

	const [resolvedFg, setResolvedFg] = useState<TNormalizedRGB>(() => getInitialRgb(effectiveFg, DEFAULT_FG));
	const [resolvedBg, setResolvedBg] = useState<TNormalizedRGB>(() => getInitialRgb(effectiveBg, DEFAULT_BG));

	useEffect(() => {
		const t = setTimeout(() => {
			setResolvedFg(resolveColorToRgb(effectiveFg) ?? getInitialRgb(effectiveFg, DEFAULT_FG));
			setResolvedBg(resolveColorToRgb(effectiveBg) ?? getInitialRgb(effectiveBg, DEFAULT_BG));
		}, 0);
		return () => clearTimeout(t);
	}, [effectiveFg, effectiveBg]);

	const uniforms = useMemo<TSilkUniforms>(() => ({
		uSpeed: { value: speed },
		uScale: { value: scale },
		uNoiseIntensity: { value: noiseIntensity },
		uFg: { value: new Color(0, 0, 0) },
		uBg: { value: new Color(0, 0, 0) },
		uRotation: { value: rotation },
		uTime: { value: 0 }
	}), [noiseIntensity, rotation, scale, speed]);

	return (
		<Canvas dpr={[1, 2]} frameloop="always">
			<SilkPlane ref={meshRef} uniforms={uniforms} resolvedFg={resolvedFg} resolvedBg={resolvedBg} />
		</Canvas>
	);
};