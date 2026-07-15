"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useLayoutEffect } from "react";

export function SiteMotion({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      const hero = document.querySelector<HTMLElement>(".hero-scene");
      if (hero && window.innerWidth >= 900) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 0.8,
          },
        });
        timeline
          .to(".hero-name", { yPercent: -9, letterSpacing: "-0.075em" }, 0)
          .fromTo(
            ".hero-browser",
            { yPercent: 9, rotate: 3 },
            { yPercent: -6, rotate: -1.2 },
            0,
          )
          .to(".hero-scroll-word", { opacity: 0.15, yPercent: 35 }, 0);
      }

      const lab = document.querySelector<HTMLElement>(".lab-track");
      const labSection = document.querySelector<HTMLElement>(".lab-section");
      if (lab && labSection && window.innerWidth >= 900) {
        const distance = Math.max(0, lab.scrollWidth - window.innerWidth + 96);
        gsap.to(lab, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: labSection,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 0.75}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return <>{children}</>;
}
