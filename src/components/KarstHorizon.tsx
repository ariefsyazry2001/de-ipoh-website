"use client";

import { useEffect, useRef } from "react";

/**
 * The page's one signature element: a fixed ridge silhouette of the Kinta Valley
 * that sits behind the hero/problem/how-it-works sections, in the brand's purple/ink tones.
 * Three layers drift at different rates on scroll to read as depth, not decoration.
 * Everything else on the page is deliberately still.
 */
export function KarstHorizon() {
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      if (farRef.current) farRef.current.style.transform = `translateY(${y * 0.03}px)`;
      if (midRef.current) midRef.current.style.transform = `translateY(${y * 0.07}px)`;
      if (nearRef.current) nearRef.current.style.transform = `translateY(${y * 0.12}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140vh] overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        className="h-full w-full"
      >
        <g ref={farRef} fill="#9C93B3" opacity="0.22">
          <path d="M0 420 L90 360 L170 400 L260 300 L340 380 L430 260 L520 370 L610 320 L700 400 L790 340 L880 410 L980 350 L1080 400 L1180 330 L1280 390 L1360 350 L1440 400 L1440 900 L0 900 Z" />
        </g>
        <g ref={midRef} fill="#C7B8EA" opacity="0.35">
          <path d="M0 520 L80 470 L150 510 L240 430 L310 500 L400 410 L470 490 L560 440 L640 510 L730 450 L810 520 L900 460 L980 510 L1070 440 L1150 500 L1230 460 L1310 510 L1440 470 L1440 900 L0 900 Z" />
        </g>
        <g ref={nearRef} fill="#221733" opacity="0.9">
          <path d="M0 640 L70 600 L130 630 L210 570 L270 620 L350 560 L410 610 L490 580 L550 630 L630 570 L700 620 L780 590 L840 630 L920 580 L990 620 L1070 590 L1140 630 L1220 590 L1290 630 L1360 600 L1440 630 L1440 900 L0 900 Z" />
        </g>
      </svg>
    </div>
  );
}
