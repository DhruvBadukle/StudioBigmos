import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (target: string) => void;
}

export function Header({ searchQuery, onSearchChange, onNavigate }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("shop");
  const navigation = [
    { label: "Episodes", target: "episodes" },
    { label: "Shop", target: "shop" },
    { label: "Collections", target: "collections" },
    { label: "Sale", target: "sale" },
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

        <nav className="hidden gap-7 md:flex">
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
                className={`border-b-2 pb-0.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto hidden w-[280px] items-center gap-2 rounded-full border border-line bg-white px-4 py-2 md:flex">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search episode no. (try 24)"
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
            placeholder="Search episode no. (try 24)"
            className="w-full border-0 bg-transparent text-sm outline-none"
          />
        </div>
      </div>
    </header>
  );
}