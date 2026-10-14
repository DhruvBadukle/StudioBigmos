import { useRef } from "react";
import type { Episode } from "../types";
import { OptimizedImage } from "./OptimizedImage";

interface Props {
  items: Episode[];
}

export function EpisodeStrip({ items }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollEpisodes = (direction: -1 | 1) => {
    const strip = scrollRef.current;
    if (!strip) return;

    strip.scrollBy({
      left: direction * strip.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div id="episodes" className="col-span-full scroll-mt-24 py-6">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h3 className="font-serif text-[24px] font-semibold tracking-tight"> Fresh on the Feed </h3>
          <div className="mt-1 text-[13px] text-muted">Every reel, Fresh vibes</div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollEpisodes(-1)}
            aria-label="Scroll to previous episodes"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollEpisodes(1)}
            aria-label="Scroll to next episodes"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm transition hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto scroll-smooth pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((ep) => (
          <a
            key={ep.number}
            href={ep.link}
            className="group relative aspect-[9/16] w-[170px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[14px] transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="absolute inset-0" style={{ background: ep.bg ?? "#ddd" }}>
              {ep.image ? (
                <OptimizedImage
                  src={ep.image}
                  alt=""
                  width={900}
                  height={1600}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] opacity-90">
                Episode {ep.number}
              </div>
              <div className="mt-0.5 text-sm font-medium leading-tight">{ep.title}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}