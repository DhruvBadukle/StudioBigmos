import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg transition hover:-translate-y-1 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:bottom-8 md:right-8"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
