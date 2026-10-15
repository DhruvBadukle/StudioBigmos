import { useState } from "react";
import { Heart } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (target: string) => void;
  wishlistCount: number;
  onWishlistClick: () => void;
  isWishlistActive: boolean;
}

export function Header({
  searchQuery,
  onSearchChange,
  onNavigate,
  wishlistCount,
  onWishlistClick,
  isWishlistActive,
}: HeaderProps) {
  const [activeSection, setActiveSection] = useState("shop");
  const navigation = [
    { label: "Episodes", target: "episodes" },
    { label: "Shop", target: "shop" },
    { label: "Collections", target: "lookbook-items" },
    { label: "Trending", target: "sale" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-4">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("top");
          }}
          className="font-serif text-[22px] font-semibold tracking-tight"
        >
          Avikas Studio<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map(({ label, target }) => {
            const isActive = activeSection === target;

            return (
              <a
                key={target}
                href={`#${target}`}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveSection(target);
                  onNavigate(target);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-full px-2.5 py-1.5 text-[13px] font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "bg-white text-accent shadow-sm"
                    : "text-muted hover:bg-white/70 hover:text-ink"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-[280px] items-center gap-2 rounded-full border border-line bg-white px-4 py-2 md:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search EP (e.g. 24)"
              className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-[#A0A0A0]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="text-muted hover:text-ink"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onWishlistClick}
            aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} ${wishlistCount === 1 ? "product" : "products"}` : ""}`}
            aria-current={isWishlistActive ? "page" : undefined}
            className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors ${
              isWishlistActive
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-ink hover:border-accent hover:text-accent"
            }`}
          >
            <Heart size={19} strokeWidth={1.8} fill={isWishlistActive ? "currentColor" : "none"} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ring-2 ring-bg">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* mobile search */}
      <div className="border-t border-line px-6 pb-3 md:hidden">
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search EP (e.g. 24)"
            className="w-full border-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>
    </header>
  );
}