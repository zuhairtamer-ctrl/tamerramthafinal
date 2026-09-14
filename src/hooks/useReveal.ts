import { useEffect } from "react";

/** يراقب عناصر .reveal ويضيف لها is-visible عند دخولها الشاشة */
export function useReveal(dep: unknown = null) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-right, .reveal-left, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
