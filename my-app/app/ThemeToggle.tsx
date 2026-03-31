"use client";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.25A8.25 8.25 0 1 1 9.75 3.75a6.75 6.75 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => {
        const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        const updated: Theme = current === "dark" ? "light" : "dark";
        applyTheme(updated);
        window.localStorage.setItem(STORAGE_KEY, updated);
      }}
      className="fixed right-4 top-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/80 text-zinc-700 shadow-[0_14px_36px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 dark:border-white/10 dark:bg-[#10192b]/85 dark:text-slate-200 dark:hover:bg-[#162238] dark:hover:text-white sm:right-6 sm:top-6"
    >
      <span className="relative h-5 w-5">
        <SunIcon className="absolute inset-0 h-5 w-5 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0" />
        <MoonIcon className="absolute inset-0 h-5 w-5 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100" />
      </span>
    </button>
  );
}
