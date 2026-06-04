"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh(true);

    const onLoad = () => {
      refresh();
      setTimeout(refresh, 300);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh(true);
}
