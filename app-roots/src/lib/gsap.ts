"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

ScrollTrigger.defaults({
  markers: false,
});

export { gsap, ScrollTrigger, TextPlugin };
