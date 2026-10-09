'use client';

import { Component, type ReactNode } from 'react';

/**
 * If anything in the 3D scene throws (driver quirk, context loss, etc.) we
 * render nothing — the cinematic hero photograph underneath remains the
 * experience. The site never breaks because of Three.js.
 */
export class LensErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Intentionally silent — graceful degradation, not an error state.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
