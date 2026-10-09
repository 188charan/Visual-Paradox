'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * Single place where GSAP plugins are registered. Importing from here anywhere
 * guarantees the plugins are registered exactly once. Components should import
 * { gsap, ScrollTrigger, useGSAP } from this module rather than from the
 * packages directly.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared easing + timing so the motion language stays consistent. */
export const EASE = {
  cinema: 'power3.inOut',
  out: 'expo.out',
  soft: 'power2.out',
} as const;

export const DURATION = {
  reveal: 1.1,
  text: 0.9,
  quick: 0.5,
} as const;

export { gsap, ScrollTrigger, useGSAP };
