"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

function refreshScrollTriggers() {
  ScrollTrigger.refresh(true);
}

export function ScrollTriggerRefresh() {
  useEffect(() => {
    const refreshSoon = () => {
      refreshScrollTriggers();
      window.setTimeout(refreshScrollTriggers, 200);
      window.setTimeout(refreshScrollTriggers, 800);
    };

    refreshSoon();

    window.addEventListener("load", refreshSoon);
    window.addEventListener("resize", refreshSoon, { passive: true });

    const observer = new ResizeObserver(refreshSoon);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("load", refreshSoon);
      window.removeEventListener("resize", refreshSoon);
      observer.disconnect();
    };
  }, []);

  return null;
}

export { refreshScrollTriggers };
